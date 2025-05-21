import classnames from 'classnames';
import { CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import React, { useMemo, useState } from 'react';
import { getCommonProps } from '../../utils';
import ComboBox, { ComboBoxOption, ComboBoxProps } from '../ComboBox/ComboBox';

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
const PhoneNumberPicker = React.forwardRef<HTMLDivElement, PhoneNumberPickerProps>(
  ({ className, id, inputValue, setInputValue, onChange, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'PhoneNumberPicker');

    const [selectedCode, setSelectedCode] = useState('');

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

    return (
      <div ref={ref} className={classnames(baseClassName, className)} id={id} {...commonProps}>
        <ComboBox
          className={`${baseClassName}__combobox`}
          id={`${id}-combobox`}
          options={countryOptions}
          value={selectedCode}
          onChange={(newValue) => setSelectedCode(newValue)}
          inputValue={inputValue}
          setInputValue={setInputValue}
          {...props}
        />
      </div>
    );
  },
);

PhoneNumberPicker.displayName = 'PhoneNumberPicker';

export default PhoneNumberPicker;
