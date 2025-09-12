import { forwardRef, useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type LoadingState,
  type ButtonLabels,
  type CallbackProps,
  type ProgressWizardBaseProps,
  type FormStep,
} from './types';
import InnerProgressWizard from './components/InnerProgressWizard';
import { z } from 'zod';
import { mergeZodEffects } from './utils';
import { v4 as uuidv4 } from 'uuid'

/**
 * Props for the main ProgressWizard component. Accepts either 'action' or 'onSubmit', but not both.
 *
 * @property steps - Array of FormStep objects (wizard steps, the primary configuration object).
 * @property loadingState - Current loading state (aligns with remix fetchers, see LoadingState)
 * @property defaultValues - Optional initial form values
 * @property customHeader - Optional custom header ReactNode, displays above progress bar.
 * 
 * @property hideNavigation - If true, hides the default footer navigation (so you can implement your own)
 * @property hideProgressIndicator - If true, hides the progress indicator bar.
 * 
 * @property formSchema - Optional Zod schema for form validation. Will be overridden by schemas provided to specific steps.
 * @property action - Optional form action URL, only if 'onSubmit' is not provided.
 * 
 * @property startLabel, cancelLabel, backLabel, continueLabel, submitLabel - Button labels for navigation
 * 
 * @property onSubmit - Called on final submit (receives all form data). Not compatible with the `action` prop, because it overrides native submit.
 * @property onContinue - Called before advancing to next step (return false to block navigation)
 * @property onBack - Called before going back (return false to block navigation)
 * @property onCancel - Called when cancelling the wizard
 * @property onError - Called when validation errors occur
 * 
 * @remarks
 *   Only one of `action` or `onSubmit` should be provided. If both are present, Typescript will get mad and `action` will be ignored.
 */
type ProgressWizardProps =
  | (Omit<ProgressWizardBaseProps, 'action'> &
      ButtonLabels &
      Omit<CallbackProps, 'onSubmit'> & { action: string; onSubmit?: undefined })
  | (Omit<ProgressWizardBaseProps, 'action'> &
      ButtonLabels &
      CallbackProps & { action?: 'Action cannot be present when `onSubmit` is supplied' });

/**
 * Main ProgressWizard component. Renders a multi-step form with validation, navigation, and custom UI.
 *
 * Use this component to build a step-by-step form experience. Each step is defined by a FormStep object.
 *
 * @param props - ProgressWizardProps
 * @returns ReactElement with wizard UI
 *
 * @example
 * <ProgressWizard
 *   steps={[{ id: 'step1', label: 'Step 1', schema: z.object({}), componentFactory: (formContextAndOtherGoodies) => <div>Step 1</div> }]}
 *   loadingState="idle"
 *   onSubmit={(data) => alert(JSON.stringify(data))}
 * />
 */
const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>((props, ref) => {
  const {
    steps: propSteps,
    defaultValues,
    loadingState: extLoadingState,
    customHeader,
    hideNavigation,
    hideProgressIndicator,

    formSchema = z.object({}), // Default to empty schema to allow merging
    action,

    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',

    onContinue,
    onBack,
    onCancel,
    onSubmit,
    onError,
  } = props;

  // Ensure every step has at least an empty ZodObject as its schema
  const steps = propSteps.map((step) => ({ ...step, schema: step.schema ?? z.object({}) }));

  // Nest each step's schema under its step id
  const namespacedStepSchemas = steps.map((step) => z.object({ [step.id]: step.schema }));

  // If formSchema is provided, nest it under 'formSchema'
  const namespacedFormSchema = z.object({ formSchema });

  if (steps.length > 10 && !hideProgressIndicator) {
    console.warn(
      'ProgressWizard',
      'You have more than 10 steps. Consider setting `hideProgressIndicator` because it is going to look weird.',
    );
  }

  const formId = `progress-wizard-form-${uuidv4()}`;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Loading state management, allow overriding of internal loading state when the external prop change
  const [loadingState, setLoadingState] = useState<LoadingState>(extLoadingState);

  useEffect(() => {
    setLoadingState(extLoadingState);
  }, [extLoadingState]);

  // Merge namespaced schemas
  const combinedSchema = mergeZodEffects([namespacedFormSchema, ...namespacedStepSchemas]);

  const formMethods = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues,
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  const getIsValid = async (formStep: Omit<FormStep, 'schema'> & { schema: NonNullable<FormStep['schema']> }) => {
    // If step schema is provided, validate only those fields, otherwise validate all fields in formSchema
    const [schema, prefix] =
      Object.keys(formStep.schema.shape).length > 0 ? [formStep.schema, formStep.id] : [formSchema, 'formSchema'];
    const stepFieldNames = Object.keys(schema.shape).map((field) => `${prefix}.${field}`);
    return await formMethods.trigger(stepFieldNames);
  };

  const handleContinue = async () => {
    formMethods.clearErrors();
    setLoadingState('submitting');
    const valid = await getIsValid(currentStep);

    if (onContinue && onContinue(formMethods.getValues()) === false) {
      setLoadingState('idle');
      return;
    }
    if (valid && !isLastStep) setCurrentStepIndex((idx) => idx + 1);
    setLoadingState('idle');
  };

  const handleBack = () => {
    if (onBack && onBack(formMethods.getValues()) === false) return;
    if (!isFirstStep) setCurrentStepIndex((idx) => idx - 1);
    else console.error('ProgressWizard', 'Cannot go back from first step');
  };

  const handleCancel = () => {
    if (onCancel) onCancel(formMethods.getValues());
  };

  const handleSubmit = onSubmit
    ? () => {
        onSubmit(formMethods.getValues());
      }
    : async () => {
        formMethods.clearErrors();
        setLoadingState('submitting');
        try {
          const valid = await getIsValid(currentStep);
          if (valid) {
            const form = document.getElementById(formId);
            if (form && form instanceof HTMLFormElement) {
              form.submit();
            }
          }
        } catch (error) {
          if (onError) {
            const errorType: Parameters<typeof onError>[1] =
              typeof error === 'string'
                ? 'string'
                : error && typeof error === 'object' && 'message' in error
                  ? 'FieldErrors'
                  : `unknown: ${typeof error}`;

            onError(error, errorType);
            if (errorType.startsWith('unknown')) {
              console.error('handleSubmit', 'An error of an unknown type occurred: ' + String(error));
              if (error && typeof error === 'object') {
                console.error('handleSubmit', 'Error object entries: ' + Object.entries(error));
              }
            }
          }
          // too much variation here
          if (typeof error === 'string') {
            console.error('handleSubmit', 'Error submitting form (string): ' + error);
          } else if (error instanceof Error) {
            console.error('handleSubmit', 'Error submitting form (Error object): ' + error.message + ' ' + error.stack);
          } else if (error && typeof error === 'object') {
            console.error('handleSubmit', 'Error submitting form (object): ' + Object.entries(error));
            for (const [key, value] of Object.entries(error)) {
              console.error('handleSubmit', `Error property [${key}]: ${String(value)}`);
            }
          } else {
            console.error('handleSubmit', 'Error submitting form (unknown error type): ' + String(error));
          }
        } finally {
          setLoadingState('idle');
        }
      };

  return (
    <FormProvider {...formMethods}>
      <InnerProgressWizard
        ref={ref}
        formId={formId}
        steps={steps}
        currentStepIndex={currentStepIndex}
        setCurrentStepIndex={setCurrentStepIndex}
        customHeader={customHeader}
        hideNavigation={hideNavigation}
        hideProgressIndicator={hideProgressIndicator}
        buttonLabels={{ startLabel, cancelLabel, backLabel, continueLabel, submitLabel }}
        loadingState={loadingState}
        setLoadingState={setLoadingState}
        action={action}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        handleContinue={handleContinue}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </FormProvider>
  );
});

ProgressWizard.displayName = 'ProgressWizard';
export default ProgressWizard;
