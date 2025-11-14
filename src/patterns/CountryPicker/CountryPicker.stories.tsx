import { Meta } from '@storybook/react';
import { useState } from 'react';
import CountryPicker, { CountryPickerProps } from './CountryPicker';
import { getSafeCountryCallingCode } from './utils';
import { countries } from './constants';
import { Country, toConfig } from './types';

const meta: Meta<typeof CountryPicker> = {
  title: 'Patterns/CountryPicker',
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
    isPhone: {
      control: 'boolean',
      description: 'Determines if the picker is for phone codes.',
      defaultValue: false,
    },
    onChange: {
      action: 'changed',
      description: 'Callback function triggered when the value changes.',
    },
    value: {
      control: 'text',
      description: 'The currently selected value.',
      defaultValue: '',
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
  // Store country name for non-phone picker
  const [selected, setSelected] = useState<Country['name'] | undefined>(undefined);

  const config = toConfig(false, selected, setSelected);

  // Find the country object by name for display
  const selectedCountry = countries.find((c) => c.name === selected);

  return (
    <CountryPicker
      {...props}
      triggerLabelText="Country*"
      triggerDisplayValue={selectedCountry ? selectedCountry.name : 'Select a country'}
      searchInputPlaceholder="Search country or code"
      hasTriggerError={false}
      triggerErrorMsg=""
      {...config}
    />
  );
};

Playground.args = {
  modalTitle: 'Select a Country',
  searchLabel: '',
  searchPlaceholder: 'Search for a country',
  selectButtonLabel: 'Select',
};
export const CountryPhoneCodePicker = (props: CountryPickerProps) => {
  // Store country code for phone picker
  const [selected, setSelected] = useState<Country['code'] | undefined>(undefined);

  const config = toConfig(true, selected, setSelected);

  // Find the country object by code for display
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
      {...config}
    />
  );
};

export const PreSelectedCountry = () => (
  <CountryPicker
    value="US"
    triggerLabelText="Country"
    triggerDisplayValue="+1"
    modalTitle="Select Country"
    searchInputLabel="Search country"
    searchInputPlaceholder="Search country"
    selectButtonLabel="Select"
    isPhone={true}
    onChange={(code) => console.log('Selected country code:', code)}
  />
);
PreSelectedCountry.storyName = 'Trigger with pre-selected country';
