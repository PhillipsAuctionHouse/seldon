import { Meta } from '@storybook/react';
import { ProgressWizard, ProgressWizardProps } from './';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import { FormStep } from './types';
import { z } from 'zod';

const meta = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
} satisfies Meta<typeof ProgressWizard>;

export default meta;
// 🤖 Playground story with all major props
export const Playground = (props: ProgressWizardProps) => (
  <ProgressWizard
    {...props}
    customHeader={
      props.customHeader ?? <div style={{ padding: '1rem', background: '#eee' }}>Custom Header Example</div>
    }
    startLabel={props.startLabel ?? 'Start'}
    cancelLabel={props.cancelLabel ?? 'Cancel'}
    backLabel={props.backLabel ?? 'Back'}
    continueLabel={props.continueLabel ?? 'Continue'}
    submitLabel={props.submitLabel ?? 'Submit'}
    fetcher={props.fetcher}
    action={props.action}
    steps={props.steps ?? exampleSteps}
    currentFormState={props.currentFormState}
    setCurrentFormState={props.setCurrentFormState}
    canContinue={props.canContinue}
    setCanContinue={props.setCanContinue}
    currentStepId={props.currentStepId}
    onStepBack={props.onStepBack}
    onStepChange={props.onStepChange}
    onContinue={props.onContinue}
    onSubmit={props.onSubmit}
    onCancel={props.onCancel}
  >
    {props.children ?? (
      <>
        <div key="step1">
          <p>Step 1: Long Description</p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua...
          </p>
        </div>
        <div key="step2">
          <p>Step 2: Short description</p>
        </div>
        <div key="step3">
          <p>Step 3: Another short description</p>
        </div>
      </>
    )}
  </ProgressWizard>
);
const exampleSteps = [
  {
    id: '0',
    label: 'Step 1',
    schema: undefined,
    component: (
      <div>
        <p>Step 1: Long Description</p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua...
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua...
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua...
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua...
        </p>
      </div>
    ),
  },
  {
    id: '1',
    label: 'Step 2',
    schema: undefined,
    component: (
      <div>
        <p>Step 2: Short description</p>
      </div>
    ),
  },
  {
    id: '2',
    label: 'Step 3',
    schema: undefined,
    component: (
      <div>
        <p>Step 3: Another short description</p>
      </div>
    ),
  },
];
Playground.args = {
  steps: exampleSteps,
};

Playground.argTypes = {
  steps: {
    control: { type: 'object' },
    description: 'The steps to display in the ProgressWizard',
  },
  customHeader: {
    control: { type: 'object' },
    description: 'Optional custom header to render above the wizard steps.',
  },
  startLabel: { control: 'text', description: 'Label for the Start button.' },
  cancelLabel: { control: 'text', description: 'Label for the Cancel button.' },
  backLabel: { control: 'text', description: 'Label for the Back button.' },
  continueLabel: { control: 'text', description: 'Label for the Continue button.' },
  submitLabel: { control: 'text', description: 'Label for the Submit button.' },
  fetcher: { control: 'object', description: 'Optional fetcher function to handle form submission.' },
  action: { control: 'text', description: 'Optional action string for the form submission endpoint.' },
  currentFormState: { control: 'object', description: 'Optional default values for the form fields.' },
  setCurrentFormState: { control: 'object', description: 'Function to set form values.' },
  canContinue: { control: 'boolean', description: 'Optional function to determine if the current step is valid.' },
  setCanContinue: { control: 'object', description: 'Function to set canContinue.' },
  currentStepId: { control: 'text', description: 'The index of the current step (0-based).' },
  onStepBack: { control: 'object', description: 'Callback to be called when the Back button is pressed.' },
  onStepChange: { control: 'object', description: 'Callback when step changes (for controlled mode).' },
  onContinue: {
    control: 'object',
    description: 'Callback to be called when a step is submitted (before advancing).',
  },
  onSubmit: { control: 'object', description: 'Callback when wizard is submitted.' },
  onCancel: { control: 'object', description: 'Callback when wizard is canceled.' },
  cookieManagementFunctions: { control: 'object', description: 'Cookie management functions.' },
};

// 🎺TODO this is totally broken

// Example: Each step requires a checkbox to be checked to be valid
export const WithValidation = () => {
  const [canContinue, setCanContinue] = useState(false);
  const [formState, setFormState] = useState<{ [key: string]: boolean }>({ '0': false, '1': false, '2': false });

  const handleCheck = (step: number, checked: boolean) => {
    setFormState((prev) => ({ ...prev, [step]: checked }));
    setCanContinue(checked);
  };

  const stepsWithValidation = [
    {
      id: '0',
      label: 'Step 1',
      schema: z.object({ name: z.string().min(1) }),
      component: (
        <Input
          id="step1"
          type="checkbox"
          labelText="Step 1: Check to continue"
          checked={formState['0']}
          onChange={(e) => handleCheck(0, e.target.checked)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        />
      ),
    },
    {
      id: '1',
      label: 'Step 2',
      schema: z.object({ email: z.string().min(1) }),
      component: (
        <Input
          id="step2"
          type="checkbox"
          labelText="Step 2: Check to continue"
          checked={formState['1']}
          onChange={(e) => handleCheck(1, e.target.checked)}
          style={{ display: 'flex', background: 'green', alignItems: 'center', gap: '0.5rem' }}
        />
      ),
    },
    {
      id: '2',
      label: 'Step 3',
      schema: z.object({ password: z.string().min(1) }),
      component: (
        <Input
          id="step3"
          type="checkbox"
          labelText="Step 3: Check to submit"
          checked={formState['2']}
          onChange={(e) => handleCheck(2, e.target.checked)}
          style={{ display: 'flex', background: 'green', alignItems: 'center', gap: '0.5rem' }}
        />
      ),
    },
  ];
  return <ProgressWizard steps={stepsWithValidation} canContinue={canContinue} setCanContinue={setCanContinue} />;
};

// New story using simple controlled form state
export const WithSimpleForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', password: '' });
  const [canContinue, setCanContinue] = useState(false);

  const isStepValid = (step?: number) => {
    switch (step) {
      case 0:
        return !!formState.name;
      case 1:
        return !!formState.email;
      case 2:
        return !!formState.password;
      default:
        return false;
    }
  };

  useEffect(() => {
    setCanContinue(isStepValid());
  }, [formState]);

  const simpleFormSteps: FormStep[] = [
    {
      id: '0',
      label: 'Name',
      schema: z.object({ name: z.string().min(1) }),
      component: (
        <form>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            Name:
            <input
              value={formState.name}
              onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
              required
            />
          </label>
        </form>
      ),
    },
    {
      id: '1',
      label: 'Email',
      schema: z.object({ email: z.string().min(1) }),
      component: (
        <form>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            Email:
            <input
              type="email"
              value={formState.email}
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
              required
            />
          </label>
        </form>
      ),
    },
    {
      id: '2',
      label: 'Password',
      schema: z.object({ password: z.string().min(1) }),
      component: (
        <form>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            Password:
            <input
              type="password"
              value={formState.password}
              onChange={(e) => setFormState((s) => ({ ...s, password: e.target.value }))}
              required
            />
          </label>
        </form>
      ),
    },
  ];
  return <ProgressWizard steps={simpleFormSteps} canContinue={canContinue} setCanContinue={setCanContinue} />;
};

// Controlled story example
export const Controlled = () => {
  const [step, setStep] = useState(0);
  const controlledSteps = [
    {
      id: '0',
      label: 'Personal Info',
      schema: z.object({}),
      component: (
        <div style={{ padding: '2rem' }}>
          <h3>Step 1: Personal Info</h3>
          <p>Enter your name and age.</p>
        </div>
      ),
    },
    {
      id: '1',
      label: 'Contact Details',
      schema: z.object({}),
      component: (
        <div style={{ padding: '2rem' }}>
          <h3>Step 2: Contact Details</h3>
          <p>Enter your email and phone number.</p>
        </div>
      ),
    },
    {
      id: '2',
      label: 'Confirmation',
      schema: z.object({}),
      component: (
        <div style={{ padding: '2rem' }}>
          <h3>Step 3: Confirmation</h3>
          <p>Review and confirm your details.</p>
        </div>
      ),
    },
  ];
  return (
    <ProgressWizard
      steps={controlledSteps}
      currentStepId={String(step)}
      onStepChange={(id) => setStep(Number(id))}
      setCanContinue={() => void 0}
    />
  );
};
