import Icon from '../Icon/Icon';
import { TextVariants } from '../Text';
import Text from '../Text/Text';
import classNames from 'classnames';
import { countries } from './types'; // Make sure this import is correct for your project

export type CountryPickerTriggerProps = {
  /**
   * The label text displayed above the button.
   */
  labelText: string;

  /**
   * The value displayed inside the button (e.g., selected country or phone code).
   */
  value: string;

  /**
   * Callback function triggered when the button is clicked.
   */
  onClick: () => void;

  /**
   * Optional flag to indicate if there is an error.
   */
  hasError?: boolean;

  /**
   * Optional error message to display when there is an error.
   */
  errorMsg?: string;

  /**
   * Optional flag to indicate if the component is used for phone input.
   */
  isPhone?: boolean;

  /**
   * Optional country code to display when `isPhone` is true. eg +1
   */
  countryCode?: string;

  /**
   * Optional ID for the button and associated elements.
   */
  id?: string;

  /**
   * Optional additional class names for styling.
   */
  className?: string;
  /**
   * The base class name for styling the component.
   */
  baseClassName: string;
  /**
   * Used to determine the country value for the flag.
   */
  countryValue: string;
};

const CountryPickerTrigger = ({
  labelText,
  value,
  onClick,
  hasError = false,
  errorMsg,
  isPhone = false,
  countryCode,
  id,
  className,
  baseClassName,
  countryValue,
}: CountryPickerTriggerProps) => {
  const errorId = errorMsg ? `${baseClassName}__trigger-error-msg` : undefined;

  // Determine the ISO country code for the flag
  let flagCode: string | undefined;
  if (isPhone && countryValue) {
    flagCode = countryValue.toLowerCase();
  } else if (!isPhone && countryValue) {
    const found = countries.find((country) => country.name === countryValue);
    flagCode = found ? found.code.toLowerCase() : undefined;
  }

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
            src={`https://flagcdn.com/24x18/${flagCode}.png`}
            alt={`${countryValue} flag`}
            className={`${baseClassName}__trigger-flag`}
          />
        )}
        <span className={classNames(`${baseClassName}__trigger-text`)}>{isPhone ? countryCode : value}</span>
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
