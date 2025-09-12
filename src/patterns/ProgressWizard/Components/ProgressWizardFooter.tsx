import { type FC } from 'react';
import Button from '../../../components/Button/Button';
import { ButtonVariants } from '../../../components/Button/types';
import { type ButtonLabels, type Handlers } from '../types';

export type ProgressWizardFooterProps = Handlers & {
  isFirstStep: boolean;
  isLastStep: boolean;
  baseClassName?: string;
  labels: ButtonLabels;
  isCanContinue: boolean;
  isLoading: boolean;
};

export const Footer: FC<ProgressWizardFooterProps> = ({
  isFirstStep,
  isLastStep,
  baseClassName,
  labels,
  isCanContinue,
  isLoading,
  handleBack,
  handleCancel,
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
        {primaryLabel}
      </Button>
    </>
  );
};

export default Footer;
