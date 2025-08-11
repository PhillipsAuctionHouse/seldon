import { Meta } from '@storybook/react';
import { useState } from 'react';
import CountryPicker, { CountryPickerProps } from './CountryPicker';
import { getSafeCountryCallingCode } from './utils';
import { countries } from './constants';
import { assignType, Country, PhoneConfig } from './types';

const meta: Meta<typeof CountryPicker> = {
  title: 'Components/CountryPicker',
  component: CountryPicker,
  argTypes: {
    modalTitle: {
      control: 'text',
      description: 'The title displayed at the top of the modal.',
      defaultValue: 'Select a Country',
    },
    searchInputLabel: {
      control: 'text',
      description: 'Label for the search input field.',
      defaultValue: 'Search for a country',
    },
    searchInputPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input field.',
      defaultValue: 'Type to search...',
    },
    selectButtonLabel: {
      control: 'text',
      description: 'Label for the select button.',
      defaultValue: 'Select',
    },
    inputName: {
      control: 'text',
      description: 'Name attribute for the input field.',
      defaultValue: 'country',
    },
    variantConfig: {
      control: 'object',
      description: 'Configuration for phone/country variant.',
      table: {
        type: { summary: 'PhoneConfig | CountryConfig' },
      },
      defaultValue: { isPhone: false },
      options: [{ isPhone: false }, { isPhone: true }],
      mapping: {
        country: { isPhone: false },
        phone: { isPhone: true },
      },
    },
    baseClassName: {
      control: 'text',
      description: 'Base class name for styling.',
      defaultValue: 'country-picker-modal',
    },
  },
};

export default meta;

export const Playground = (props: CountryPickerProps) => {
  // Always provide a safe default for variantConfig
  const safeVariantConfig = props.variantConfig ?? { isPhone: false };
  const config = assignType(safeVariantConfig);
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
        } as typeof config
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
  // Always provide a safe default for variantConfig
  const safeVariantConfig = props.variantConfig ?? { isPhone: true };
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
      modalTitle="Country code"
      searchInputLabel=""
      searchInputPlaceholder="Search country"
      selectButtonLabel="Select"
      variantConfig={{
        isPhone: safeVariantConfig.isPhone,
        countryValue: selected,
        onChange: setSelected,
      }}
    />
  );
};
