import { ComponentProps, forwardRef, useState } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';
import Icon from '../../components/Icon/Icon';

export interface ProgressWizardProps extends ComponentProps<'div'> {
  /**
   * An array of step objects, each containing a `label` and an optional `id`.
   * Represents the steps in the wizard.
   */
  steps: Array<{ label: string; id?: string }>;

  /**
   * The content to be rendered inside the wizard. Typically includes the step-specific content.
   */
  children: React.ReactNode;

  /**
   * Optional custom header to render above the wizard steps.
   */
  renderHeader?: React.ReactNode;

  /**
   * Label for the "Start" button. Defaults to a standard label if not provided.
   */
  startLabel?: string;

  /**
   * Label for the "Cancel" button. Defaults to a standard label if not provided.
   */
  cancelLabel?: string;

  /**
   * Label for the "Back" button. Defaults to a standard label if not provided.
   */
  backLabel?: string;

  /**
   * Label for the "Continue" button. Defaults to a standard label if not provided.
   */
  continueLabel?: string;

  /**
   * Label for the "Submit" button. Defaults to a standard label if not provided.
   */
  submitLabel?: string;
  /**
   * Callback function to be called when the wizard is submitted.
   */
  onSubmit?: () => void;
  /**
   * Callback function to be called when the wizard is canceled.
   */
  onCancel?: () => void;
  /**
   * Callback to determine if the current step is valid. Used to enable/disable navigation buttons.
   */
  isStepValid?: (step: number) => boolean;

  /**
   * The index of the current step (0-based). If provided, wizard is controlled.
   */
  currentStep?: number;
  /**
   * Callback when step changes (for controlled mode).
   */
  onStepChange?: (step: number) => void;
  /**
   * Callback to be called when the Back button is pressed.
   * Receives the current step index.
   */
  onStepBack?: (step: number) => void;
  /**
   * Callback to be called when a step is submitted (before advancing).
   * Receives the current step index. Return false to block navigation.
   */
  onStepSubmit?: (step: number) => boolean | void;
}

const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>(
  (
    {
      className,
      steps,
      children,
      renderHeader,
      startLabel = 'Start',
      cancelLabel = 'Cancel',
      backLabel = 'Back',
      continueLabel = 'Continue',
      submitLabel = 'Submit',
      onSubmit,
      onCancel,
      isStepValid,
      currentStep,
      onStepChange,
      onStepSubmit,
      onStepBack,
      ...props
    },
    ref,
  ) => {
    const [internalStep, setInternalStep] = useState(0);
    const step = typeof currentStep === 'number' ? currentStep : internalStep;
    const isFirst = step === 0;
    const isLast = step === steps.length - 1;
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressWizard');

    const goToStep = (next: number) => {
      if (typeof currentStep === 'number' && onStepChange) {
        onStepChange(next);
      } else {
        setInternalStep(next);
      }
    };
    const handleBack = () => {
      if (onStepBack) onStepBack(step);
      if (!isFirst) goToStep(step - 1);
    };
    const handlePrimary = (action: 'next' | 'submit') => {
      // Always treat as submit: call onStepSubmit and onSubmit
      if (onStepSubmit && onStepSubmit(step) === false) return;
      onSubmit?.();
      if (action === 'next' && !isLast) goToStep(step + 1);
      // For 'submit', goToStep is not called, just onSubmit
    };

    return (
      <div
        {...commonProps}
        className={classNames(baseClassName, className)}
        ref={ref}
        role="region"
        aria-label="Form Wizard"
      >
        <div className={`${baseClassName}__logo`}>
          <Icon icon="PhillipsLogo" height={32} width={120} />
        </div>
        {renderHeader}
        <nav aria-label="Progress">
          <ProgressIndicator
            totalSteps={steps.length}
            currentStep={step + 1}
            labels={steps.map((s) => s.label)}
            progressIndicatorAriaLabel="Wizard Progress"
          />
        </nav>
        <div className={`${baseClassName}__content`} role="group" aria-labelledby={`wizard-step-label-${step}`}>
          {Array.isArray(children) ? children[step] : children}
        </div>
        <div className={`${baseClassName}__footer`}>
          {isFirst ? (
            <>
              <Button
                variant={ButtonVariants.secondary}
                type="button"
                className={`${baseClassName}__btn`}
                aria-label="Cancel Wizard"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
              <Button
                variant={ButtonVariants.primary}
                type="submit"
                onClick={() => handlePrimary('next')}
                className={`${baseClassName}__btn`}
                aria-label="Start Wizard"
                isDisabled={isStepValid ? !isStepValid(step) : false}
              >
                {startLabel}
              </Button>
            </>
          ) : isLast ? (
            <>
              <Button
                variant={ButtonVariants.secondary}
                type="submit"
                onClick={handleBack}
                className={`${baseClassName}__btn`}
                aria-label="Back"
              >
                {backLabel}
              </Button>
              <Button
                variant={ButtonVariants.primary}
                type="submit"
                onClick={() => handlePrimary('submit')}
                className={`${baseClassName}__btn`}
                aria-label="Submit Wizard"
                isDisabled={isStepValid ? !isStepValid(step) : false}
              >
                {submitLabel}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={ButtonVariants.secondary}
                type="submit"
                onClick={handleBack}
                className={`${baseClassName}__btn`}
                aria-label="Back"
              >
                {backLabel}
              </Button>
              <Button
                variant={ButtonVariants.primary}
                type="submit"
                onClick={() => handlePrimary('next')}
                className={`${baseClassName}__btn`}
                aria-label="Continue Wizard"
                isDisabled={isStepValid ? !isStepValid(step) : false}
              >
                {continueLabel}
              </Button>
            </>
          )}
        </div>
      </div>
    );
  },
);

ProgressWizard.displayName = 'ProgressWizard';

export default ProgressWizard;
