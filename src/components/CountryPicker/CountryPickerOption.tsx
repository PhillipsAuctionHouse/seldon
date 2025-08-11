import Text from '../Text/Text';
import { TextVariants } from '../Text';
import classnames from 'classnames';
import { getSafeCountryCallingCode } from './utils';
import { assignType, Country, ModalBaseProps } from './types';

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

export const CountryPickerOption = ({
  code,
  name,
  isChecked,
  inputName,
  baseClassName,
  variantConfig,
}: ModalBaseProps<CountryPickerOptionProps>) => {
  const countryId = `${baseClassName}__radio-${code}`;
  const { isPhone, onChange } = assignType(variantConfig);
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
          isPhone ? onChange(code) : onChange(name);
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
