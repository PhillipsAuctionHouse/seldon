import { px } from '../..';

// 🤖 Utility function to get class names for Input component parts,
// 🤖 created for input-like components to reuse consistent class names.
export const getInputClassNames = () =>
  ({
    label: `${px}-input__label`,
    labelHidden: `${px}-input__label--hidden`,
    adornment: `${px}-input__wrapper__adornment`,
    skeleton: `${px}-skeleton`,
    wrapper: `${px}-input__wrapper`,
    input: `${px}-input__input`,
    wrapperInput: `${px}-input__wrapper__input`,
    emptyValidation: `${px}-input__empty-validation`,
    validation: `${px}-input__validation`,
  }) as const;
