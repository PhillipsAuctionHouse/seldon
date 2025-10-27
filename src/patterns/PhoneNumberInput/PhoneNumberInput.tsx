import React, { ComponentProps, forwardRef } from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import CountryPicker from '../CountryPicker/CountryPicker';
import Input from '../../components/Input/Input';
import { getSafeCountryCallingCode } from '../CountryPicker/utils';
import { countries } from '../CountryPicker/constants';
import { CountryCode } from './types';
import { useNormalizedInputProps } from '../../utils';

export interface PhoneNumberInputProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  /**
   * The current phone number value.
   * This represents the phone number entered by the user without country code.
   */
  value?: string;

  /**
   * The country code associated with the phone number.
   */
  countryCode?: CountryCode;

  /**
   * Callback function triggered when the phone number or country code changes.
   * @param value - The updated phone number value.
   * @param countryCode - The updated country code.
   */
  handleValueChange?: (rawValue: string, countryCode: CountryCode) => void;

  /**
   * The label for the combined fields.
   */
  label?: string;

  /**
   * Indicates whether the input field is required.
   * If true, the field will be marked as required.
   */
  required?: boolean;

  /**
   * Indicates whether there is an error in the input field.
   */
  error?: boolean;

  /**
   * The error message to display when there is an error.
   */
  errorText?: string;

  /**
   * Indicates whether the input field is disabled.
   */
  disabled?: boolean;
}

/**
 * ## Overview
 *
 * A component for entering phone numbers with country code selection.
 *
 * [Figma Link](https://www.figma.com/design/kSxOhnqIhilZ9hIJd3bPgP/RW-Registration?node-id=6101-43645&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-PhoneNumberInput--overview)
 */
const PhoneNumberInput = forwardRef<HTMLDivElement, PhoneNumberInputProps>(
  (
    {
      className,
      value = '',
      countryCode = '',
      handleValueChange,
      label = 'Phone',
      required = false,
      error,
      errorText,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'PhoneNumberInput');
    const [selected, setSelected] = React.useState(countryCode || undefined);

    // Find the country object by code for display
    const selectedCountry = countries.find((c) => c.code === selected);

    // Handle phone number input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleValueChange?.(e.target.value, (selected as CountryCode) || '');
    };

    const inputProps = useNormalizedInputProps({
      id: 'phone-input',
      invalid: error,
      invalidText: errorText,
      type: 'text',
    });

    return (
      <div ref={ref} className={classnames(`${baseClassName}`, className)} {...commonProps}>
        <div className={`${baseClassName}__wrapper`}>
          <div className={`${baseClassName}__country-picker`}>
            <input type="hidden" name="phoneNumber" value={value} data-testid="phone-number-hidden-input" />
            <input
              type="hidden"
              name="phoneCountryCode"
              value={selected || ''}
              data-testid="phone-country-code-hidden-input"
            />
            <CountryPicker
              triggerLabelText={label}
              triggerDisplayValue={selectedCountry ? `+${getSafeCountryCallingCode(selectedCountry.code)}` : ''}
              hasTriggerError={!!error}
              modalTitle="Country code"
              searchInputLabel="Search country"
              searchInputPlaceholder="Search country"
              selectButtonLabel="Select"
              isPhone={true}
              value={selectedCountry?.code}
              onChange={setSelected}
            />
          </div>
          <div className={`${baseClassName}__input`}>
            <Input
              id="phone-input"
              type="tel"
              labelText={label}
              hideLabel
              value={value}
              onChange={handleInputChange}
              required={required}
              invalid={!!error}
              disabled={disabled}
              // We don't want to use the input default text, and the error text will be shown under the country picker
              invalidText=""
              aria-describedby={inputProps.invalidId}
            />
          </div>
        </div>
        {/* Invalid message */}
        {inputProps.validation ? inputProps.validation : <p className={`${px}-input__validation`}>&nbsp;</p>}
      </div>
    );
  },
);

PhoneNumberInput.displayName = 'PhoneNumberInput';

export default PhoneNumberInput;
