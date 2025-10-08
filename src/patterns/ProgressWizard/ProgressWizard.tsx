import { forwardRef, useState, useCallback, useEffect, type SetStateAction, PropsWithChildren, Children } from 'react';
import { type ButtonLabels, type CallbackProps, type ProgressWizardBaseProps } from './types';
import InnerProgressWizard from './components/InnerProgressWizard';
import { useHistoryManagement } from './hooks/useHistoryManagement';

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

const ProgressWizard = forwardRef<HTMLDivElement, PropsWithChildren<ProgressWizardProps>>((props, ref) => {
  const {
    loadingState,
    currentStepIndex: extCurrentStepIndex,
    customHeader,
    hideNavigation,
    hideProgressIndicator,

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
    children,
  } = props;

  const childOrChildren = Children.toArray(children);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Skip updating currentStepIndex if navigation is hidden or extCurrentStepIndex is provided, because that means the consumer is managing it themselves
  const setCurrentStepIndexHandler = useCallback(
    (arg: SetStateAction<number>) => {
      if (!hideNavigation && !extCurrentStepIndex && extCurrentStepIndex !== 0) setCurrentStepIndex(arg);
    },
    [hideNavigation, extCurrentStepIndex, setCurrentStepIndex],
  );

  useEffect(() => {
    if (Number.isInteger(extCurrentStepIndex) && extCurrentStepIndex !== currentStepIndex) {
      setCurrentStepIndex(extCurrentStepIndex ?? 0);
    }
  }, [extCurrentStepIndex, currentStepIndex]);

  // Use custom hook for browser history management
  useHistoryManagement({
    manageHistory,
    currentStepIndex,
    stepsLength: childOrChildren.length,
    setCurrentStepIndex,
  });

  return (
    <InnerProgressWizard
      ref={ref}
      currentStepIndex={currentStepIndex}
      setCurrentStepIndex={setCurrentStepIndexHandler}
      customHeader={customHeader}
      hideNavigation={hideNavigation}
      hideProgressIndicator={hideProgressIndicator}
      startLabel={startLabel}
      cancelLabel={cancelLabel}
      backLabel={backLabel}
      continueLabel={continueLabel}
      submitLabel={submitLabel}
      loadingState={loadingState}
      onContinue={onContinue}
      onBack={onBack}
      onFormSubmit={onFormSubmit}
      onCancel={onCancel}
      childOrChildren={childOrChildren}
    />
  );
});

ProgressWizard.displayName = 'ProgressWizard';
export default ProgressWizard;
