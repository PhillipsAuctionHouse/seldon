import { cloneElement, ComponentProps, forwardRef, useState } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';
import Icon from '../../components/Icon/Icon';
import { v4 as uuidv4 } from 'uuid';

export type ProgressWizardStepProps = {
  formId: string;
  goToStep: (step: number) => void;
  reportStepValidity: ProgressWizardProps['reportStepValidity'];
};

export interface ProgressWizardProps extends ComponentProps<'div'> {
  /**
   * An array of step objects, each containing a `label` and an optional `id`.
   * Represents the steps in the wizard.
   */
  steps: Array<{ label: string; id: string }>;

  /**
   * The content to be rendered inside the wizard. Typically includes the step-specific content.
   */
  children: React.ReactElement<ProgressWizardStepProps> | React.ReactElement<ProgressWizardStepProps>[];

  /**
   * Optional custom header to render above the wizard steps.
   */
  customHeader?: React.ReactNode;

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
   * Optional callback function to be called when the wizard is submitted, if not supplied the wizard will use the default form submit
   */
  onSubmit?: () => void;
  /**
   * Optional callback function to be called when the wizard is canceled.
   */
  onCancel?: () => void;
  /**
   * Optional function to determine if the current step is valid. Used to enable/disable navigation buttons. If not supplied, continuing is always available.
   */
  isStepValid?: (step?: number) => boolean;
  /**
   * Function to pass to the step components to send up their own validity state
   */
  reportStepValidity: (isValid: boolean) => void;
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
   * Optionally receives the current step index. Can return false to prevent advancing.
   */
  onStepSubmit?: (step?: number) => boolean | void;
}

const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>(
  (
    {
      className,
      steps,
      children,
      customHeader: renderHeader,
      startLabel = 'Start',
      cancelLabel = 'Cancel',
      backLabel = 'Back',
      continueLabel = 'Continue',
      submitLabel = 'Submit',
      onSubmit,
      onCancel,
      isStepValid = () => true,
      reportStepValidity,
      currentStep: externalStep,
      onStepChange,
      onStepSubmit: preSubmitStepAction,
      onStepBack,
      ...props
    },
    ref,
  ) => {
    const [internalStep, setInternalStep] = useState(0);
    const step = externalStep ?? internalStep;
    const isFirst = step === 0;
    const isLast = step === steps.length - 1;
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressWizard');
    const uniqueFormId = uuidv4();

    const goToStep = (targetStep: number) => {
      if (!steps[targetStep]) return;
      if (externalStep) {
        onStepChange?.(targetStep);
      } else {
        setInternalStep(targetStep);
      }
    };
    const handleBack = () => {
      if (onStepBack) onStepBack(step); // 🎺 debatable if we want this function to be called for an invalid back action. I think yes for the case of little warnings or animations or whatever
      if (steps[step - 1]) goToStep(step - 1);
    };

    const submitForm = () => {
      const form = document.getElementById(uniqueFormId);
      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      } else {
        console.error('Form element not found for submission');
      }
    };

    const handlePrimary = (action: 'next' | 'submit') => {
      // Always treat as submit: call onStepSubmit and onSubmit
      const submitAction = onSubmit ? onSubmit : submitForm;
      const preSubmitStepActionResult = preSubmitStepAction?.(step) ?? true;
      // If pre-submit action returns false, we have failed external validation
      if (!preSubmitStepActionResult) return;
      submitAction();
      if (action === 'next') goToStep(step + 1);
    };

    // we only need one child at a time, and that child needs the unique form ID. and `goToStep` if that child needs to hop around
    const stepContent = cloneElement(Array.isArray(children) ? children[step] : children, {
      formId: uniqueFormId,
      goToStep,
      reportStepValidity,
    });

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
          {stepContent}
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
                isDisabled={!isStepValid(step)}
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
                isDisabled={!isStepValid(step)}
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
                isDisabled={!isStepValid(step)}
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
