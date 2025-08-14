import Icon from '../Icon/Icon';
import { TextVariants } from '../Text';
import Text from '../Text/Text';
import classNames from 'classnames';
import { countries } from './constants';
import { Country, ModalBaseProps } from './types';
import React from 'react';

export type CountryPickerTriggerProps = {
  /**
   * The label text displayed above the button.
   */
  labelText: string;

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

type InternalTriggerProps = CountryPickerTriggerProps &
  Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'id' | 'className'>;

const CountryPickerTrigger = ({
  labelText,
  displayValue,
  onClick,
  hasError = false,
  errorMsg,
  id,
  className,
  baseClassName,
  variantConfig,
}: ModalBaseProps<InternalTriggerProps>) => {
  const { isPhone, countryValue } = variantConfig;
  console.log('variant config', variantConfig);
  const errorId = errorMsg ? `${baseClassName}__trigger-error-msg` : undefined;

  // Determine the ISO country code for the flag
  const flagCode: Country['code'] | undefined = isPhone
    ? countryValue
    : countries.filter((country) => country.name === countryValue)?.[0]?.code;

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
        type="button"
        aria-label={labelText}
        aria-invalid={hasError}
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
            alt={`${countryValue} flag`}
            className={`${baseClassName}__trigger-flag`}
          />
        )}
        <span className={classNames(`${baseClassName}__trigger-text`)}>{displayValue}</span>
        <span className={classNames(`${baseClassName}__trigger-icon`)}>
          <Icon icon="ChevronDown" color="$pure-black" width={16} height={16} />
        </span>
      </button>
      {hasError && errorMsg && (
        <Text variant={TextVariants.string2} className={classNames(`${baseClassName}__trigger-error-msg`)} id={errorId}>
          {errorMsg}
        </Text>
      )}
    </div>
  );
};

export default CountryPickerTrigger;
