import { ComponentProps, forwardRef, useState } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';

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
      ...props
    },
    ref,
  ) => {
    const [step, setStep] = useState(0);
    const isFirst = step === 0;
    const isLast = step === steps.length - 1;
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressWizard');

    const goToStep = (next: number) => {
      setStep(next);
    };
    const handleBack = () => {
      if (!isFirst) goToStep(step - 1);
    };
    const handleNext = () => {
      if (!isLast) goToStep(step + 1);
    };

    const handleSubmit = () => {
      onSubmit?.();
    };

    return (
      <div
        {...commonProps}
        className={classNames(baseClassName, className)}
        ref={ref}
        role="region"
        aria-label="Form Wizard"
      >
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
                type="button"
                onClick={handleNext}
                className={`${baseClassName}__btn`}
                aria-label="Start Wizard"
              >
                {startLabel}
              </Button>
            </>
          ) : isLast ? (
            <>
              <Button
                variant={ButtonVariants.secondary}
                type="button"
                onClick={handleBack}
                className={`${baseClassName}__btn`}
                aria-label="Back"
              >
                {backLabel}
              </Button>
              <Button
                variant={ButtonVariants.primary}
                type="button"
                onClick={handleSubmit}
                className={`${baseClassName}__btn`}
                aria-label="Submit Wizard"
              >
                {submitLabel}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={ButtonVariants.secondary}
                type="button"
                onClick={handleBack}
                className={`${baseClassName}__btn`}
                aria-label="Back"
              >
                {backLabel}
              </Button>
              <Button
                variant={ButtonVariants.primary}
                type="button"
                onClick={handleNext}
                className={`${baseClassName}__btn`}
                aria-label="Continue Wizard"
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
