import { forwardRef, useState, useEffect } from 'react';
import { useForm, FormProvider, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoadingState, type ButtonLabels, type CallbackProps, type ProgressWizardBaseProps } from './types';
import InnerProgressWizard from './components/InnerProgressWizard';
import { z } from 'zod';

type ProgressWizardProps = ProgressWizardBaseProps & ButtonLabels & CallbackProps;

const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>((props, ref) => {
  const {
    defaultValues,
    steps: propSteps,
    customHeader,
    loadingState: extLoadingState,
    action,

    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',

    onContinue,
    onBack,
    onCancel,
    onSubmit,
    onError,
  } = props;

  const steps = propSteps.map((step) => ({ ...step, schema: step.schema ?? z.object({}) }));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const [loadingState, setLoadingState] = useState<LoadingState>(extLoadingState);

  useEffect(() => {
    setLoadingState(extLoadingState);
  }, [extLoadingState]);

  const combinedSchema = steps.reduce((acc, step) => acc.merge(step.schema.strip()), z.object({}));

  const formMethods = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues,
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  const handleContinue = async () => {
    formMethods.clearErrors();
    setLoadingState('submitting');
    const valid = await formMethods.trigger(Object.keys(currentStep.schema.shape));
    if (onContinue && onContinue(formMethods.getValues()) === false) {
      setLoadingState('idle');
      return;
    }
    if (valid && !isLastStep) setCurrentStepIndex((idx) => idx + 1);
    setLoadingState('idle');
  };

  const handleBack = () => {
    if (onBack && onBack(formMethods.getValues()) === false) return;
    if (!isFirstStep) setCurrentStepIndex((idx) => idx - 1);
    else console.error('Cannot go back from first step');
  };

  const handleCancel = () => {
    if (onCancel) onCancel(formMethods.getValues());
  };

  const handleSubmit = onSubmit
    ? formMethods.handleSubmit(
        (data) => {
          onSubmit(data);
        },
        (errors) => {
          if (onError) onError(errors);
        },
      )
    : async () => {
        formMethods.clearErrors();
        setLoadingState('submitting');
        try {
          const valid = await formMethods.trigger(Object.keys(currentStep.schema.shape));
          if (valid) {
            const form = document.querySelector('form[action]');
            if (form && form instanceof HTMLFormElement) {
              form.submit();
            }
          } else {
            const errors = formMethods.formState.errors;
            Object.entries(errors).forEach(([field, error]) => {
              console.error(`Field "${field}" failed validation:`, error?.message);
            });
          }
        } catch (error) {
          if (onError) onError(error as FieldErrors);
          console.error('Error submitting form:', error);
        } finally {
          setLoadingState('idle');
        }
      };

  return (
    <FormProvider {...formMethods}>
      <InnerProgressWizard
        ref={ref}
        steps={steps}
        currentStepIndex={currentStepIndex}
        setCurrentStepIndex={setCurrentStepIndex}
        customHeader={customHeader}
        buttonLabels={{ startLabel, cancelLabel, backLabel, continueLabel, submitLabel }}
        loadingState={loadingState}
        setLoadingState={setLoadingState}
        action={action}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        handleContinue={handleContinue}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </FormProvider>
  );
});

ProgressWizard.displayName = 'ProgressWizard';
export default ProgressWizard;
