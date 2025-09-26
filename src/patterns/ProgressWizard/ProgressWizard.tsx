import { forwardRef, useState, useEffect, useRef, type SetStateAction } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type LoadingState,
  type ButtonLabels,
  type CallbackProps,
  type ProgressWizardBaseProps,
  type NamespacedSchemas,
} from './types';
import InnerProgressWizard from './components/InnerProgressWizard';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

/**
 * Props for the main ProgressWizard component. Accepts either 'action' or 'onSubmit', but not both.
 *
 * @property steps - Array of FormStep objects (wizard steps, the primary configuration object).
 * @property loadingState - Current loading state (aligns with remix fetchers, see type LoadingState)+
 * @property defaultValues - Optional initial form values
 * @property customHeader - Optional custom header ReactNode, displays above progress bar.
 *
 * @property hideNavigation - If true, hides the default footer navigation (so you can implement your own via the `setCurrentStepIndex`
 *   function in the step component factory). Note that this removes the default triggers for `onContinue`, `onBack`, `onSubmit`, and `onCancel`. These are instead available to the step component factory under the `handlers` property.
 * @property hideProgressIndicator - If true, hides the progress indicator bar.
 *
 * @property action - Optional form action URL, only if 'onSubmit' is not provided.
 *
 * @property startLabel, cancelLabel, backLabel, continueLabel, submitLabel - Button labels for navigation
 *
 * @property onSubmit - Called if present on final submit (receives all form data). Not compatible with the `action` prop, because it overrides native submit.
 * @property onContinue - Called if present before advancing to next step (return false to block navigation, useful for validation if not using step schemas)
 * @property onBack - Called if present before going back (return false to block navigation)
 * @property onCancel - Called if present when cancelling the wizard
 * @property onError - Called if present when validation errors occur
 *
 * @remarks
 *   Only one of `action` or `onSubmit` should be provided. If both are present, Typescript will get mad and `action` will be ignored.
 *
 * @todo `onContinue` should provide a mechanism for setting per-field error messages
 */
export interface ProgressWizardProps extends ProgressWizardBaseProps, ButtonLabels, CallbackProps {}

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
  const namespacedStepSchemas = steps.reduce(
    (acc, { id, schema }) => ({ ...acc, [id]: schema }),
    {} as NamespacedSchemas,
  );

  if (steps.length > 10 && !hideProgressIndicator) {
    console.warn(
      'ProgressWizard',
      'You have more than 10 steps. Consider setting `hideProgressIndicator` because it is going to look weird.',
    );
  }

  if (onSubmit && action) {
    console.warn('ProgressWizard', 'Both `onSubmit` and `action` props were provided. `action` will be ignored.');
  }

  const formIdRef = useRef<string>(`progress-wizard-form-${uuidv4()}`);
  const formId = formIdRef.current;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Loading state management, allow overriding of internal loading state when the external prop change
  const [loadingState, setLoadingState] = useState<LoadingState>(extLoadingState ?? 'idle');

  // Skip updating currentStepIndex if navigation is hidden, because that means the consumer is managing it themselves
  const setCurrentStepIndexHandler: (arg: SetStateAction<number>) => void = (arg) => {
    if (!hideNavigation) setCurrentStepIndex(arg);
  };

  useEffect(() => {
    setLoadingState(extLoadingState ?? 'idle');
  }, [extLoadingState]);

  const formMethods = useForm({
    resolver: zodResolver(z.object({ ...namespacedStepSchemas })),
    defaultValues,
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  const getIsValid = async () => {
    const relevantSteps = steps.filter((_, i) => i <= currentStepIndex);
    const result = await formMethods.trigger(relevantSteps.filter((_, i) => i <= currentStepIndex).map(({ id }) => id));
    return result;
  };

  const handleContinue = async () => {
    formMethods.clearErrors();
    setLoadingState('submitting');

    if (onContinue && onContinue(formMethods.getValues()) === false) {
      setLoadingState('idle');
      return;
    }

    const valid = await getIsValid();
    if (valid && !isLastStep) setCurrentStepIndexHandler((idx) => idx + 1);

    setLoadingState('idle');
  };

  const handleBack = () => {
    if (onBack && onBack(formMethods.getValues()) === false) return;
    if (!isFirstStep) setCurrentStepIndexHandler((idx) => idx - 1);
    else console.error('ProgressWizard', 'Cannot go back from first step');
  };

  const handleCancel = () => {
    if (onCancel) onCancel(formMethods.getValues());
  };

  const handleSubmit = async () => {
    if (currentStep.schema) formMethods.clearErrors();
    try {
      setLoadingState('submitting');
      if (onSubmit) {
        onSubmit(formMethods.getValues());
        return;
      } else {
        const valid = await getIsValid();
        if (valid) {
          const form = document.getElementById(formId);
          if (form && form instanceof HTMLFormElement) {
            form.submit();
          }
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
