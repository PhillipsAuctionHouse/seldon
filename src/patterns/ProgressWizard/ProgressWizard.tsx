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
import { useHistoryManagement } from './hooks/useHistoryManagement';
import { getCommonProps } from '../../utils';
import Footer from './components/ProgressWizardFooter';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { Icon } from '../../components/Icon';

/**
 * Props for the main ProgressWizard component.
 *
 * @property customHeader - Optional custom header ReactNode displayed above the progress indicator (e.g. brand logo or contextual banner).
 * @property hideNavigation - If true, hides the default footer navigation. When hidden you must manage step index changes yourself (e.g. via currentStepIndex prop)
 * @property hideProgressIndicator - If true, hides the progress indicator bar.
 * @property manageHistory - If true (default), step advances push a history state so the browser back/forward buttons navigate between steps.
 * @property currentStepIndex - Controlled current step index (0‑based). When provided the component becomes controlled and internal navigation state will not respond to the built-in buttons.
 * @property isCanContinue - set false to disable continue/submit buttons
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
 *
 * @private __forceInternalStepNavigation - Forces internal step state management even when currentStepIndex is provided.
 */
export interface ProgressWizardProps extends ProgressWizardBaseProps, ButtonLabels, CallbackProps {}

const ProgressWizard = forwardRef<HTMLDivElement, PropsWithChildren<ProgressWizardProps>>((props, ref) => {
  const {
    customHeader,
    hideNavigation,
    hideProgressIndicator,
    manageHistory = true,
    currentStepIndex: extCurrentStepIndex,
    isCanContinue = true,
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

    __forceInternalStepNavigation = false,

    ...rest
  } = props;

  const childOrChildren = Children.toArray(children);
  const [currentStepIndex, setCurrentStepIndex] = useState(extCurrentStepIndex ?? 0);

  const setCurrentStepIndexHandler = useCallback(
    (stepIndex: SetStateAction<number>) => {
      if (__forceInternalStepNavigation || (!hideNavigation && !extCurrentStepIndex && extCurrentStepIndex !== 0))
        setCurrentStepIndex(stepIndex);
    },
    [__forceInternalStepNavigation, hideNavigation, extCurrentStepIndex],
  );

  useEffect(() => {
    if (__forceInternalStepNavigation) return;
    if (Number.isInteger(extCurrentStepIndex) && extCurrentStepIndex !== currentStepIndex) {
      setCurrentStepIndex(extCurrentStepIndex ?? 0);
    }
  }, [extCurrentStepIndex, currentStepIndex, __forceInternalStepNavigation]);

  useHistoryManagement({
    manageHistory,
    currentStepIndex,
    stepsLength: childOrChildren.length,
    setCurrentStepIndex,
  });

  const { className: baseClassName, ...commonProps } = getCommonProps(rest, 'ProgressWizard');

  const isFirstStep = currentStepIndex === 0;
  const toFirstStep = () => setCurrentStepIndex(0);
  const isLastStep = currentStepIndex === childOrChildren.length - 1;
  const toLastStep = () => setCurrentStepIndex(childOrChildren.length - 1);

  return (
    <section {...commonProps} className={baseClassName} ref={ref} aria-label="Form Wizard">
      <div className={`${baseClassName}__logo`}>
        <Icon icon="PhillipsLogo" height={32} width={120} />
      </div>
      {customHeader}
      {!hideProgressIndicator ? (
        <nav aria-label="Progress">
          <ProgressIndicator
            totalSteps={childOrChildren.length}
            currentStep={currentStepIndex + 1}
            labels={childOrChildren.map(
              (child, i) =>
                (typeof child === 'object' && 'props' in child && child.props['aria-label']) || `Step ${i + 1}`,
            )}
            progressIndicatorAriaLabel="Wizard Progress"
          />
        </nav>
      ) : null}

      <div className={`${baseClassName}__content`} aria-labelledby={`wizard-step-label-${currentStepIndex}`}>
        {childOrChildren[currentStepIndex] ?? <p>No content found for step {currentStepIndex + 1}</p>}
      </div>
      {!hideNavigation ? (
        <div className={`${baseClassName}__footer`}>
          <Footer
            setCurrentStepIndex={setCurrentStepIndexHandler}
            isFirstStep={isFirstStep}
            toFirstStep={toFirstStep}
            isLastStep={isLastStep}
            toLastStep={toLastStep}
            baseClassName={baseClassName}
            isCanContinue={isCanContinue}
            isLoading={[LoadingState.Loading, LoadingState.Submitting].includes(loadingState)}
            labels={{
              startLabel,
              cancelLabel,
              backLabel,
              continueLabel,
              submitLabel,
            }}
            onContinue={onContinue}
            onBack={onBack}
            onCancel={onCancel}
            onFormSubmit={onFormSubmit}
          />
        </div>
      ) : null}
    </section>
  );
});

ProgressWizard.displayName = 'ProgressWizard';
export default ProgressWizard;
