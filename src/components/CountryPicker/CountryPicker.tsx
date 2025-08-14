import { useState } from 'react';
import CountryPickerTrigger, { CountryPickerTriggerProps } from './CountryPickerTrigger';
import CountryPickerModal, { CountryPickerModalProps } from './CountryPickerModal';
import { getCommonProps } from '../../utils';
import { CommonProps, getConfig, PrependTrigger, VariantConfig } from './types';

export type CountryPickerProps = Omit<
  CommonProps &
    CountryPickerModalProps &
    PrependTrigger<Omit<CountryPickerTriggerProps, 'baseClassName'>> & {
      value: VariantConfig['countryValue'];
      isPhone: boolean;
      onChange: (v?: VariantConfig['countryValue']) => void;
    },
  'variantConfig'
>;

const CountryPicker = ({
  triggerLabelText,
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
}: CountryPickerProps) => {
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

  const variantConfig = getConfig(isPhone, value, onChange);

  return (
    <>
      <CountryPickerTrigger
        labelText={triggerLabelText}
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
        name={inputName || 'countryValue'}
        value={variantConfig.countryValue ?? ''}
        data-testid="country-picker-hidden-input"
      />
    </>
  );
};
CountryPicker.displayName = 'CountryPicker';
export default CountryPicker;
