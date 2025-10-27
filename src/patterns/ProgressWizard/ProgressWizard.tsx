import {
  forwardRef,
  useState,
  useMemo,
  useCallback,
  Children,
  type SetStateAction,
  type PropsWithChildren,
} from 'react';
import { LoadingState, type CallbackProps, type ProgressWizardBaseProps } from './types';
import { useHistoryManagement } from './hooks/useHistoryManagement';
import { getCommonProps } from '../../utils';
import Footer, { ProgressWizardFooterProps } from './components/ProgressWizardFooter';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { wrapChildren, getLabelsFromChildren, isControlled } from './utils';

/**
 * Props for the main ProgressWizard component.
 *
 * @property isFullHeight - Sets the wizard component to take up all available height of its container. Defaults true.
 * @property hideNavigation - If true, hides the default footer navigation. When hidden you must manage step index changes yourself (e.g. via currentStepIndex prop)
 * @property hideProgressIndicator - If true, hides the progress indicator bar.
 * @property isEnableHistoryManagement - If true step advances push a history state so the browser back/forward buttons navigate between steps.  Default is false and if you want this behavior you should use the useHistoryManagement hook directly in your controlling component.
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
    isFullHeight = true,
    hideNavigation,
    hideProgressIndicator,
    isEnableHistoryManagement = false,
    currentStepIndex: extCurrentStepIndex,
    defaultStepIndex: defaultStepIndex_,
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

  const { className: baseClassName, ...commonProps } = getCommonProps(rest, 'ProgressWizard');

  let defaultStepIndex = defaultStepIndex_;
  if (defaultStepIndex !== undefined && extCurrentStepIndex !== undefined) {
    console.warn(
      'ProgressWizard: Both defaultStepIndex and currentStepIndex props are provided. defaultStepIndex will be ignored.',
    );
    defaultStepIndex = undefined;
  }

  const [internalCurrentStepIndex, setInternalCurrentStepIndex] = useState(defaultStepIndex ?? 0);

  const setInternalCurrentStepIndexHandler = useCallback(
    (stepIndex: SetStateAction<number>) => {
      if (!hideNavigation && !isControlled(extCurrentStepIndex)) setInternalCurrentStepIndex(stepIndex);
    },
    [hideNavigation, extCurrentStepIndex],
  );

  const currentStepIndex = useMemo(
    () => extCurrentStepIndex ?? internalCurrentStepIndex,
    [extCurrentStepIndex, internalCurrentStepIndex],
  );

  if (isEnableHistoryManagement && isControlled(extCurrentStepIndex)) {
    console.warn(
      'ProgressWizard: History management is disabled in controlled mode (currentStepIndex prop). To enable history management, remove the currentStepIndex prop. You may also import and use the useHistoryManagement hook directly in your controlling component.',
    );
  }
  // Children and derived values
  const rawChildren = Children.toArray(children);
  const labels = useMemo(() => getLabelsFromChildren(rawChildren), [rawChildren]);
  const wrappedChildren = useMemo(
    () => wrapChildren(rawChildren, currentStepIndex, baseClassName),
    [rawChildren, currentStepIndex, baseClassName],
  );
  const stepCount = rawChildren.length;
  if (!rawChildren || stepCount === 0) {
    console.warn(
      'ProgressWizard: No children provided. At least one child is required to render steps, two for normal behavior.',
    );
  }

  if (!rawChildren[currentStepIndex]) {
    console.warn(`ProgressWizard: currentStepIndex ${currentStepIndex} is out of bounds (0 to ${stepCount - 1})`);
  }

  useHistoryManagement({
    enabled: !isControlled(extCurrentStepIndex) && isEnableHistoryManagement,
    currentStepIndex,
    stepCount,
    setCurrentStepIndex: setInternalCurrentStepIndexHandler,
  });

  // Navigation helpers
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === stepCount - 1;
  const childContent = wrappedChildren;

  const footerProps: ProgressWizardFooterProps = {
    setCurrentStepIndex: setInternalCurrentStepIndexHandler,
    isFirstStep,
    isLastStep,
    baseClassName,
    shouldAllowContinue,
    isLoading: [LoadingState.Loading, LoadingState.Submitting].includes(loadingState),
    labels: buttonLabels,
    onContinue,
    onBack,
    onCancel,
    onFormSubmit,
  };

  return (
    <section {...commonProps} className={baseClassName} ref={ref} aria-label="Progress Wizard">
      {!hideProgressIndicator ? (
        <ProgressIndicator totalSteps={stepCount} currentStep={currentStepIndex + 1} labels={labels} />
      ) : null}

      <div className={`${baseClassName}__content${isFullHeight ? ` ${baseClassName}__content--full-height` : ''}`}>
        {childContent}
      </div>
      {!hideNavigation ? (
        <div className={`${baseClassName}__footer`}>
          <Footer {...footerProps} />
        </div>
      ) : null}
    </section>
  );
});

ProgressWizard.displayName = 'ProgressWizard';
export default ProgressWizard;
