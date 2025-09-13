import { type FieldError, useFormContext } from 'react-hook-form';
import { type UseProgressWizardForm } from '../types';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * React hook for ProgressWizard form logic. Provides helpers for registering fields in wizard steps.
 *
 * This hook abstracts away react-hook-form details and provides a single function, registerProgressWizardInput,
 * which is used to register input fields in each step's componentFactory.
 *
 * @todo this is a dinosaur and should probably just be reduced to the one function it still provides
 * @returns {Object} - An object with the registerProgressWizardInput function.
 *
 * @example
 * const { registerProgressWizardInput } = useProgressWizardForm();
 * <Input {...registerProgressWizardInput('email', { isRequired: true })} />
 */
export const useProgressWizardForm: UseProgressWizardForm = () => {
  const formMethods = useFormContext();

  return {
    /**
     * Registers a field for use in the ProgressWizard. Returns all props and handlers needed for your input component.
     *
     * @param fieldName - The name of the field to register
     * @param options - Optional configuration (required, overrides, translation, registerOptions, [displayName])
     * @private stepId - Step ID to namespace the field (defaults to '0' if not provided)
     * @returns Props and handlers for your input (id, labelText, invalid, invalidText, ref, etc.)
     *
     * @example
     * <Input {...registerProgressWizardInput('email', { isRequired: true })} />
     *
     * @remarks
     * For translation keys, this function assumes the basic label key is {fieldName} and the required error key is {fieldName}Required.
     * This can be overriden by providing a displayName string in options and handling the translating on your side.
     *
     * The precendence for the label is: displayName (if provided) > translationFunction(fieldName) > capitalize(fieldName).
     * The precedence for the invalidText is: error message from RHF/Zod > translationFunction(fieldName + 'Required') > `{capitalizedFieldname} Required`.
     * Note that Zod error messaging is very useful here, you should default to that and treat these fallbacks as fallbacks.
     *
     */
    registerProgressWizardInput: (fieldName, options, stepId = '0') => {
      const {
        isRequired = true,
        overrides = {},
        translationFunction,
        registerOptions = {},
        displayName,
      } = options || {};

      const namespacedFieldName = stepId ? `${stepId}.${fieldName}` : fieldName;
      const stepErrors = formMethods.formState?.errors?.[stepId];
      const error =
        stepErrors && fieldName in stepErrors ? stepErrors[fieldName as keyof typeof stepErrors] : undefined;
      const label = displayName ?? translationFunction?.(fieldName) ?? capitalize(fieldName);
      const invalidText =
        (typeof error === 'string' ? error : (error as FieldError)?.message) ??
        translationFunction?.(`${fieldName}Required`) ??
        `${capitalize(fieldName)} required`;

      return {
        ...formMethods.register(namespacedFieldName, registerOptions),
        id: namespacedFieldName,
        labelText: `${label}${isRequired ? '*' : ''}`,
        invalid: !!error,
        invalidText,
        ...overrides,
      };
    },
  };
};

export default useProgressWizardForm;
