import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { type UsePendingValue, type InputValue } from '../types';
import { useProgressWizardFormContext } from './useProgressWizardFormContext';

export const usePendingValue: UsePendingValue = (fieldName) => {
  const formMethods = useFormContext();
  const { setDataToSubmit } = useProgressWizardFormContext();
  const [pendingValue, setPendingValue] = useState<InputValue>();
  const applyPendingValue = () => {
    formMethods.setValue(fieldName, pendingValue);
    if (fieldName === 'countryName' && pendingValue !== 'United States') formMethods.setValue('stateName', '');
    setDataToSubmit((prev) => ({
      ...prev,
      [fieldName]: formMethods.getValues(fieldName),
    }));
    setPendingValue('');
  };
  return { setPendingValue, applyPendingValue, pendingValue };
};
