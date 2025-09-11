import { useFormContext } from 'react-hook-form';
import { type UseWizardForm, type OnInputTrigger } from '../types';
import { useProgressWizardFormContext } from './useProgressWizardFormContext';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const useWizardForm: UseWizardForm = () => {
  const formMethods = useFormContext();
  const {
    handlers: { updateDataToSubmit },
  } = useProgressWizardFormContext();

  return {
    registerProgressWizardInput: (fieldName, { isRequired, trigger, overrides, translationFunction } = {}) => {
      const req = isRequired ?? true;
      const tr = trigger ?? 'onBlur';
      const o = overrides ?? {};
      const tF = translationFunction;
      type OnValueUpdate = OnInputTrigger<typeof tr>;
      const onValueUpdate: OnValueUpdate = (e: Parameters<OnValueUpdate>[0]) => {
        updateDataToSubmit(e);
        formMethods.setValue(e.target.name, e.target.value);
        const fieldName = e.target.name;
        formMethods.clearErrors(fieldName);
      };

      return {
        ...formMethods.register(fieldName),
        id: fieldName,
        labelText: `${tF?.(fieldName) ?? capitalize(fieldName)}${isRequired ? '*' : ''}`,
        onBlur: tr === 'onBlur' ? onValueUpdate : undefined,
        onChange: tr === 'onChange' ? onValueUpdate : undefined,
        ...(req
          ? {
              invalid: !!formMethods.formState.errors?.[fieldName],
              invalidText: tF
                ? tF(`${fieldName}Required`)
                : (String(formMethods.formState.errors?.[fieldName]?.message) ??
                  capitalize(fieldName).replace('Required', ' required')),
            }
          : {}),
        ...o,
      };
    },
  };
};

export default useWizardForm;
