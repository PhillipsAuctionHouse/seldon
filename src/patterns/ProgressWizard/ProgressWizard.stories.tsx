import ProgressWizard, { ProgressWizardProps } from './ProgressWizard';
import Input from '../../components/Input/Input';
import { ArgTypes } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
};

export default meta;

const argTypes = {
  startLabel: { control: { type: 'text' } },
  cancelLabel: { control: { type: 'text' } },
  backLabel: { control: { type: 'text' } },
  continueLabel: { control: { type: 'text' } },
  submitLabel: { control: { type: 'text' } },
  loadingState: {
    control: { type: 'select' },
    options: ['idle', 'submitting', 'loading'],
  },
  action: { control: { type: 'text' } },
  onContinue: { action: 'onContinue' },
  onCancel: { action: 'onCancel' },
  onFormSubmit: { action: 'onFormSubmit' },
  onError: { action: 'onError' },
  hideNavigation: { control: { type: 'boolean' } },
  hideProgressIndicator: { control: { type: 'boolean' } },
} as const;

// Story 1: Basic usage with custom error messages and onContinue/onCancel
export const BasicWizard = () => {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [errors, setErrors] = useState({ name: '', age: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors = {
      name: formData.name ? '' : 'Name is required.',
      age: formData.age && Number(formData.age) > 0 ? '' : 'Age must be a positive number.',
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.age) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input
          name="name"
          id="name"
          labelText="Name*"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          invalid={!!errors.name}
          invalidText={errors.name}
        />
        <Input
          name="age"
          id="age"
          labelText="Age*"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          invalid={!!errors.age}
          invalidText={errors.age}
        />
      </ProgressWizard>
    </form>
  );
};
BasicWizard.argTypes = argTypes;

// Story 2: Zod validation
export const ValidationWizard = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input
          name="email"
          id="email"
          labelText="E-mail Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          invalid={!!error}
          invalidText={error}
        />
      </ProgressWizard>
    </form>
  );
};
ValidationWizard.argTypes = argTypes;

// Story 3: Async validation and all on* functions
export const AsyncValidationWizardWithCallbacks = () => {
  const [formData, setFormData] = useState({ email: '', confirm: '' });
  const [errors, setErrors] = useState({ email: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newErrors = {
      email: formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) ? '' : 'Please enter a valid email address.',
      confirm: formData.email === formData.confirm ? '' : 'Emails must match.',
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.confirm) {
      alert(JSON.stringify(formData, null, 2));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressWizard
        loadingState={loading ? 'loading' : 'idle'}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input
          name="email"
          id="email"
          labelText="Email*"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          invalid={!!errors.email}
          invalidText={errors.email}
        />
        <Input
          name="confirm"
          id="confirm"
          labelText="Confirm Email*"
          value={formData.confirm}
          onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
          invalid={!!errors.confirm}
          invalidText={errors.confirm}
        />
      </ProgressWizard>
    </form>
  );
};
AsyncValidationWizardWithCallbacks.argTypes = argTypes;

export const Playground: {
  render: (props: ProgressWizardProps) => JSX.Element;
  args: ProgressWizardProps;
  argTypes: ArgTypes;
} = {
  render: ({
    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',
    loadingState = 'idle',
    hideNavigation,
    hideProgressIndicator,
  }) => {
    return (
      <form onSubmit={(data) => alert(JSON.stringify(data, null, 2))}>
        <ProgressWizard
          loadingState={loadingState}
          startLabel={startLabel}
          cancelLabel={cancelLabel}
          backLabel={backLabel}
          continueLabel={continueLabel}
          submitLabel={submitLabel}
          hideNavigation={hideNavigation}
          hideProgressIndicator={hideProgressIndicator}
        >
          <Input name="field1" id="field1" labelText="Field 1*" />
          <Input name="field2" id="field2" labelText="Field 2*" />
        </ProgressWizard>
      </form>
    );
  },
  args: {},
  argTypes,
};
