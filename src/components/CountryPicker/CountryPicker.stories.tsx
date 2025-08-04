import { Meta } from '@storybook/react';
import { useState } from 'react';
import CountryPicker, { CountryPickerProps } from './CountryPicker';
import { getSafeCountryCallingCode } from './utils';
import { countries } from './types';

const meta: Meta<typeof CountryPicker> = {
  title: 'Components/CountryPicker',
  component: CountryPicker,
};

export default meta;

export const Playground = (props: CountryPickerProps) => {
  // Store country name for non-phone
  const [selected, setSelected] = useState<string | undefined>(undefined);

  // Find the country object by name
  const selectedCountry = countries.find((c) => c.name === selected);

  return (
    <CountryPicker
      {...props}
      triggerLabel="Country*"
      triggerValue={selectedCountry ? selectedCountry.name : 'Select a country'}
      hasTriggerError={false}
      triggerErrorMsg=""
      countryValue={selected}
      onChange={setSelected}
    />
  );
};

Playground.args = {
  modalTitle: 'Select a Country',
  searchLabel: '',
  searchPlaceholder: 'Search for a country',
  selectButtonLabel: 'Select',
  isPhone: false,
};

export const CountryPhoneCodePicker = (props: CountryPickerProps) => {
  // Store country code for phone
  const [selected, setSelected] = useState<string | undefined>(undefined);

  // Find the country object by code
  const selectedCountry = countries.find((c) => c.code === selected);

  return (
    <CountryPicker
      {...props}
      triggerLabel="Country code"
      triggerValue={selectedCountry ? `+${getSafeCountryCallingCode(selectedCountry.code)}` : 'Select code'}
      hasTriggerError={false}
      triggerErrorMsg=""
      triggerCountryCode={selectedCountry ? `+${getSafeCountryCallingCode(selectedCountry.code)}` : undefined}
      countryValue={selected}
      onChange={setSelected}
      modalTitle="Country code"
      searchLabel=""
      searchPlaceholder="Search country"
      selectButtonLabel="Select"
      isPhone={true}
    />
  );
};
