import { forwardRef, useState, useRef, useCallback, type SetStateAction, useEffect } from 'react';
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
import { useHandleActions } from './hooks/useHandleActions';
import { useHistoryManagement } from './hooks/useHistoryManagement';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

/**
 * Props for the main ProgressWizard component.
 *
 * @property steps - Array of FormStep objects (wizard steps, the primary configuration object).
 * @property loadingState - Current loading state (aligns with remix fetchers, see type LoadingState)+
 * @property defaultValues - Optional initial form values
 * @property customHeader - Optional custom header ReactNode, displays above progress bar.
 *
 * @property hideNavigation - If true, hides the default footer navigation (so you can implement your own via the `setCurrentStepIndex`
 *   function in the step component factory). Note that this removes the default triggers for `onContinue`, `onBack`, `onFormSubmit`, and `onCancel`. These are instead available to the step component factory under the `handlers` property.
 * @property hideProgressIndicator - If true, hides the progress indicator bar.
 *
 * @property manageHistory - If true, the wizard will push history states on step changes, allowing the browser back/forward buttons to navigate between steps. Default is true.
 *
 * @property action - Optional form action URL, ignored if 'onFormSubmit' is provided.
 *
 * @property startLabel, cancelLabel, backLabel, continueLabel, submitLabel - Button labels for navigation
 *
 * @property onFormSubmit - Called if present on final submit (receives all form data, and a function to check if the current step is valid). Not compatible with the `action` prop, because it overrides native form submit.
 * @property onContinue - Called if present before advancing to next step (return false to block navigation, useful for validation if not using step schemas)
 * @property onBack - Called if present before going back (return false to block navigation)
 * @property onCancel - Called if present when cancelling the wizard
 * @property onError - Called if present when validation errors occur
 *
 * @remarks
 *   Only one of `action` or `onFormSubmit` should be provided. If both are present, Typescript will get mad and `action` will be ignored.
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
 *   onFormSubmit={(data) => alert(JSON.stringify(data))}
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

    action: _action,

    manageHistory = true,

    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',

    onContinue,
    onBack,
    onCancel,
    onFormSubmit,
    onError,
  } = props;

  /*                       *\
        ✨ Prop prep ✨ 
  \*                       */

  // Ensure every step has at least an empty ZodObject as its schema
  const steps = propSteps.map((step) => ({ ...step, schema: step.schema ?? z.object({}) }));
  // Nest each step's schema under its step id
  const namespacedStepSchemas = steps.reduce(
    (acc, { id, schema }) => ({ ...acc, [id]: schema }),
    {} as NamespacedSchemas,
  );

  if (steps.length > 10 && !hideProgressIndicator) {
    console.warn(
      '[ProgressWizard]',
      'You have more than 10 steps. Consider setting `hideProgressIndicator` because it is going to look weird.',
    );
  }

  let action = _action;
  if (onFormSubmit && action) {
    console.warn('[ProgressWizard]', 'Both `onFormSubmit` and `action` props were provided. `action` will be ignored.');
    action = undefined;
  }

  /*                           *\
     ✨ Form State Handling ✨
  \*                           */

  const formIdRef = useRef<string>(`progress-wizard-form-${uuidv4()}`);
  const formId = formIdRef.current;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Loading state management, allow overriding of internal loading state when the external prop change
  const [loadingState, setLoadingState] = useState<LoadingState>(extLoadingState ?? 'idle');

  // Skip updating currentStepIndex if navigation is hidden, because that means the consumer is managing it themselves
  const setCurrentStepIndexHandler = useCallback(
    (arg: SetStateAction<number>) => {
      if (!hideNavigation) setCurrentStepIndex(arg);
    },
    [hideNavigation, setCurrentStepIndex],
  );

  // Sync loading state with external prop
  useEffect(() => {
    setLoadingState(extLoadingState ?? 'idle');
  }, [extLoadingState]);

  const formMethods = useForm({
    resolver: zodResolver(z.object({ ...namespacedStepSchemas })),
    defaultValues,
    mode: 'onSubmit',
    shouldUnregister: false, // maintains state on inactive steps
  });

  // Check if all fields in current and previous steps are valid, or current only if specified
  const getIsValid = useCallback(
    async (currentOnly = false) => {
      const relevantSteps = currentOnly ? [steps[currentStepIndex]] : steps.slice(0, currentStepIndex + 1);
      const result = await formMethods.trigger(relevantSteps.map(({ id }) => id));
      return result;
    },
    [steps, currentStepIndex, formMethods],
  );

  // Use custom hook for action handlers
  const { handleContinue, handleBack, handleCancel, handleSubmit } = useHandleActions({
    isFirstStep,
    isLastStep,
    formMethods,
    setLoadingState,
    onContinue,
    onBack,
    onCancel,
    onFormSubmit,
    onError,
    getIsValid,
    setCurrentStepIndexHandler,
    currentStep,
    formId,
  });

  // Use custom hook for browser history management
  useHistoryManagement({
    manageHistory,
    currentStepIndex,
    stepsLength: steps.length,
    setCurrentStepIndex,
  });

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
