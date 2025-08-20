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
