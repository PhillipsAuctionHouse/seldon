import React, { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import CountryPicker from '../CountryPicker/CountryPicker';
import Input from '../../components/Input/Input';
import { getSafeCountryCallingCode } from '../CountryPicker/utils';
import { countries } from '../CountryPicker/constants';

export interface PhoneNumberInputProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value?: string;
  countryCode?: string;
  onChange?: (value: string, countryCode: string) => void;
  label?: string;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
}

/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](Point back to yourself here)
 */
const PhoneNumberInput = forwardRef<HTMLDivElement, PhoneNumberInputProps>(
  (
    {
      className,
      value = '',
      countryCode = '',
      onChange,
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
      onChange?.(e.target.value, selected || '');
    };

    return (
      <div ref={ref} className={classnames(`${baseClassName}`, className)} {...commonProps}>
        <div className={`${baseClassName}__wrapper`}>
          <div className={`${baseClassName}__country-picker`}>
            <input type="hidden" name="phoneNumber" value={value} />
            <input type="hidden" name="phoneCountryCode" value={selected || ''} />
            <CountryPicker
              triggerLabelText="Phone Number"
              triggerDisplayValue={selectedCountry ? `+${getSafeCountryCallingCode(selectedCountry.code)}` : ''}
              hasTriggerError={!!error}
              modalTitle="Country code"
              searchInputLabel=""
              searchInputPlaceholder="Search country"
              selectButtonLabel="Select"
              isPhone={true}
              value={selectedCountry?.code}
              onChange={setSelected}
              triggerErrorMsg={errorText}
            />
          </div>
          <div className={`${baseClassName}__input`} style={{ flex: '1 1 75%' }}>
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
              invalidText=""
            />
          </div>
        </div>
      </div>
    );
  },
);

PhoneNumberInput.displayName = 'PhoneNumberInput';

export default PhoneNumberInput;
