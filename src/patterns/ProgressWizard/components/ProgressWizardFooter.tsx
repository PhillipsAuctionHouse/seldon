import { type FC } from 'react';
import Button from '../../../components/Button/Button';
import { ButtonVariants } from '../../../components/Button/types';
import Loader from '../../../components/Loader/Loader';
import { type ButtonLabels, type Handlers } from '../types';

/**
 * Props for the ProgressWizard Footer component. Controls navigation and button states.
 * @property isFirstStep - True if this is the first step (shows Cancel instead of Back)
 * @property isLastStep - True if this is the last step (shows Submit instead of Continue)
 * @property className - Optional base class for styling
 * @property labels - Button labels for navigation (see ButtonLabels)
 * @property isCanContinue - Whether the primary button is enabled (e.g., validation passed)
 * @property isLoading - Whether the wizard is currently loading or submitting
 *
 * Inherits all navigation handler props from Handlers.
 */
export type ProgressWizardFooterProps = Handlers & {
  isFirstStep: boolean;
  isLastStep: boolean;
  baseClassName?: string;
  labels: ButtonLabels;
  isCanContinue: boolean;
  isLoading: boolean;
};

/**
 * Footer component for ProgressWizard. Renders navigation buttons (Back/Cancel, Continue/Submit) and handles their states.
 *
 * This is the default navigation footer for the ProgressWizard. It will call the appropriate handler props when buttons are clicked.
 * It can be disabled by passing `hideNavigation` to the main ProgressWizard component, in case you'd like to use a custom nav solution.
 *
 * @param props - ProgressWizardFooterProps
 * @returns ReactElement with navigation buttons
 */
export const Footer: FC<ProgressWizardFooterProps> = ({
  isFirstStep,
  isLastStep,
  baseClassName = 'progress-wizard-footer',
  labels,
  isCanContinue,
  isLoading,
  handleBack = () => {
    console.warn('No handleBack provided');
  },
  handleCancel = () => {
    console.warn('No handleCancel provided');
  },
}) => {
  const secondaryLabel = isFirstStep ? labels.cancelLabel : labels.backLabel;
  const secondaryAria = secondaryLabel ?? 'Go Back';
  const secondaryOnClick = isFirstStep ? handleCancel : handleBack;

  const primaryLabel = isLastStep ? labels.submitLabel : !isFirstStep ? labels.continueLabel : labels.startLabel;
  const primaryAria = primaryLabel ?? (isLastStep ? 'Submit' : !isFirstStep ? 'Continue' : 'Start');

  return (
    <>
      <Button
        variant={ButtonVariants.secondary}
        type="button"
        className={`${baseClassName}__btn`}
        aria-label={`Wizard: ${secondaryAria}`}
        onClick={secondaryOnClick}
      >
        {secondaryLabel}
      </Button>
      <Button
        variant={ButtonVariants.primary}
        type="submit"
        className={`${baseClassName}__btn`}
        aria-label={`Wizard: ${primaryAria}`}
        isDisabled={!isCanContinue || isLoading}
      >
        {!isLoading ? primaryLabel : <Loader />}
      </Button>
    </>
  );
};

export default Footer;
