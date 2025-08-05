import Text from '../Text/Text';
import { TextVariants } from '../Text';
import classnames from 'classnames';
import { getSafeCountryCallingCode } from './utils';
import { CountryCode } from 'libphonenumber-js';

interface CountryPickerOptionProps {
  /**
   * The country code associated with the option.
   */
  code: CountryCode;

  /**
   * The display name of the country.
   */
  name: string;

  /**
   * Indicates whether the option is currently selected.
   */
  isChecked: boolean;

  /**
   * Indicates whether the option is related to a phone number.
   */
  isPhone: boolean;

  /**
   * The name attribute for the input element.
   */
  inputName: string;

  /**
   * Callback function triggered when the option's value changes.
   * @param value - The new value of the option.
   */
  onChange: (value: string) => void;

  /**
   * The base class name for styling the component.
   */
  baseClassName: string;
}

export const CountryPickerOption = ({
  code,
  name,
  isChecked,
  isPhone,
  inputName,
  onChange,
  baseClassName,
}: CountryPickerOptionProps) => {
  const countryId = `${baseClassName}__radio-${code}`;
  return (
    <label
      htmlFor={countryId}
      className={classnames(`${baseClassName}__option`, {
        [`${baseClassName}__option--selected`]: isChecked,
        [`${baseClassName}__option--is-phone`]: isPhone,
      })}
      tabIndex={-1}
    >
      <input
        type="radio"
        id={countryId}
        name={inputName}
        checked={isChecked}
        className={classnames(`${baseClassName}__radio`, {
          [`${baseClassName}__radio--selected`]: isChecked,
          [`${baseClassName}__radio--hidden`]: isPhone,
        })}
        onChange={() => {
          onChange(isPhone ? code : name);
        }}
        tabIndex={isChecked ? 0 : -1}
      />
      <span className={`${baseClassName}__option-content`}>
        <Text variant={TextVariants.string2} className={`${baseClassName}__option-name`}>
          {name}
        </Text>
        {isPhone && (
          <Text variant={TextVariants.string2} className={`${baseClassName}__option-code`}>
            +{getSafeCountryCallingCode(code)}
          </Text>
        )}
      </span>
      <img
        src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
        alt={`${name} flag`}
        className={`${baseClassName}__option-flag`}
      />
    </label>
  );
};
