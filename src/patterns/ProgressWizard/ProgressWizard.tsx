import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  Children,
  type SetStateAction,
  type PropsWithChildren,
} from 'react';
import { LoadingState, type ButtonLabels, type CallbackProps, type ProgressWizardBaseProps } from './types';
import InnerProgressWizard from './components/InnerProgressWizard';
import { useHistoryManagement } from './hooks/useHistoryManagement';

/**
 * Props for the main ProgressWizard component.
 *
 * @property customHeader - Optional custom header ReactNode displayed above the progress indicator (e.g. brand logo or contextual banner).
 * @property hideNavigation - If true, hides the default footer navigation. When hidden you must manage step index changes yourself (e.g. via currentStepIndex prop)
 * @property hideProgressIndicator - If true, hides the progress indicator bar.
 * @property manageHistory - If true (default), step advances push a history state so the browser back/forward buttons navigate between steps.
 * @property currentStepIndex - Controlled current step index (0‑based). When provided the component becomes controlled and internal navigation state will not auto‑advance.
 * @property loadingState - Current loading state (aligns with remix fetchers, see type LoadingState).
 * @property startLabel - Label for the first step primary button.
 * @property cancelLabel - Label for the first step secondary button.
 * @property backLabel - Label for the secondary button on middle steps.
 * @property continueLabel - Label for the primary button on middle steps.
 * @property submitLabel - Label for the primary button on the last step.
 * @property onBack - Called before navigating to the previous step. Return false to block navigation.
 * @property onCancel - Called when the user cancels from the first step.
 * @property onContinue - Called before advancing to next step (including first -> second). Return false to block navigation.
 * @property onFormSubmit - Called on final submit click. Return false to block submission (async supported).
 * @property children - The step content. Each direct child is treated as a step; its aria-label (if present) is used as the progress indicator label.
 */
export interface ProgressWizardProps extends ProgressWizardBaseProps, ButtonLabels, CallbackProps {}

const ProgressWizard = forwardRef<HTMLDivElement, PropsWithChildren<ProgressWizardProps>>((props, ref) => {
  const {
    customHeader,
    hideNavigation,
    hideProgressIndicator,
    manageHistory = true,
    currentStepIndex: extCurrentStepIndex,
    loadingState = LoadingState.Idle,
    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',
    onBack,
    onCancel,
    onContinue,
    onFormSubmit,
    children,
  } = props;

  const childOrChildren = Children.toArray(children);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const setCurrentStepIndexHandler = useCallback(
    (stepIndex: SetStateAction<number>) => {
      if (!hideNavigation && !extCurrentStepIndex && extCurrentStepIndex !== 0) setCurrentStepIndex(stepIndex);
    },
    [hideNavigation, extCurrentStepIndex, setCurrentStepIndex],
  );

  useEffect(() => {
    if (Number.isInteger(extCurrentStepIndex) && extCurrentStepIndex !== currentStepIndex) {
      setCurrentStepIndex(extCurrentStepIndex ?? 0);
    }
  }, [extCurrentStepIndex, currentStepIndex]);

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
      loadingState={loadingState}
      startLabel={startLabel}
      cancelLabel={cancelLabel}
      backLabel={backLabel}
      continueLabel={continueLabel}
      submitLabel={submitLabel}
      onBack={onBack}
      onCancel={onCancel}
      onContinue={onContinue}
      onFormSubmit={onFormSubmit}
      childOrChildren={childOrChildren}
    />
  );
});

ProgressWizard.displayName = 'ProgressWizard';
export default ProgressWizard;
