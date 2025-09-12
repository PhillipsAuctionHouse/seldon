import ProgressWizard from './ProgressWizard';
import { useRef } from 'react';
import { z } from 'zod';
import Input from '../../components/Input/Input';
import { type Meta } from '@storybook/react';
import { type FormStep } from './types';

const meta = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
} satisfies Meta<typeof ProgressWizard>;

export default meta;

const translations: Record<string, string> = {
  name: 'Name',
  nameRequired: 'Name is required',
  email: 'Email',
  emailRequired: 'Email is required',
  age: 'Age',
  ageRequired: 'Age is required',
};

const t = (key: string) => translations[key] || key;

// Story 1: Basic usage with custom error messages and onContinue/onCancel
export const BasicWizard = () => {
  const steps: FormStep[] = [
    {
      id: 'step1',
      label: 'Step 1',
      schema: z.object({
        name: z.string().min(1, { message: 'Please enter your name' }),
      }),
      componentFactory: ({ registerProgressWizardInput }) => <Input {...registerProgressWizardInput('name')} />,
    },
    {
      id: 'step2',
      label: 'Step 2',
      schema: z.object({
        age: z.preprocess(Number, z.number().min(18, { message: 'You must be at least 18' })),
      }),
      componentFactory: ({ registerProgressWizardInput }) => (
        <Input {...registerProgressWizardInput('age', { overrides: { type: 'number' } })} />
      ),
    },
  ];
  const alertedOnContinue = useRef(false);
  return (
    <ProgressWizard
      steps={steps}
      loadingState="idle"
      onContinue={() => {
        if (!alertedOnContinue.current) {
          alert(
            'Called `onContinue`, which can prevent continuing if it returns `false`. Will hide this message until reload.',
          );
          alertedOnContinue.current = true;
        }
        return true;
      }}
      onCancel={() => alert('Called `onCancel`, without which cancelling does nothing')}
      onSubmit={(data) => alert(`Called \`onSubmit\`. Form data: ${JSON.stringify(data)}`)}
      startLabel="Start"
      cancelLabel="Cancel"
      backLabel="Back"
      continueLabel="Continue"
      submitLabel="Submit"
    />
  );
};

// Story 2: Zod validation with translation function and onError
export const TranslationWizard = () => {
  const steps: FormStep[] = [
    {
      id: 'step1',
      label: 'Step 1',
      schema: z.object({
        email: z.string().email({ message: t('emailRequired') }),
      }),
      componentFactory: ({ registerProgressWizardInput }) => (
        <Input {...registerProgressWizardInput('email', { translationFunction: t })} />
      ),
    },
  ];
  return (
    <ProgressWizard
      steps={steps}
      loadingState="idle"
      onSubmit={(data) => alert('Submitted: ' + JSON.stringify(data))}
      onError={(error) => alert('Error: ' + error.email?.message)}
      startLabel="Start"
      cancelLabel="Cancel"
      backLabel="Back"
      continueLabel="Continue"
      submitLabel="Submit"
    />
  );
};

// Story 3: Async validation and all on* functions

const asyncEmailSchema = z
  .string()
  .email({ message: 'Must be a valid email' })
  .refine(
    async (val) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return val !== 'taken@example.com';
    },
    { message: 'Email is already taken' },
  );
export const AsyncValidationWizard = () => {
  const steps: FormStep[] = [
    {
      id: 'step1',
      label: 'Step 1',
      schema: z.object({
        email: asyncEmailSchema,
      }),
      componentFactory: ({ registerProgressWizardInput }) => (
        <Input
          {...registerProgressWizardInput('email', {
            overrides: { labelText: "Type 'taken@example.com' for refinement error" },
          })}
        />
      ),
    },
    {
      id: 'step2',
      label: 'Step 2',
      schema: z.object({
        confirm: z.string().min(1, { message: 'Please confirm.' }),
      }),
      componentFactory: ({ registerProgressWizardInput }) => <Input {...registerProgressWizardInput('confirm')} />,
    },
  ];

  const alerts = useRef<string[]>([]);
  return (
    <ProgressWizard
      steps={steps}
      loadingState="idle"
      onBack={() => {
        if (!alerts.current.includes('Back')) {
          alert('Back (will only alert once)');
          alerts.current.push('Back');
        }
        return true;
      }}
      onContinue={() => {
        if (!alerts.current.includes('Continue')) {
          alert('Continue (will only alert once)');
          alerts.current.push('Continue');
        }
        return true;
      }}
      onCancel={() => {
        if (!alerts.current.includes('Cancel')) {
          alert('Cancel (will only alert once)');
          alerts.current.push('Cancel');
        }
      }}
      onSubmit={(data) => alert('Submit: ' + JSON.stringify(data))}
      onError={(error) => alert('Error: ' + JSON.stringify(error))}
      startLabel="Start"
      cancelLabel="Cancel"
      backLabel="Back"
      continueLabel="Continue"
      submitLabel="Submit"
    />
  );
};

// Story 4: Mixed usage, translation, and custom error
export const MixedWizard = () => {
  const steps: FormStep[] = [
    {
      id: 'step1',
      label: 'Step 1',
      schema: z.object({
        username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
      }),
      componentFactory: ({ registerProgressWizardInput }) => <Input {...registerProgressWizardInput('username')} />,
    },
    {
      id: 'step2',
      label: 'Step 2',
      schema: z.object({
        password: z.string().min(6, { message: t('passwordRequired') }),
      }),
      componentFactory: ({ registerProgressWizardInput }) => (
        <Input
          {...registerProgressWizardInput('password', { overrides: { type: 'password' }, translationFunction: t })}
        />
      ),
    },
  ];
  return (
    <ProgressWizard
      steps={steps}
      loadingState="idle"
      onContinue={() => {
        alert('Continue');
        return true;
      }}
      onCancel={() => alert('Cancel')}
      onSubmit={(data) => alert('Submit: ' + JSON.stringify(data))}
      onError={(error) => alert('Error: ' + JSON.stringify(error))}
      startLabel="Start"
      cancelLabel="Cancel"
      backLabel="Back"
      continueLabel="Continue"
      submitLabel="Submit"
    />
  );
};
