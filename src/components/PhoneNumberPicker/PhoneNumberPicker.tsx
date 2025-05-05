import classnames from 'classnames';
import { CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import React, { useCallback, useMemo } from 'react';
import { getCommonProps } from '../../utils';
import { ComboBox } from '../ComboBox';

export interface PhoneNumberPickerProps {
  /**
   * Unique id for the ComboBox.
   */
  id: string;
  /**
   * Optional className for custom styling.
   */
  className?: string;
  /**
   * Label for the ComboBox.
   */
  labelText: string;
  /**
   * Optional placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Input value for the ComboBox.
   */
  inputValue: string;
  /**
   * Passed in function to handle input value changes.
   */
  setInputValue: (value: string) => void;
}

/**
 * ## Overview
 *
 * Overview of PhoneNumberPicker component
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-PhoneNumberPicker--overview)
 */
const PhoneNumberPicker = React.forwardRef<HTMLDivElement, PhoneNumberPickerProps>(
  ({ inputValue, labelText, className, id, setInputValue, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'PhoneNumberPicker');
    const countries = useMemo(() => getCountries(), []);
    const getCountryCode = useCallback((countryCode: CountryCode) => getCountryCallingCode(countryCode), []);

    return (
      <div ref={ref} className={classnames(baseClassName, className)} id={id} {...commonProps}>
        <ComboBox
          className={classnames(baseClassName, className)}
          id={`${id}-combobox`}
          options={countries.map((country) => {
            return {
              label: country,
              value: `+${getCountryCode(country)}`,
            };
          })}
          {...props}
          inputValue={inputValue}
          setInputValue={(value) => {
            setInputValue(value.split(' ').pop() || '');
          }}
          labelText={labelText}
          placeholder={props.placeholder}
        />
      </div>
    );
  },
);

PhoneNumberPicker.displayName = 'PhoneNumberPicker';

export default PhoneNumberPicker;
