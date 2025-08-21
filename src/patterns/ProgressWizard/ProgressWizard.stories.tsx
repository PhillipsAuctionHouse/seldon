import { Meta } from '@storybook/react';
import ProgressWizard, { ProgressWizardProps } from './ProgressWizard';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import { useForm, FormProvider } from 'react-hook-form';

const meta = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
} satisfies Meta<typeof ProgressWizard>;

export default meta;
export const Playground = (props: ProgressWizardProps) => <ProgressWizard {...props} />;
const exampleSteps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }];
Playground.args = {
  steps: exampleSteps,
  children: [
    <div key="step1">
      <p>Step 1: Long Description</p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    </div>,
    <div key="step2">
      <p>Step 2: Short description</p>
    </div>,
    <div key="step3">
      <p>Step 3: Another short description</p>
    </div>,
  ],
};

Playground.argTypes = {
  steps: {
    control: { type: 'object' },
    description: 'The steps to display in the ProgressWizard',
  },
  isStepValid: {
    control: { type: 'none' },
    description: 'Function to determine if a step is valid',
  },
};

// Example: Each step requires a checkbox to be checked to be valid
export const WithValidation = () => {
  const [valid, setValid] = useState([false, false, false]);

  const handleCheck = (step: number, checked: boolean) => {
    setValid((prev) => {
      const next = [...prev];
      next[step] = checked;
      return next;
    });
  };

  const children = [
    <div key="step1" style={{ margin: '5rem 0', padding: '1rem' }}>
      <Input
        id="step1"
        type="checkbox"
        labelText="Step 1: Check to continue"
        checked={valid[0]}
        onChange={(e) => handleCheck(0, e.target.checked)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
      />
    </div>,
    <div key="step2" style={{ margin: '5rem 0', padding: '1rem' }}>
      <Input
        id="step2"
        type="checkbox"
        labelText="Step 2: Check to continue"
        checked={valid[1]}
        onChange={(e) => handleCheck(1, e.target.checked)}
        style={{ display: 'flex', background: 'green', alignItems: 'center', gap: '0.5rem' }}
      />
    </div>,
    <div key="step3" style={{ margin: '5rem 0', padding: '1rem' }}>
      <Input
        id="step3"
        type="checkbox"
        labelText="Step 3: Check to submit"
        checked={valid[2]}
        onChange={(e) => handleCheck(2, e.target.checked)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      />
    </div>,
  ];

  return (
    <ProgressWizard steps={exampleSteps} isStepValid={(step) => valid[step]}>
      {children}
    </ProgressWizard>
  );
};

// New story using react-hook-form
export const WithReactHookForm = () => {
  const steps = [{ label: 'Name' }, { label: 'Email' }, { label: 'Password' }];

  // Each step has its own form context
  const forms = [useForm({ mode: 'onChange' }), useForm({ mode: 'onChange' }), useForm({ mode: 'onChange' })];

  // Validation: require each field to be filled
  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return !!forms[0].watch('name');
      case 1:
        return !!forms[1].watch('email');
      case 2:
        return !!forms[2].watch('password');
      default:
        return false;
    }
  };

  const children = [
    <FormProvider {...forms[0]} key="step1">
      <form>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          Name:
          <input {...forms[0].register('name', { required: true })} />
        </label>
      </form>
    </FormProvider>,
    <FormProvider {...forms[1]} key="step2">
      <form>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          Email:
          <input type="email" {...forms[1].register('email', { required: true })} />
        </label>
      </form>
    </FormProvider>,
    <FormProvider {...forms[2]} key="step3">
      <form>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          Password:
          <input type="password" {...forms[2].register('password', { required: true })} />
        </label>
      </form>
    </FormProvider>,
  ];

  return (
    <ProgressWizard steps={steps} isStepValid={isStepValid}>
      {children}
    </ProgressWizard>
  );
};

// Controlled story example
export const Controlled = () => {
  const [step, setStep] = useState(0);
  const steps = [{ label: 'Personal Info' }, { label: 'Contact Details' }, { label: 'Confirmation' }];
  const children = [
    <div key="step1" style={{ padding: '2rem' }}>
      <h3>Step 1: Personal Info</h3>
      <p>Enter your name and age.</p>
    </div>,
    <div key="step2" style={{ padding: '2rem' }}>
      <h3>Step 2: Contact Details</h3>
      <p>Enter your email and phone number.</p>
    </div>,
    <div key="step3" style={{ padding: '2rem' }}>
      <h3>Step 3: Confirmation</h3>
      <p>Review and confirm your details.</p>
    </div>,
  ];
  return (
    <ProgressWizard steps={steps} currentStep={step} onStepChange={setStep}>
      {children}
    </ProgressWizard>
  );
};
