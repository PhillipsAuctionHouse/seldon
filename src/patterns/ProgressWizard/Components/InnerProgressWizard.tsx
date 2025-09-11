import { forwardRef, useEffect, useMemo } from 'react';

import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../../utils';
import classNames from 'classnames';
import Icon from '../../../components/Icon/Icon';

import { Form, useFormContext } from 'react-hook-form';
import { Footer } from './ProgressWizardFooter';
import { type InnerProgressWizardProps } from '../types';
import { useProgressWizardFormContext } from '../Hooks/useProgressWizardFormContext';
import { handleHiddenFields } from '../utils';

const InnerProgressWizard = forwardRef<HTMLDivElement, InnerProgressWizardProps>((props, ref) => {
  const {
    isControlled,
    // defined by parent
    formId,

    // controlled
    activeStepId: extStepId,

    // static data
    steps,
    customHeader,

    // footer stuff
    startLabel,
    cancelLabel,
    backLabel,
    continueLabel,
    submitLabel,

    // network-related
    fetcher,
    action,

    // normal component stuff
    className,

    // rest
    ...rest
  } = props;

  const { className: baseClassName, ...commonProps } = getCommonProps(rest, 'ProgressWizard');
  const { isLoading, isCanContinue, stepId } = useProgressWizardFormContext();

  // Step info
  const isFirstStep = useMemo(() => stepId === steps[0].id, [stepId, steps]);
  const currentStep = useMemo(() => steps.find((s) => s.id === stepId) ?? steps[0], [stepId, steps]);
  const isLastStep = useMemo(() => stepId === steps[steps.length - 1].id, [stepId, steps]);

  const currentStepComponent = useMemo(
    () => (currentStep?.component ? <currentStep.component /> : null),
    [currentStep],
  );

  const formMethods = useFormContext();

  useEffect(() => {
    handleHiddenFields(Object.keys(formMethods.getValues()), currentStep.hiddenFields);
  }, [currentStep.hiddenFields, formMethods]);

  return (
    <section {...commonProps} className={classNames(baseClassName, className)} ref={ref} aria-label="Form Wizard">
      <div className={`${baseClassName}__logo`}>
        <Icon icon="PhillipsLogo" height={32} width={120} />
      </div>
      {customHeader}
      <nav aria-label="Progress">
        <ProgressIndicator
          totalSteps={steps.length}
          currentStep={currentStep ? steps.indexOf(currentStep) + 1 : 0}
          labels={steps.map((s) => s.label)}
          progressIndicatorAriaLabel="Wizard Progress"
        />
      </nav>
      <div className={`${baseClassName}__content`} aria-labelledby={`wizard-step-label-${stepId}`}>
        <Form id={formId} action={action}>
          {currentStepComponent}
        </Form>
      </div>
      <div className={`${baseClassName}__footer`}>
        <Footer
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          baseClassName={baseClassName}
          formId={formId}
          isCanContinue={isCanContinue}
          isLoading={isLoading}
          fetcher={fetcher}
          labels={{
            start: startLabel,
            cancel: cancelLabel,
            back: backLabel,
            submit: submitLabel,
            continue: continueLabel,
          }}
        />
      </div>
    </section>
  );
});

InnerProgressWizard.displayName = 'InnerProgressWizard';

export default InnerProgressWizard;
