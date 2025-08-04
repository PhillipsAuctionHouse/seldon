import { useState } from 'react';
import CountryPickerTrigger from './CountryPickerTrigger';
import CountryPickerModal, { CountryPickerModalProps } from './CountryPickerModal';
import { getCommonProps } from '../../utils';

export type CountryPickerProps = Omit<CountryPickerModalProps, 'isOpen' | 'onClose'> & {
  triggerLabel: string;
  hasTriggerError?: boolean;
  triggerErrorMsg?: string;
  triggerValue: string;
  triggerCountryCode?: string;
  isPhone?: boolean;
  id?: string;
};

const CountryPicker = ({
  triggerLabel,
  hasTriggerError,
  triggerErrorMsg,
  triggerValue,
  triggerCountryCode,
  isPhone,
  countryValue, // <-- add this line
  ...modalProps
}: CountryPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { className: baseClassName } = getCommonProps(modalProps, 'CountryPicker');
  return (
    <>
      <CountryPickerTrigger
        labelText={triggerLabel}
        value={triggerValue}
        onClick={() => setIsOpen(true)}
        hasError={hasTriggerError}
        errorMsg={triggerErrorMsg}
        isPhone={isPhone}
        countryCode={triggerCountryCode}
        countryValue={countryValue} // <-- pass countryValue to trigger
        baseClassName={baseClassName}
      />
      <CountryPickerModal
        {...modalProps}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isPhone={isPhone}
        baseClassName={baseClassName}
        countryValue={countryValue}
      />
    </>
  );
};
CountryPicker.displayName = 'CountryPicker';
export default CountryPicker;
