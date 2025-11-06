import { Meta } from '@storybook/react';
import { useState } from 'react';
import CountryPickerModal, { CountryPickerModalProps } from './CountryPickerModal';
import { Country, ModalBaseProps, toConfig } from './types';

const meta: Meta<typeof CountryPickerModal> = {
  title: 'Patterns/CountryPicker/CountryPickerModal',
  component: CountryPickerModal,
  argTypes: {
    modalTitle: {
      control: 'text',
      description: 'The title displayed at the top of the modal.',
      defaultValue: 'Select a Country',
    },
    searchInputLabel: {
      control: 'text',
      description: 'Label for the search input field.',
      defaultValue: 'Search',
    },
    searchInputPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input field.',
      defaultValue: 'Type to filter',
    },
    selectButtonLabel: {
      control: 'text',
      description: 'Label for the select button.',
      defaultValue: 'Select',
    },
    baseClassName: {
      control: 'text',
      description: 'Base class name for styling.',
      defaultValue: 'seldon-country-picker',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open.',
      defaultValue: true,
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const DefaultOpen = (props: ModalBaseProps & CountryPickerModalProps) => {
  const [selected, setSelected] = useState<Country['code']>('US');
  const variantConfig = toConfig(true, selected, (code: Country['code']) => setSelected(code));
  return (
    <CountryPickerModal
      {...props}
      isOpen={true}
      onClose={() => console.log('Modal closed')}
      variantConfig={variantConfig}
    />
  );
};
DefaultOpen.args = {
  modalTitle: 'Select a Country',
  searchInputLabel: 'Search',
  searchInputPlaceholder: 'Type to filter',
  selectButtonLabel: 'Select',
  baseClassName: 'seldon-country-picker',
  isOpen: true,
};
