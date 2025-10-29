import { useState, forwardRef } from 'react';
import CountryPickerTrigger, { CountryPickerTriggerProps } from './CountryPickerTrigger';
import CountryPickerModal, { CountryPickerModalProps } from './CountryPickerModal';
import { getCommonProps } from '../../utils';
import { CommonProps, toConfig, PrependTrigger, PhoneConfig, CountryConfig } from './types';

/**
 * Props for the CountryPicker component.
 * Combines:
 * - CommonProps (excluding variantConfig, which is provided by PhoneConfig or CountryConfig)
 * - Discriminated union for picker mode (PhoneConfig | CountryConfig)
 * - Modal props
 * - PrependTrigger utility for trigger props
 */
export type CountryPickerProps = Omit<CommonProps, 'variantConfig'> &
  (PhoneConfig | CountryConfig) &
  CountryPickerModalProps &
  PrependTrigger<Omit<CountryPickerTriggerProps, 'baseClassName'>>;

const CountryPicker = forwardRef<HTMLButtonElement, CountryPickerProps>(
  (
    {
      triggerLabelText,
      triggerAriaLabel,
      hasTriggerError,
      triggerErrorMsg,
      triggerDisplayValue,
      modalTitle,
      searchInputLabel,
      searchInputPlaceholder,
      selectButtonLabel,
      inputName,
      baseClassName: componentBaseClassName = 'CountryPicker',
      value,
      onChange,
      isPhone,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const { className: baseClassName } = getCommonProps(props, componentBaseClassName);

    const modalProps = {
      modalTitle,
      searchInputLabel,
      searchInputPlaceholder,
      selectButtonLabel,
      inputName,
      ...props,
    };

    /**
     * Create the discriminated union config for picker mode.
     * - If isPhone, config expects country code and phone-specific onChange.
     * - Otherwise, config expects country name and country-specific onChange.
     * This ensures type safety for all operations.
     */
    const variantConfig = isPhone ? toConfig(true, value, onChange) : toConfig(false, value, onChange);

    return (
      <>
        <CountryPickerTrigger
          ref={ref}
          labelText={triggerLabelText}
          ariaLabel={triggerAriaLabel}
          displayValue={triggerDisplayValue}
          onClick={() => setIsOpen(true)}
          hasError={hasTriggerError}
          errorMsg={triggerErrorMsg}
          variantConfig={variantConfig}
          baseClassName={baseClassName}
        />
        <CountryPickerModal
          {...modalProps}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          variantConfig={variantConfig}
          baseClassName={baseClassName}
        />
        <input
          type="hidden"
          name={inputName || 'value'}
          value={variantConfig.value ?? ''}
          data-testid="country-picker-hidden-input"
        />
      </>
    );
  },
);
CountryPicker.displayName = 'CountryPicker';
export default CountryPicker;
