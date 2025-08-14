import { Meta } from '@storybook/react';
import { useState } from 'react';
import CountryPicker, { CountryPickerProps } from './CountryPicker';
import { getSafeCountryCallingCode } from './utils';
import { countries } from './constants';

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
  // Store country name for non-phone
  const [selected, setSelected] = useState<typeof props.value>(undefined);

  // Find the country object by name
  const selectedCountry = countries.find((c) => c.name === selected);

  return (
    <CountryPicker
      {...props}
      triggerLabelText="Country*"
      triggerDisplayValue={selectedCountry ? selectedCountry.name : 'Select a country'}
      hasTriggerError={false}
      triggerErrorMsg=""
      isPhone={false}
      value={selected}
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
  const [selected, setSelected] = useState<typeof props.value>(undefined);

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
      isPhone={true}
      value={selected}
      onChange={(v) => setSelected(v)}
    />
  );
};
