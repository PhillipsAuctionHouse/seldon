import { Meta } from '@storybook/react';
import ProgressWizard, { ProgressWizardProps } from './ProgressWizard';
import { useState } from 'react';
import Input from '../../components/Input/Input';

const meta = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
} satisfies Meta<typeof ProgressWizard>;

export default meta;
export const Playground = (props: ProgressWizardProps) => <ProgressWizard {...props} />;
const exampleSteps = [
  { id: '0', label: 'Step 1' },
  { id: '1', label: 'Step 2' },
  { id: '2', label: 'Step 3' },
];
Playground.args = {
  steps: exampleSteps,
  children: (
    <>
      <div key="step1">
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
      <div key="step2">
        <p>Step 2: Short description</p>
      </div>
      <div key="step3">
        <p>Step 3: Another short description</p>
      </div>
    </>
  ),
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

  const children = (
    <>
      <div key="step1" style={{ margin: '5rem 0', padding: '1rem' }}>
        <Input
          id="step1"
          type="checkbox"
          labelText="Step 1: Check to continue"
          checked={valid[0]}
          onChange={(e) => handleCheck(0, e.target.checked)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        />
      </div>
      <div key="step2" style={{ margin: '5rem 0', padding: '1rem' }}>
        <Input
          id="step2"
          type="checkbox"
          labelText="Step 2: Check to continue"
          checked={valid[1]}
          onChange={(e) => handleCheck(1, e.target.checked)}
          style={{ display: 'flex', background: 'green', alignItems: 'center', gap: '0.5rem' }}
        />
      </div>
      <div key="step3" style={{ margin: '5rem 0', padding: '1rem' }}>
        <Input
          id="step3"
          type="checkbox"
          labelText="Step 3: Check to submit"
          checked={valid[2]}
          onChange={(e) => handleCheck(2, e.target.checked)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        />
      </div>
    </>
  );

  const safeIsStepValid = (step?: number) => (typeof step === 'number' ? valid[step] : false);
  return (
    <ProgressWizard steps={exampleSteps} isStepValid={safeIsStepValid} reportStepValidity={() => {}}>
      {children}
    </ProgressWizard>
  );
};

// New story using simple controlled form state
export const WithSimpleForm = () => {
  const steps = [
    { id: '0', label: 'Name' },
    { id: '1', label: 'Email' },
    { id: '2', label: 'Password' },
  ];
  const [formState, setFormState] = useState({ name: '', email: '', password: '' });

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

  const children = (
    <>
      <form key="step1">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          Name:
          <input
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
            required
          />
        </label>
      </form>
      <form key="step2">
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
      <form key="step3">
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
    </>
  );

  return (
    <ProgressWizard steps={steps} isStepValid={isStepValid} reportStepValidity={() => {}}>
      {children}
    </ProgressWizard>
  );
};

// Controlled story example
export const Controlled = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { id: '0', label: 'Personal Info' },
    { id: '1', label: 'Contact Details' },
    { id: '2', label: 'Confirmation' },
  ];
  const children = (
    <>
      <div key="step1" style={{ padding: '2rem' }}>
        <h3>Step 1: Personal Info</h3>
        <p>Enter your name and age.</p>
      </div>
      <div key="step2" style={{ padding: '2rem' }}>
        <h3>Step 2: Contact Details</h3>
        <p>Enter your email and phone number.</p>
      </div>
      <div key="step3" style={{ padding: '2rem' }}>
        <h3>Step 3: Confirmation</h3>
        <p>Review and confirm your details.</p>
      </div>
    </>
  );
  return (
    <ProgressWizard steps={steps} currentStep={step} onStepChange={setStep} reportStepValidity={() => {}}>
      {children}
    </ProgressWizard>
  );
};
