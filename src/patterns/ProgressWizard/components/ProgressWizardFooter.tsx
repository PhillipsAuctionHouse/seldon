import { type Dispatch, type SetStateAction, type FC } from 'react';
import Button from '../../../components/Button/Button';
import { ButtonVariants } from '../../../components/Button/types';
import Loader from '../../../components/Loader/Loader';
import { type CallbackProps, type OnClick, type ButtonLabels } from '../types';

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

export interface ProgressWizardFooterProps extends CallbackProps {
  setCurrentStepIndex: Dispatch<SetStateAction<number>>; // 🎺TODO make this a type
  isFirstStep: boolean;
  toFirstStep: () => void;
  isLastStep: boolean;
  toLastStep: () => void;
  baseClassName?: string;
  labels: ButtonLabels;
  isCanContinue: boolean;
  isLoading: boolean;
}

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
  toFirstStep,
  isLastStep,
  toLastStep,
  baseClassName = 'progress-wizard-footer',
  setCurrentStepIndex,
  labels,
  isCanContinue,
  isLoading,
  onCancel,
  onBack,
  onContinue,
  onFormSubmit,
}) => {
  const onClickStepNavigationAction =
    ({ fn, distance = 0, skipTo }: { fn?: OnClick; distance?: number; skipTo?: 'first' | 'last' | number }): OnClick =>
    async (e) => {
      const res = await Promise.resolve(fn?.(e));
      if (res !== false) {
        if (typeof skipTo === 'number') {
          setCurrentStepIndex(skipTo);
        } else if (skipTo === 'first') {
          toFirstStep();
        } else if (skipTo === 'last') {
          toLastStep();
        } else {
          setCurrentStepIndex((prev) => prev + distance);
        }
      }
    };
  const secondaryLabel = isFirstStep ? labels.cancelLabel : labels.backLabel;
  const secondaryAria = secondaryLabel ?? 'Go Back';
  const secondaryOnClick = isFirstStep
    ? onClickStepNavigationAction({ fn: onCancel, distance: 0, skipTo: 'first' })
    : onClickStepNavigationAction({ fn: onBack, distance: -1 });

  const primaryLabel = isLastStep ? labels.submitLabel : !isFirstStep ? labels.continueLabel : labels.startLabel;
  const primaryAria = primaryLabel ?? (isLastStep ? 'Submit' : !isFirstStep ? 'Continue' : 'Start');
  const primaryOnClick = isLastStep
    ? onClickStepNavigationAction({ fn: onFormSubmit })
    : onClickStepNavigationAction({ fn: onContinue, distance: 1 });

  return (
    <>
      <Button
        variant={ButtonVariants.secondary}
        type="button"
        className={`${baseClassName}__btn`}
        aria-label={`Wizard: ${secondaryAria}`}
        onClick={async (e) => await secondaryOnClick(e)}
      >
        {secondaryLabel}
      </Button>
      <Button
        variant={ButtonVariants.primary}
        type="submit"
        className={`${baseClassName}__btn`}
        aria-label={`Wizard: ${primaryAria}`}
        onClick={async (e) => await primaryOnClick(e)}
        isDisabled={!isCanContinue || isLoading}
      >
        {!isLoading ? primaryLabel : <Loader />}
      </Button>
    </>
  );
};

export default Footer;
