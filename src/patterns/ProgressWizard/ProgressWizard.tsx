import { forwardRef, useEffect } from 'react';
import { type ProgressWizardProps } from './types';
import { type UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import InnerProgressWizard from './Components/InnerProgressWizard';
import { useFormContext } from 'react-hook-form';
import { ProgressWizardContextProvider } from './Providers/ProgressWizardFormContext';

const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>((props, ref) => {
  const {
    isControlled,
    defaultValues,
    activeStepId,

    // static data
    steps,
    customHeader,

    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',

    // network-related
    fetcher,
    action,

    // functions that are called alongside normal behavior
    onContinue,
    onCancel,
    onSubmit,
    onError,

    // Handlers, controlled only:
    handleStepPrev,
    handleStepNext,
    handleSubmit,

    // Controlled mode:
    isLoading: extIsLoading,
    isCanContinue: extCanContinue,
  } = props;

  const formId = uuidv4() as UUID;
  const formMethods = useFormContext();

  
  if (!formMethods || !formMethods.register) {
    throw new Error('ProgressWizard must be used within a ProgressWizardFormProvider.');
  }

  useEffect(() => {
    if (defaultValues)
      Object.entries(defaultValues).forEach(([k, v]) => {
        formMethods.setValue(k, v);
      });
  }, [defaultValues, formMethods]);

  const handlers = {
    onContinue,
    onCancel,
    onSubmit,
    onError,

    handleStepPrev,
    handleStepNext,
    handleSubmit,

    isLoading: extIsLoading,
    isCanContinue: extCanContinue,
  } as const;

  const sharedProps = {
    isControlled: false,
    formId,
    activeStepId,
    steps,
    customHeader,
    startLabel,
    cancelLabel,
    backLabel,
    continueLabel,
    submitLabel,
    fetcher,
    action,
  } as const;

  const controlledProps = {
    ...sharedProps,
    isControlled: true,
    isLoading: extIsLoading,
    isCanContinue: extCanContinue,
  } as const;

  return (
    <ProgressWizardContextProvider
      defaultState={defaultValues}
      isControlled={isControlled}
      steps={steps}
      handlers={handlers}
      extStepId={activeStepId}
    >
      <InnerProgressWizard {...(isControlled ? controlledProps : sharedProps)} ref={ref} />
    </ProgressWizardContextProvider>
  );
});

ProgressWizard.displayName = 'ProgressWizard';
export default ProgressWizard;
