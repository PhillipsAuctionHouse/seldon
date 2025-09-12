import { useFormContext } from 'react-hook-form';
import { type UseProgressWizardForm } from '../types';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const useProgressWizardForm: UseProgressWizardForm = () => {
  const formMethods = useFormContext();

  return {
    registerProgressWizardInput: (fieldName, options) => {
      const { isRequired = true, overrides = {}, translationFunction } = options || {};

      const error = formMethods.formState.errors?.[fieldName];
      const label = translationFunction?.(fieldName) ?? capitalize(fieldName);
      const invalidText =
        translationFunction?.(`${fieldName}Required`) ??
        String(error?.message) ??
        capitalize(fieldName).replace('Required', ' required');

      return {
        ...formMethods.register(fieldName),
        id: fieldName,
        labelText: `${label}${isRequired ? '*' : ''}`,
        invalid: !!error,
        invalidText,
        ...overrides,
      };
    },
  };
};

export default useProgressWizardForm;
