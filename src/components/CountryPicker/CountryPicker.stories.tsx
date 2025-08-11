import { Meta } from '@storybook/react';
import { useState } from 'react';
import CountryPicker, { CountryPickerProps } from './CountryPicker';
import { getSafeCountryCallingCode } from './utils';
import { countries } from './constants';
import { assignType, Country, PhoneConfig } from './types';

const meta: Meta<typeof CountryPicker> = {
  title: 'Components/CountryPicker',
  component: CountryPicker,
};

export default meta;

export const Playground = (props: CountryPickerProps) => {
  // Assign the correct types per variant
  const config = assignType(props.variantConfig);
  const { isPhone, countryValue } = config;
  // Store country name for non-phone
  const [selected, setSelected] = useState<typeof countryValue>(undefined);

  // Find the country object by name
  const selectedCountry = countries.find((c) => c.name === selected);

  return (
    <CountryPicker
      {...props}
      triggerLabelText="Country*"
      triggerDisplayValue={selectedCountry ? selectedCountry.name : 'Select a country'}
      hasTriggerError={false}
      triggerErrorMsg=""
      variantConfig={
        {
          isPhone,
          countryValue: selected,
          onChange: setSelected,
        } as typeof config // somebody help with the onChange and/or isPhone typing, I am tired and lost and so far from home
      }
    />
  );
};

Playground.args = {
  modalTitle: 'Select a Country',
  searchLabel: '',
  searchPlaceholder: 'Search for a country',
  selectButtonLabel: 'Select',
  variantConfig: {
    isPhone: false,
  },
};

export const CountryPhoneCodePicker = (props: CountryPickerProps & { variantConfig: PhoneConfig }) => {
  // Store country code for phone
  const [selected, setSelected] = useState<Country['code'] | undefined>(undefined);

  // Find the country object by code
  const selectedCountry = countries.find((c) => c.code === selected);

  return (
    <CountryPicker
      {...props}
      triggerLabelText="Country code"
      triggerDisplayValue={selectedCountry ? `+${getSafeCountryCallingCode(selectedCountry.code)}` : 'Select code'}
      hasTriggerError={false}
      triggerErrorMsg=""
      triggerCountryCallingCode={selectedCountry ? `+${+getSafeCountryCallingCode(selectedCountry.code)}` : undefined}
      modalTitle="Country code"
      searchInputLabel=""
      searchInputPlaceholder="Search country"
      selectButtonLabel="Select"
      variantConfig={{
        isPhone: props.variantConfig.isPhone,
        countryValue: selected,
        onChange: setSelected,
      }}
    />
  );
};
