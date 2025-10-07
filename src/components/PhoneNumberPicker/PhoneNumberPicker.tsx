import classnames from 'classnames';
import { CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import React, { useEffect, useMemo, useRef } from 'react';
import { getCommonProps } from '../../utils';
import ComboBox, { ComboBoxProps } from '../ComboBox/ComboBox';
import { ComboBoxOption } from '../ComboBox/types';

/**
 * PhoneNumberPickerProps extends ComboBoxProps, allowing for all ComboBox options
 * while adding any phone-specific props
 */
export type PhoneNumberPickerProps = Omit<ComboBoxProps, 'options'>;

/**
 * ## Overview
 *
 * A component for entering and selecting phone number country codes
 *
 * [Figma Link](https://www.figma.com/design/rIefa3bRPyZbZmtyV9PSQv/My-Account?node-id=1-3&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-PhoneNumberPicker--overview)
 */
const PhoneNumberPicker = React.forwardRef<HTMLDivElement, PhoneNumberPickerProps>((props, ref) => {
  const { className, id, value, onChange, ...restProps } = props;
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'PhoneNumberPicker');

  // Track the last explicitly selected country
  // We need to do this because some countries have the same display value
  // TODO: can we replace this with usePrevious hook
  const lastSelectedCountry = useRef(value);

  useEffect(() => {
    if (value) {
      lastSelectedCountry.current = value;
    }
  }, [value]);

  const countryOptions: ComboBoxOption[] = useMemo(() => {
    const countries = getCountries();
    const getCountryCode = (countryCode: CountryCode) => getCountryCallingCode(countryCode);
    return countries.map((country) => {
      return {
        label: `(${country}) +${getCountryCode(country)}`,
        value: country,
        displayValue: `+${getCountryCode(country)}`,
      };
    });
  }, []);

  // Update the handleChange function:
  const handleChange = (newValue: string, option: ComboBoxOption | null) => {
    // If the value is being cleared (empty string or null)
    if (!newValue) {
      // Clear the last selected country reference
      lastSelectedCountry.current = '';
    }
    // Otherwise, store the explicitly selected country
    else if (option) {
      lastSelectedCountry.current = newValue;
    }

    if (onChange) {
      onChange(newValue, option);
    }
  };

  return (
    <div className={classnames(baseClassName, className)} id={id} {...commonProps}>
      <ComboBox
        ref={ref}
        className={`${baseClassName}__combobox`}
        id={`${id}-combobox`}
        options={countryOptions}
        value={value}
        onChange={handleChange}
        {...restProps}
      />
    </div>
  );
});

PhoneNumberPicker.displayName = 'PhoneNumberPicker';

export default PhoneNumberPicker;
