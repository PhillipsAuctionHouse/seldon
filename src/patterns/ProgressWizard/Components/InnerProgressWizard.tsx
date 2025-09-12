import { cloneElement, forwardRef, useEffect, useMemo } from 'react';
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../../utils';
import classNames from 'classnames';
import Icon from '../../../components/Icon/Icon';
import { useFormContext } from 'react-hook-form';
import { Footer } from './ProgressWizardFooter';

import { type PublicState, type FormStep, type ButtonLabels, type Handlers } from '../types';
import { handleHiddenFields } from '../utils';
import { useProgressWizardForm } from '../hooks/useProgressWizardForm';

type InnerProgressWizardProps = Omit<Required<Handlers>, 'handleError'> & PublicState & {
  steps: FormStep[];
  customHeader?: React.ReactNode;
  buttonLabels: ButtonLabels;
  action?: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  className?: string;
};

const InnerProgressWizard = forwardRef<HTMLDivElement, InnerProgressWizardProps>((props, ref) => {
  const {
    steps,
    currentStepIndex,
    setCurrentStepIndex,
    customHeader,
    buttonLabels,
    loadingState,
    setLoadingState,
    action,
    isFirstStep,
    isLastStep,

    handleContinue,
    handleBack,
    handleSubmit,
    handleCancel,

    className,
    ...rest
  } = props;

  const { className: baseClassName, ...commonProps } = getCommonProps(rest, 'ProgressWizard');
  const currentStep = steps[currentStepIndex];
  const formMethods = useFormContext();

  useEffect(() => {
    if (currentStep && currentStep.hiddenFields) {
      handleHiddenFields(Object.keys(formMethods.getValues()), currentStep.hiddenFields);
    }
  }, [currentStep, formMethods]);

  const { registerProgressWizardInput } = useProgressWizardForm();
  const currentStepComponent = useMemo(
    () =>
      cloneElement(
        currentStep?.componentFactory({
          ...formMethods,
          registerProgressWizardInput,
          currentStepIndex,
          setCurrentStepIndex,
          loadingState,
          setLoadingState,
        }),
        {
          key: currentStep.id,
        },
      ),
    [currentStep, currentStepIndex, formMethods, loadingState, registerProgressWizardInput, setCurrentStepIndex],
  );

  return (
    <section {...commonProps} className={classNames(baseClassName, className)} ref={ref} aria-label="Form Wizard">
      <div className={`${baseClassName}__logo`}>
        <Icon icon="PhillipsLogo" height={32} width={120} />
      </div>
      {customHeader}
      <nav aria-label="Progress">
        <ProgressIndicator
          totalSteps={steps.length}
          currentStep={currentStepIndex + 1}
          labels={steps.map((s) => s.label)}
          progressIndicatorAriaLabel="Wizard Progress"
        />
      </nav>
      <form
        action={action}
        onSubmit={(e) => {
          e.preventDefault();
          !isLastStep ? handleContinue() : handleSubmit();
        }}
      >
        <div className={`${baseClassName}__content`} aria-labelledby={`wizard-step-label-${currentStep.id}`}>
          {currentStepComponent}
        </div>
        <div className={`${baseClassName}__footer`}>
          <Footer
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            baseClassName={baseClassName}
            isCanContinue={true}
            isLoading={loadingState === 'submitting' || loadingState === 'loading'}
            labels={buttonLabels}
            handleContinue={handleContinue}
            handleBack={handleBack}
            handleCancel={handleCancel}
          />
        </div>
      </form>
    </section>
  );
});

InnerProgressWizard.displayName = 'InnerProgressWizard';
export default InnerProgressWizard;
