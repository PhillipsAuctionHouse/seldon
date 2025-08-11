import { useState } from 'react';
import CountryPickerTrigger, { CountryPickerTriggerProps } from './CountryPickerTrigger';
import CountryPickerModal, { CountryPickerModalProps } from './CountryPickerModal';
import { getCommonProps } from '../../utils';
import { CommonProps, PrependTrigger } from './types';

export type CountryPickerProps = CommonProps &
  CountryPickerModalProps &
  PrependTrigger<Omit<CountryPickerTriggerProps, 'baseClassName' | 'variantConfig'>>;

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
  variantConfig,
  baseClassName: componentBaseClassName = 'CountryPicker',
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
    </>
  );
};
CountryPicker.displayName = 'CountryPicker';
export default CountryPicker;
