import Text from '../../components/Text/Text';
import { TextVariants } from '../../components/Text';
import classnames from 'classnames';
import { getSafeCountryCallingCode } from './utils';
import { Country, ModalBaseProps } from './types';

/**
 * Props for a single country option in the picker.
 * Extends Country and adds selection state and input name.
 */
export type CountryPickerOptionProps = Country & {
  /**
   * Indicates whether the option is currently selected.
   */
  isChecked: boolean;

  /**
   * The name attribute for the input element.
   */
  inputName: string;
};

/**
 * Renders a single country option for selection.
 * Handles both country and phone picker modes via discriminated union.
 */
export const CountryPickerOption = ({
  code,
  name,
  isChecked,
  inputName,
  baseClassName,
  variantConfig,
}: ModalBaseProps & CountryPickerOptionProps) => {
  const countryId = `${baseClassName}__radio-${code}`;
  // Destructure discriminated union for type-safe access
  const { isPhone, onChange } = variantConfig;
  return (
    <label
      htmlFor={countryId}
      className={classnames(`${baseClassName}__option`, {
        [`${baseClassName}__option--selected`]: isChecked,
        [`${baseClassName}__option--is-phone`]: isPhone,
      })}
      aria-label={isPhone ? `${name} +${getSafeCountryCallingCode(code)}` : name}
    >
      <input
        type="radio"
        id={countryId}
        name={inputName}
        checked={isChecked}
        className={classnames(`${baseClassName}__radio`, {
          [`${baseClassName}__radio--selected`]: isChecked,
          [`${baseClassName}__radio--visually-hidden`]: isPhone,
        })}
        onChange={() => {
          if (isPhone) onChange(code);
          else onChange(name);
        }}
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
      <span className={`${baseClassName}__option-flag`}>
        <img
          src={`https://flagcdn.com/h20/${code.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/h40/${code.toLowerCase()}.png 2x`}
          alt={`${name} flag`}
          className={`${baseClassName}__option-flag-img`}
        />
      </span>
    </label>
  );
};
