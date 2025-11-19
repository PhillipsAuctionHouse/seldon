import { px } from '../..';

// Utility function to get class names for Input component parts,
// created for input-like components to reuse consistent class names.
export const getInputClassNames = (baseClass?: string) =>
  ({
    label: `${baseClass || px}-input__label`,
    labelHidden: `${baseClass || px}-input__label--hidden`,
    adornment: `${baseClass || px}-input__wrapper__adornment`,
    skeleton: `${baseClass || px}-skeleton`,
    wrapper: `${baseClass || px}-input__wrapper`,
    input: `${baseClass || px}-input__input`,
    wrapperInput: `${baseClass || px}-input__wrapper__input`,
    emptyValidation: `${baseClass || px}-input__empty-validation`,
    validation: `${baseClass || px}-input__validation`,
  }) as const;
