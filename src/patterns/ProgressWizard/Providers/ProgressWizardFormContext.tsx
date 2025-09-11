import { useState, useEffect, useCallback, type FC, type ReactNode } from 'react';
import {
  type GenericFormState,
  type StepId,
  type FormStateManagement,
  type FormStep,
  type IncomingHandlers,
} from '../types';
import { configureHandlersForVariant } from '../utils';
import { WizardFormContext } from '../Hooks/useProgressWizardFormContext';
import { useFormContext } from 'react-hook-form';

type ProgressWizardFormProviderProps = {
  defaultState?: GenericFormState;
  isControlled: boolean;
  steps?: FormStep[];
  children: ReactNode;
  handlers: IncomingHandlers;
  isCanContinue?: boolean;
  isLoading?: boolean;
  extStepId?: StepId;
};

export const ProgressWizardContextProvider: FC<ProgressWizardFormProviderProps> = ({
  defaultState,
  isControlled,
  steps: wizardSteps,
  children,
  handlers,
  isCanContinue: extCanContinue,
  isLoading: extIsLoading,
  extStepId = '0'
}) => {
  const [steps, setSteps] = useState<FormStep[]>(wizardSteps ?? []);
  
  useEffect(() => {
    if (wizardSteps) setSteps(wizardSteps);
  }, [wizardSteps]);


  const formMethods = useFormContext();
  const [uncontrolledDataToSubmit, setUncontrolledDataToSubmit] = useState<GenericFormState>(defaultState || {});
  const [uncontrolledStepId, setUncontrolledStepId] = useState<StepId>(steps[0]?.id);
  const [uncontrolledCanContinue, setUncontrolledCanContinue] = useState<boolean>(true);
  const [uncontrolledIsLoading, setUncontrolledIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('uncontrolledDataToSubmit changed:', uncontrolledDataToSubmit);
}, [uncontrolledDataToSubmit]);


  const stepForward = useCallback(() => {
    const currentIndex = steps.findIndex((step) => step.id === uncontrolledStepId);
    if (currentIndex < steps.length - 1) {
      setUncontrolledStepId(steps[currentIndex + 1].id);
    }
  }, [steps, uncontrolledStepId]);

  const stepBackward = useCallback(() => {
    const currentIndex = steps.findIndex((step) => step.id === uncontrolledStepId);
    if (currentIndex > 0) {
      setUncontrolledStepId(steps[currentIndex - 1].id);
    }
  }, [steps, uncontrolledStepId]);

  const jumpToStep = useCallback(
    (stepId: StepId) => {
      if (!steps.find((step) => step.id === stepId)) {
        console.error(`[WizardFormContext] Step with id ${stepId} not found`);
        return;
      }
      setUncontrolledStepId(stepId);
    },
    [steps],
  );

  const commonValue = {
    stepForward,
    stepBackward,
    jumpToStep,
    dataToSubmit: uncontrolledDataToSubmit,
    setDataToSubmit: setUncontrolledDataToSubmit,
    handlers: configureHandlersForVariant({
      incomingHandlers: handlers,
      formMethods,
      isControlled,
      setDataToSubmit: setUncontrolledDataToSubmit,
      stepForward,
      stepBackward,
      steps,
      stepId: (isControlled ? extStepId : uncontrolledStepId )?? '0', // 🎺TODO this is messy
    }),
  };

  const value: FormStateManagement = isControlled
    ? {
        ...commonValue,
        isControlled: true,
        
        isCanContinue: extCanContinue ?? true,
        setIsCanContinue: undefined,
        isLoading: extIsLoading ?? false,
        setIsLoading: undefined,
        stepId: extStepId,
        setStepId: undefined,
      }
    : {
        ...commonValue,
        isControlled: false,

        isCanContinue: uncontrolledCanContinue,
        setIsCanContinue: setUncontrolledCanContinue,
        isLoading: uncontrolledIsLoading,
        setIsLoading: setUncontrolledIsLoading,
        stepId: uncontrolledStepId,
        setStepId: setUncontrolledStepId,
      };

  return <WizardFormContext.Provider value={value}>{children}</WizardFormContext.Provider>;
};
