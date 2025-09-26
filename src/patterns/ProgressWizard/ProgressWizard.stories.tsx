import ProgressWizard, { ProgressWizardProps } from './ProgressWizard';
import { useRef } from 'react';
import { z } from 'zod';
import Input from '../../components/Input/Input';
import { ArgTypes } from '@storybook/react';
import { type FormStep } from './types';
import { type FieldErrors } from 'react-hook-form';

const meta = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
};

export default meta;

const translations: Record<string, string> = {
  name: 'Name',
  nameRequired: 'Name is required',
  email: 'Email',
  emailRequired: 'Email is required',
  age: 'Age',
  ageRequired: 'Age is required',
  password: 'Password',
  passwordRequired: 'Password is required',
};

const t = (key: string) => translations[key] || key;

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
  onSubmit: { action: 'onSubmit' },
  onError: { action: 'onError' },
  hideNavigation: { control: { type: 'boolean' } },
  hideProgressIndicator: { control: { type: 'boolean' } },
} as const;

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
      onSubmit={(data) =>
        alert(
          `Called \`onSubmit\`, which replaces native form submission and validation. Both can still happen via function passed through the component factory.\n\nForm data: ${JSON.stringify(data)}`,
        )
      }
      startLabel="Start"
      cancelLabel="Cancel"
      backLabel="Back"
      continueLabel="Continue"
      submitLabel="Submit"
    />
  );
};
BasicWizard.argTypes = argTypes;

// Story 2: Zod validation with translation function and onError

export const TranslationWizard = () => {
  const steps: FormStep[] = [
    {
      id: 'step1',
      label: 'Step 1',
      schema: z.object({
        email: z
          .string()
          .min(1, { message: t('emailRequired') })
          .email({ message: t('emailInvalid') }),
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
      onError={(error, errorType) =>
        alert('Error: ' + (errorType === 'FieldErrors' ? (error as FieldErrors).email?.message : error))
      }
      startLabel="Start"
      cancelLabel="Cancel"
      backLabel="Back"
      continueLabel="Continue"
      submitLabel="Submit"
    />
  );
};
TranslationWizard.argTypes = argTypes;

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
AsyncValidationWizard.argTypes = argTypes;

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
        password: z
          .string()
          .min(1, { message: t('passwordRequired') })
          .refine((data) => data.length < 6, {
            message: 'Password must be longer than five characters',
            path: ['password'],
          }),
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
      onContinue={(data) => {
        if (data.step1.username !== 'please') {
          alert('onContinue called, disallowing continuing until `username` is "please"');
          return false;
        }
        return true;
      }}
      onCancel={() => alert('Cancel')}
      action="/submit-here"
      onError={(error) => alert('Error: ' + JSON.stringify(error))}
      startLabel="Start"
      cancelLabel="Cancel"
      backLabel="Back"
      continueLabel="Continue"
      submitLabel="Submit"
    />
  );
};
MixedWizard.argTypes = argTypes;

export const Playground: {
  render: (props: ProgressWizardProps) => JSX.Element;
  args: ProgressWizardProps;
  argTypes: ArgTypes;
} = {
  render: ({
    steps,
    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',

    onContinue = () => true,
    onCancel = () => {},
    onSubmit,
    onError = (error: unknown) => {
      console.error('Playground Error: ' + JSON.stringify(error, null, 2));
    },
    loadingState = 'idle',
    action,

    hideNavigation,
    hideProgressIndicator,
  }) => {
    return (
      <ProgressWizard
        steps={steps}
        customHeader={<h3 style={{ textAlign: 'center' }}>Playground Wizard</h3>}
        loadingState={loadingState}
        onContinue={onContinue}
        onCancel={onCancel}
        onError={onError}
        startLabel={startLabel}
        cancelLabel={cancelLabel}
        backLabel={backLabel}
        continueLabel={continueLabel}
        submitLabel={submitLabel}
        onSubmit={onSubmit}
        action={action}
        hideNavigation={hideNavigation}
        hideProgressIndicator={hideProgressIndicator}
      />
    );
  },
  args: {
    steps: [
      {
        id: 'step1',
        label: 'Step 1',
        schema: z.object({
          favoriteSmokeyRobinsonSong: z.string().min(1, { message: 'Favorite Smokey Robinson song required' }),
        }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input
            {...registerProgressWizardInput('favoriteSmokeyRobinsonSong', {
              overrides: { labelText: 'Favorite song by Smokey Robinson:' },
            })}
          />
        ),
      },
      {
        id: 'step2',
        label: 'Step 2',
        hiddenFields: ['favoriteSmokeyRobinsonSong'],
        schema: z
          .object({
            favoriteSmokeyRobinsonSong: z.string(),
            didYouLie: z.boolean(),
          })
          .refine(
            (data) => {
              const songName = data.favoriteSmokeyRobinsonSong.trim().toLowerCase();
              const lied = data.didYouLie;
              return (songName === 'i second that emotion') === !lied;
            },
            {
              message:
                'If your favorite is "I Second That Emotion", you must not have lied. If you picked another song, you must admit you lied.',
              path: ['didYouLie'],
            },
          ),
        componentFactory: ({ registerProgressWizardInput, watch, setValue }) => {
          if (watch('step2.favoriteSmokeyRobinsonSong') !== watch('step1.favoriteSmokeyRobinsonSong')) {
            setValue('step2.favoriteSmokeyRobinsonSong', watch('step1.favoriteSmokeyRobinsonSong'));
          }

          return (
            <>
              <Input {...registerProgressWizardInput('favoriteSmokeyRobinsonSong')} />
              <div style={{ marginTop: 24 }}>
                <Input
                  {...registerProgressWizardInput('didYouLie', {
                    overrides: {
                      type: 'checkbox',
                      labelText: 'Did you lie? Check if yes.',
                      style: {
                        width: 20,
                        height: 20,
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      },
                    },
                  })}
                />
              </div>
            </>
          );
        },
      },
    ],
  },
  argTypes,
};
