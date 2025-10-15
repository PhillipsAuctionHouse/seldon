import { type FC } from 'react';
import Button from '../../../components/Button/Button';
import { ButtonVariants } from '../../../components/Button/types';
import Loader from '../../../components/Loader/Loader';
import type { SetCurrentStepIndex } from '../types';
import { type CallbackProps, type OnClick, type ButtonLabels, DefaultButtonLabels } from '../types';

/**
 * Props for the ProgressWizard Footer component. Controls navigation and button states.
 * @property setCurrentStepIndex - Setter used for relative step moves
 * @property isFirstStep - True if this is the first step (renders Cancel instead of Back)
 * @property toFirstStep - Jump helper to go directly to the first step
 * @property isLastStep - True if this is the last step (renders Submit instead of Continue)
 * @property toLastStep - Jump helper to go directly to the last step
 * @property baseClassName - Base class for styling overrides
 * @property labels - Button labels for navigation (see ButtonLabels)
 * @property shouldAllowContinue - Whether the primary button should be enabled (e.g. validation passed)
 * @property isLoading - Whether a loading/submitting state should be shown (disables buttons and shows loader on primary)
 * Inherits navigation callbacks from CallbackProps (onCancel, onBack, onContinue, onFormSubmit)
 */

export interface ProgressWizardFooterProps extends CallbackProps {
  setCurrentStepIndex: SetCurrentStepIndex;
  isFirstStep: boolean;
  toFirstStep: () => void;
  isLastStep: boolean;
  toLastStep: () => void;
  baseClassName?: string;
  labels?: ButtonLabels;
  shouldAllowContinue: boolean;
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
  setCurrentStepIndex,
  isFirstStep,
  toFirstStep,
  isLastStep,
  toLastStep,
  baseClassName = 'progress-wizard-footer',
  labels: customLabels,
  shouldAllowContinue,
  isLoading,
  onBack,
  onCancel,
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

  const labels: ButtonLabels = {
    ...Object.fromEntries(Object.entries(DefaultButtonLabels).map(([k, v]) => [k.toLowerCase(), v])),
    ...customLabels,
  };
  const secondaryLabel = isFirstStep ? labels.cancel : labels.back;
  const secondaryOnClick = isFirstStep
    ? onClickStepNavigationAction({ fn: onCancel, distance: 0, skipTo: 'first' })
    : onClickStepNavigationAction({ fn: onBack, distance: -1 });

  const primaryLabel = isLastStep ? labels.submit : !isFirstStep ? labels.continue : labels.start;
  const primaryOnClick = isLastStep
    ? onClickStepNavigationAction({ fn: onFormSubmit })
    : onClickStepNavigationAction({ fn: onContinue, distance: 1 });

  return (
    <>
      <Button
        variant={ButtonVariants.secondary}
        type="button"
        className={`${baseClassName}__btn`}
        aria-label={`Progress Wizard: ${secondaryLabel}`}
        onClick={async (e) => await secondaryOnClick(e)}
      >
        {secondaryLabel}
      </Button>
      <Button
        variant={ButtonVariants.primary}
        type={isLastStep ? 'submit' : 'button'}
        className={`${baseClassName}__btn`}
        aria-label={`Progress Wizard: ${primaryLabel}`}
        onClick={async (e) => await primaryOnClick(e)}
        isDisabled={!shouldAllowContinue || isLoading}
      >
        {!isLoading ? primaryLabel : <Loader />}
      </Button>
    </>
  );
};

export default Footer;
