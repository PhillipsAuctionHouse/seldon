import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  Children,
  type SetStateAction,
  type PropsWithChildren,
} from 'react';
import { LoadingState, type CallbackProps, type ProgressWizardBaseProps } from './types';
import { useHistoryManagement } from './hooks/useHistoryManagement';
import { getCommonProps } from '../../utils';
import Footer from './components/ProgressWizardFooter';
import { ProgressIndicator } from '../../components/ProgressIndicator';

/**
 * Props for the main ProgressWizard component.
 *
 * @property customHeader - Optional custom header ReactNode displayed above the progress indicator. This can be used to add a logo or other branding element to the top of the wizard. If not provided, no header will be shown. For Phillips, it should probably be `          <Icon icon="PhillipsLogo" height={32} width={120} aria-label="Phillips Logo" />
 * @property hideNavigation - If true, hides the default footer navigation. When hidden you must manage step index changes yourself (e.g. via currentStepIndex prop)
 * @property hideProgressIndicator - If true, hides the progress indicator bar.
 * @property isEnableHistoryManagement - If true (default), step advances push a history state so the browser back/forward buttons navigate between steps.
 * @property currentStepIndex - Controlled current step index (0‑based). When provided the component becomes controlled and internal navigation state will not respond to the built-in buttons.
 * @property defaultStepIndex - Default step index (0‑based). Used to initialize the internal step state.
 * @property shouldAllowContinue - set false to disable continue/submit buttons
 * @property loadingState - Current loading state (aligns with remix fetchers, see type LoadingState).
 * @property buttonLabels - Button labels for the footer navigation buttons (start/cancel/back/continue/submit).
 * @property onBack - Called before navigating to the previous step. Return false to block navigation.
 * @property onCancel - Called when the user cancels from the first step.
 * @property onContinue - Called before advancing to next step (including first -> second). Return false to block navigation.
 * @property onFormSubmit - Called on final submit click. Return false to block submission (async supported).
 * @property children - The step content. Each direct child is treated as a step; its aria-label (if present) is used as the progress indicator label.
 */
export interface ProgressWizardProps extends ProgressWizardBaseProps, CallbackProps {}

const ProgressWizard = forwardRef<HTMLDivElement, PropsWithChildren<ProgressWizardProps>>((props, ref) => {
  const {
    customHeader,
    hideNavigation,
    hideProgressIndicator,
    isEnableHistoryManagement = true,
    currentStepIndex: extCurrentStepIndex,
    defaultStepIndex = 0,

    shouldAllowContinue = true,
    loadingState = LoadingState.Idle,
    buttonLabels,
    onBack,
    onCancel,
    onContinue,
    onFormSubmit,
    children,

    ...rest
  } = props;

  if (defaultStepIndex && extCurrentStepIndex) {
    console.warn(
      'ProgressWizard: Both defaultStepIndex and currentStepIndex props are provided. defaultStepIndex will be ignored in controlled mode.',
    );
  }
  const childOrChildren = Children.toArray(children);
  const [currentStepIndex, setCurrentStepIndex] = useState(defaultStepIndex);

  const setCurrentStepIndexHandler = useCallback(
    (stepIndex: SetStateAction<number>) => {
      if (!hideNavigation && !extCurrentStepIndex && extCurrentStepIndex !== 0) setCurrentStepIndex(stepIndex);
    },
    [hideNavigation, extCurrentStepIndex],
  );

  useEffect(() => {
    if (Number.isInteger(extCurrentStepIndex) && extCurrentStepIndex !== currentStepIndex) {
      setCurrentStepIndex(extCurrentStepIndex ?? 0);
    }
  }, [extCurrentStepIndex, currentStepIndex]);

  useHistoryManagement({
    enabled: isEnableHistoryManagement,
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
            shouldAllowContinue={shouldAllowContinue}
            isLoading={[LoadingState.Loading, LoadingState.Submitting].includes(loadingState)}
            labels={buttonLabels}
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
