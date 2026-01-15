import { px } from '../..';

export const getInputClassNames = () =>
  ({
    adornment: `${px}-input__wrapper__adornment`,
    emptyValidation: `${px}-input__empty-validation`,
    input: `${px}-input__input`,
    label: `${px}-input__label`,
    labelHidden: `${px}-input__label--hidden`,
    skeleton: `${px}-skeleton`,
    validation: `${px}-input__validation`,
    wrapper: `${px}-input__wrapper`,
    wrapperInput: `${px}-input__wrapper__input`,
  }) as const;
