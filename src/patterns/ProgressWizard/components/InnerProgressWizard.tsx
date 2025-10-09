import { type Children, type ReactNode, forwardRef } from 'react';
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../../utils';
import Icon from '../../../components/Icon/Icon';
import { Footer } from './ProgressWizardFooter';

import type { SetCurrentStepIndex } from '../types';
import { LoadingState, type ButtonLabels, type CallbackProps } from '../types';

/**
 * Props for the internal ProgressWizard layout component. Used to render the wizard UI and handle navigation.
 * @property currentStepIndex - Index of the active step (0-based)
 * @property setCurrentStepIndex - Setter for updating the current step index
 * @property customHeader - Optional header rendered above the progress indicator
 * @property hideNavigation - When true the default footer buttons are not rendered
 * @property hideProgressIndicator - When true the progress indicator bar is not rendered
 * @property loadingState - Current loading state (see LoadingState)
 * @property childOrChildren - Flattened array of step ReactNodes; each element represents a step
 * @property startLabel / cancelLabel / backLabel / continueLabel / submitLabel - Button labels (from ButtonLabels)
 * Inherits handler props from CallbackProps (onContinue, onBack, onCancel, onFormSubmit)
 */

export interface InnerProgressWizardProps extends CallbackProps, ButtonLabels {
  currentStepIndex: number;
  setCurrentStepIndex: SetCurrentStepIndex;
  customHeader?: ReactNode;
  hideNavigation?: boolean;
  hideProgressIndicator?: boolean;
  loadingState: LoadingState;
  childOrChildren: ReturnType<typeof Children.toArray>;
}

/**
 * Internal layout component for ProgressWizard. Renders the wizard UI, progress indicator, step content, and footer.
 *
 * This component is used internally by ProgressWizard and should not be used directly by consumers.
 *
 * @param props - InnerProgressWizardProps
 * @returns ReactElement with wizard layout
 */
const InnerProgressWizard = forwardRef<HTMLDivElement, InnerProgressWizardProps>((props, ref) => {
  const {
    currentStepIndex,
    setCurrentStepIndex,
    customHeader,
    hideNavigation,
    hideProgressIndicator,
    loadingState,
    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',
    onBack,
    onCancel,
    onContinue,
    onFormSubmit,
    childOrChildren,
    ...rest
  } = props;

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
            setCurrentStepIndex={setCurrentStepIndex}
            isFirstStep={isFirstStep}
            toFirstStep={toFirstStep}
            isLastStep={isLastStep}
            toLastStep={toLastStep}
            baseClassName={baseClassName}
            isCanContinue={true}
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

InnerProgressWizard.displayName = 'InnerProgressWizard';
export default InnerProgressWizard;
