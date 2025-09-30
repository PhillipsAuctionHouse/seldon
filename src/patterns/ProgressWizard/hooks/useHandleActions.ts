import { useCallback } from 'react';
import type { LoadingState, CallbackProps, FormStep } from '../types';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

export const useHandleActions = ({
  isFirstStep,
  isLastStep,
  formMethods,
  setLoadingState,
  onContinue,
  onBack,
  onCancel,
  onFormSubmit,
  onError,
  getIsValid,
  setCurrentStepIndexHandler,
  currentStep,
  formId,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  formMethods: UseFormReturn<FieldValues>;
  setLoadingState: (state: LoadingState) => void;
  onContinue?: CallbackProps['onContinue'];
  onBack?: CallbackProps['onBack'];
  onCancel?: CallbackProps['onCancel'];
  onFormSubmit?: CallbackProps['onFormSubmit'];
  onError?: CallbackProps['onError'];
  getIsValid: (currentOnly?: boolean) => Promise<boolean>;
  setCurrentStepIndexHandler: (arg: import('react').SetStateAction<number>) => void;
  currentStep: FormStep;
  formId: string;
}) => {
  const handleContinue = useCallback(async () => {
    if (isLastStep) {
      console.error('[ProgressWizard]', 'Cannot continue from last step, use submit instead');
      return;
    }
    formMethods.clearErrors();
    setLoadingState('submitting');
    const values = formMethods.getValues();
    if (onContinue && onContinue(values) === false) {
      setLoadingState('idle');
      return;
    }
    const valid = await getIsValid();
    if (valid) {
      setCurrentStepIndexHandler((idx: number) => idx + 1);
    }
    setLoadingState('idle');
  }, [isLastStep, formMethods, setLoadingState, onContinue, getIsValid, setCurrentStepIndexHandler]);

  const handleBack = useCallback(() => {
    if (onBack && onBack(formMethods.getValues()) === false) return;
    if (!isFirstStep) setCurrentStepIndexHandler((idx: number) => idx - 1);
    else console.error('[ProgressWizard]', 'Cannot go back from first step');
  }, [onBack, formMethods, isFirstStep, setCurrentStepIndexHandler]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel(formMethods.getValues());
    } else if (window && window.history && typeof window.history.back === 'function') {
      window.history.back();
    }
  }, [onCancel, formMethods]);

  const handleSubmit = useCallback(async () => {
    if (currentStep.schema) formMethods.clearErrors();
    try {
      setLoadingState('submitting');
      if (onFormSubmit) {
        onFormSubmit(formMethods.getValues(), getIsValid);
        return;
      } else {
        const valid = await getIsValid();
        if (valid) {
          const form = document.getElementById(formId);
          if (form && form instanceof HTMLFormElement) {
            form.submit();
          }
        }
      }
    } catch (error) {
      let errorType = 'unknown';
      let errorForHandler = error;
      let logMsg = 'Form error ';
      if (typeof error === 'string') {
        errorType = 'string';
        logMsg = `(string): ${error}`;
      } else if (error instanceof Error) {
        errorType = 'Error';
        logMsg += `(Error): ${error.message}\nStack: ${error.stack}`;
        errorForHandler = { message: error.message, stack: error.stack };
      } else if (error && typeof error === 'object') {
        if ('message' in error && typeof error.message === 'string') {
          errorType = 'FieldErrors';
          logMsg += `(FieldErrors): ${error.message}`;
        } else {
          errorType = `object:${Object.keys(error).join(',')}`;
          logMsg += `(object): ${JSON.stringify(error)}`;
        }
      } else {
        errorType = `unknown:${typeof error}`;
        logMsg += `(unknown type): ${String(error)}`;
      }
      if (onError) {
        onError(errorForHandler, errorType, logMsg);
      }
      console.error('[ProgressWizard]', logMsg);
    } finally {
      setLoadingState('idle');
    }
  }, [currentStep, formMethods, setLoadingState, onFormSubmit, getIsValid, formId, onError]);

  return { handleContinue, handleBack, handleCancel, handleSubmit };
};
