import Icon from '../../components/Icon/Icon';
import { TextVariants } from '../../components/Text';
import Text from '../../components/Text/Text';
import classNames from 'classnames';
import { countries } from './constants';
import { Country, ModalBaseProps } from './types';
import React, { forwardRef } from 'react';
import { px, useNormalizedInputProps } from '../../utils';

// Props specific to the trigger, also used by the parent modal
export type CountryPickerTriggerProps = {
  /**
   * The label text displayed above the button.
   */
  labelText: string;

  /**
   * The aria-label attribute for the button, defaults to labelText if not provided.
   */
  ariaLabel?: string;

  /**
   * The value displayed inside the button (e.g., selected country name or phone code).
   */
  displayValue: string;

  /**
   * Optional flag to indicate if there is an error.
   */
  hasError?: boolean;

  /**
   * Optional error message to display when there is an error.
   */
  errorMsg?: string;
};

// Add in button props
type InternalTriggerProps = CountryPickerTriggerProps &
  Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'id' | 'className'>;

const CountryPickerTrigger = forwardRef<HTMLButtonElement, ModalBaseProps & InternalTriggerProps>(
  (
    {
      labelText,
      ariaLabel = labelText,
      displayValue,
      onClick,
      hasError = false,
      errorMsg,
      id,
      className,
      baseClassName,
      variantConfig,
    },
    ref,
  ) => {
    // Destructure discriminated union for type-safe access
    const { isPhone, value } = variantConfig;

    const inputProps = useNormalizedInputProps({
      id: 'country-picker-trigger-input',
      invalid: hasError,
      invalidText: errorMsg,
      type: 'text',
    });

    const errorId = inputProps.invalidId;

    // Determine the ISO country code for the flag
    // If isPhone, value is a country code; otherwise, look up code by name
    const flagCode: Country['code'] | undefined = isPhone
      ? value
      : countries.filter((country) => country.name === value)?.[0]?.code;

    const handleValidation = () => {
      return inputProps.validation ? inputProps.validation : <p className={`${px}-input__validation`}>&nbsp;</p>;
    };

    return (
      <div className={classNames(`${baseClassName}__trigger`, className)}>
        <Text
          variant={TextVariants.string2}
          className={classNames(`${baseClassName}__trigger-label`, {
            [`${baseClassName}__trigger-label--error`]: hasError,
          })}
          id={id ? `${id}-label` : undefined}
        >
          {labelText}
        </Text>
        <button
          ref={ref}
          type="button"
          aria-label={ariaLabel}
          aria-invalid={inputProps.invalid}
          aria-describedby={errorId}
          className={classNames(`${baseClassName}__trigger-btn`, {
            [`${baseClassName}__trigger-btn--error`]: hasError,
            [`${baseClassName}__trigger-btn--is-phone`]: isPhone,
          })}
          onClick={onClick}
          data-testid="country-picker-trigger"
          id={id}
        >
          {flagCode && (
            <img
              src={`https://flagcdn.com/24x18/${flagCode.toLowerCase()}.png`}
              alt={`${value} flag`}
              className={`${baseClassName}__trigger-flag`}
            />
          )}
          <span className={classNames(`${baseClassName}__trigger-text`)}>{displayValue}</span>
          <span className={classNames(`${baseClassName}__trigger-icon`)}>
            <Icon icon="ChevronDown" color="black-100" width={16} height={16} />
          </span>
        </button>

        {!isPhone && handleValidation()}
      </div>
    );
  },
);

CountryPickerTrigger.displayName = 'CountryPickerTrigger';

export default CountryPickerTrigger;
