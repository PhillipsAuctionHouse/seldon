import { useState } from 'react';
import { useWizardForm } from './Hooks/useProgressWizardForm';
import ProgressWizard from './ProgressWizard';
import { ProgressWizardFormProvider } from './Providers/ProgressWizardFormProvider';
import { type FormStep, type GenericFormState, type StepSchema } from './types';
import { z } from 'zod';
import { type Meta } from '@storybook/react';
import Input from '../../components/Input/Input';

const meta = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
} satisfies Meta<typeof ProgressWizard>;

export default meta;

// Example step schemas
const nameStepSchema: StepSchema = z.object({
  name: z.string().min(2, 'Name is required'),
});
const ageStepSchema: StepSchema = z.object({
  age: z.preprocess(Number, z.number().min(18, 'Must be at least 18')),
});
const emailStepSchema: StepSchema = z.object({
  email: z.string().email('Invalid email'),
});

// Example step components using useWizardForm
const NameStep = () => {
  const { registerProgressWizardInput } = useWizardForm();
  return <Input {...registerProgressWizardInput('name', { isRequired: true })} placeholder="Name" />;
};
const AgeStep = () => {
  const { registerProgressWizardInput } = useWizardForm();
  return <Input {...registerProgressWizardInput('age', { isRequired: true })} type="number" placeholder="Age" />;
};
const EmailStep = () => {
  const { registerProgressWizardInput } = useWizardForm();
  return <Input {...registerProgressWizardInput('email', { isRequired: true })} type="email" placeholder="Email" />;
};

const steps: FormStep[] = [
  {
    id: 'name',
    label: 'Name',
    component: NameStep,
    schema: nameStepSchema,
    hiddenFields: [],
  },
  {
    id: 'age',
    label: 'Age',
    component: AgeStep,
    schema: ageStepSchema,
    hiddenFields: [],
  },
  {
    id: 'email',
    label: 'Email',
    component: EmailStep,
    schema: emailStepSchema,
    hiddenFields: [],
  },
];

// Uncontrolled Example
export const UncontrolledWizard = () => (
  <ProgressWizard
    isControlled={false}
    steps={steps}
    activeStepId={steps[0].id}
    startLabel="Begin"
    cancelLabel="Abort"
    backLabel="Previous"
    continueLabel="Next"
    submitLabel="Finish"
    customHeader={<h2>Uncontrolled Wizard Example</h2>}
  />
);

// Controlled Example
export const ControlledWizard = () => {
  const [formState, _setFormState] = useState<GenericFormState>({});
  const [activeStepId, setActiveStepId] = useState(steps[0].id);
  const [canContinue, _setCanContinue] = useState(true);
  const [isLoading, _setIsLoading] = useState(false);

  const handleStepPrev = () => {
    const idx = steps.findIndex((s) => s.id === activeStepId);
    if (idx > 0) setActiveStepId(steps[idx - 1].id);
  };
  const handleStepNext = () => {
    const idx = steps.findIndex((s) => s.id === activeStepId);
    if (idx < steps.length - 1) setActiveStepId(steps[idx + 1].id);
  };

  const handleSubmit = () => {
    alert('Submitted: ' + JSON.stringify(formState));
  };

  return (
    <ProgressWizardFormProvider>
      <ProgressWizard
        isControlled={true}
        steps={steps}
        activeStepId={activeStepId}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
        customHeader={<h2>Controlled Wizard Example</h2>}
        isCanContinue={canContinue}
        isLoading={isLoading}
        handleStepPrev={handleStepPrev}
        handleStepNext={handleStepNext}
        handleSubmit={handleSubmit}
        onCancel={() => setActiveStepId(steps[0].id)}
        onError={(err) => alert('Error: ' + err)}
        defaultValues={formState}
      />
    </ProgressWizardFormProvider>
  );
};

// Example 3: Wizard with async validation
export const AsyncValidationWizard = () => {
  const [activeStepId, setActiveStepId] = useState(steps[0].id);
  const [canContinue, _setCanContinue] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleStepNext = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    const idx = steps.findIndex((s) => s.id === activeStepId);
    if (idx < steps.length - 1) {
      const schema = steps.find((s) => s.id === activeStepId)?.schema;
      if (schema) {
        const result = schema.safeParse(formMethods.getValues());
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            console.log(issue, issue.path);
            formMethods.setError(String(issue.path[0]), {
              type: 'manual',
              message: issue.message,
            });
          });
          return;
        }
      }
      setActiveStepId(steps[idx + 1].id);
    }
  };

  return (
    <ProgressWizardFormProvider>
      <ProgressWizard
        isControlled={true}
        steps={steps}
        activeStepId={activeStepId}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
        customHeader={<h2>Async Validation Wizard</h2>}
        isCanContinue={canContinue}
        isLoading={isLoading}
        handleStepPrev={() => setActiveStepId(steps[0].id)}
        handleStepNext={handleStepNext}
        handleSubmit={() => alert('Async submit')}
      />
    </ProgressWizardFormProvider>
  );
};

// Example 4: Wizard with custom header and step skipping
export const SkippingWizard = () => {
  const [activeStepId, setActiveStepId] = useState(steps[0].id);
  const [canContinue, _setCanContinue] = useState(true);

  const handleStepNext = () => {
    const idx = steps.findIndex((s) => s.id === activeStepId);
    // Example: skip age step if name is 'Admin' (would need form state access 🎺TODO)
    if (idx === 0 /* && formState.name === 'Admin' */) {
      setActiveStepId(steps[2].id);
    } else if (idx < steps.length - 1) {
      setActiveStepId(steps[idx + 1].id);
    }
  };

  return (
    <ProgressWizardFormProvider>
      <ProgressWizard
        isControlled={true}
        steps={steps}
        activeStepId={activeStepId}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
        customHeader={
          <div>
            <h2>Skipping Wizard</h2>
            <p>Custom header with instructions.</p>
          </div>
        }
        isCanContinue={canContinue}
        handleStepPrev={() => setActiveStepId(steps[0].id)}
        handleStepNext={handleStepNext}
        handleSubmit={() => alert('Skipped submit')}
      />
    </ProgressWizardFormProvider>
  );
};
