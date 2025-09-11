import { type FC } from 'react';
import Button from '../../../components/Button/Button';
import { ButtonVariants } from '../../../components/Button/types';
import type { FooterProps } from '../types';
import { useProgressWizardFormContext } from '../Hooks/useProgressWizardFormContext';

export const Footer: FC<FooterProps> = ({
  isFirstStep,
  isLastStep,
  baseClassName,
  labels,
  isCanContinue,
  formId,
  fetcher,
  isLoading,
}) => {
  const {
    handlers: { handleContinue, handleSubmit, handleBack, handleCancel },
  } = useProgressWizardFormContext();

  const isSubmitting = fetcher?.state === 'submitting' || isLoading;
  if (isFirstStep)
    return (
      <>
        <Button
          variant={ButtonVariants.secondary}
          type="button"
          className={`${baseClassName}__btn`}
          aria-label="Cancel Wizard"
          onClick={handleCancel}
        >
          {labels.cancel}
        </Button>
        <Button
          variant={ButtonVariants.primary}
          onClick={() => {
            handleContinue();
          }}
          className={`${baseClassName}__btn`}
          aria-label="Start Wizard"
          isDisabled={!isCanContinue}
        >
          {labels.start}
        </Button>
      </>
    );
  else if (isLastStep)
    return (
      <>
        <Button
          variant={ButtonVariants.secondary}
          onClick={handleBack}
          className={`${baseClassName}__btn`}
          aria-label="Back"
        >
          {labels.back}
        </Button>
        <Button
          variant={ButtonVariants.primary}
          type="submit"
          onClick={() => handleSubmit(formId)}
          className={`${baseClassName}__btn`}
          aria-label="Submit Wizard"
          isDisabled={!isCanContinue}
        >
          {labels.submit}
        </Button>
      </>
    );
  else
    return (
      <>
        <Button
          variant={ButtonVariants.secondary}
          onClick={() => {
            handleBack();
          }}
          className={`${baseClassName}__btn`}
          aria-label="Back"
        >
          {labels.back}
        </Button>
        <Button
          variant={ButtonVariants.primary}
          onClick={() => handleContinue()}
          className={`${baseClassName}__btn`}
          aria-label="Continue Wizard"
          isDisabled={!isCanContinue || isSubmitting}
        >
          {labels.continue}
        </Button>
      </>
    );
};

export default Footer;
