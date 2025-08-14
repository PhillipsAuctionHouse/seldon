import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import CountryPickerModal from './CountryPickerModal';

import { toConfig } from './types';

vi.mock('./constants', () => ({
  countries: [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Australia', code: 'AU' },
  ],
}));

const countryBaseProps: React.ComponentProps<typeof CountryPickerModal> = {
  isOpen: true,
  variantConfig: toConfig(false, 'United States', vi.fn()),
  onClose: vi.fn(),
  modalTitle: 'Select a Country',
  searchInputLabel: 'Search for a country',
  searchInputPlaceholder: 'Type to search...',
  selectButtonLabel: 'Select',
  baseClassName: 'country-picker-modal',
};

const phoneBaseProps: React.ComponentProps<typeof CountryPickerModal> = {
  isOpen: true,
  variantConfig: toConfig(true, 'US', vi.fn()),
  onClose: vi.fn(),
  modalTitle: 'Select a Country Code',
  searchInputLabel: 'Search for a country code',
  searchInputPlaceholder: 'Type to search country code...',
  selectButtonLabel: 'Select',
  baseClassName: 'country-picker-modal',
};

describe('CountryPickerModal - Country variant', () => {
  it('renders the modal with the correct title', () => {
    render(<CountryPickerModal {...countryBaseProps} />);
    expect(screen.getByText('Select a Country')).toBeInTheDocument();
  });

  it('filters countries based on search input', async () => {
    render(<CountryPickerModal {...countryBaseProps} />);
    const searchInput = screen.getByPlaceholderText('Type to search...');
    await userEvent.type(searchInput, 'United');
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('renders prioritized countries first', () => {
    render(<CountryPickerModal {...countryBaseProps} />);
    const prioritizedCountry = screen.getByText('United States');
    expect(prioritizedCountry).toBeInTheDocument();
  });

  it('renders grouped countries with letter headers', () => {
    render(<CountryPickerModal {...countryBaseProps} />);
    const letterHeader = screen.getByText('A');
    expect(letterHeader).toBeInTheDocument();
  });

  it('calls onChange only when submit button is clicked (country)', async () => {
    const onChangeSpy = vi.fn();
    render(
      <CountryPickerModal
        {...countryBaseProps}
        variantConfig={{ ...countryBaseProps.variantConfig, onChange: onChangeSpy }}
      />,
    );
    const countryOption = screen.getByRole('radio', { name: 'United States' });
    await userEvent.click(countryOption);
    expect(onChangeSpy).not.toHaveBeenCalled();
    const selectButton = screen.getByTestId('country-picker-modal-select-button');
    await userEvent.click(selectButton);
    expect(onChangeSpy).toHaveBeenCalledWith('United States');
  });

  it('disables the select button when no country is selected', () => {
    render(
      <CountryPickerModal
        {...countryBaseProps}
        variantConfig={{ ...countryBaseProps.variantConfig, value: undefined }}
      />,
    );
    const selectButton = screen.getByTestId('country-picker-modal-select-button');
    expect(selectButton).toBeDisabled();
  });

  it('enables the select button when a country is selected', () => {
    render(<CountryPickerModal {...countryBaseProps} />);
    const selectButton = screen.getByTestId('country-picker-modal-select-button');
    expect(selectButton).not.toBeDisabled();
  });

  it('handles keyboard navigation with arrow keys', async () => {
    render(<CountryPickerModal {...countryBaseProps} />);
    await userEvent.keyboard('{ArrowDown}');
    // Add assertions to verify focus changes
  });
});

describe('CountryPickerModal - Phone variant', () => {
  it('renders the modal with the correct title', () => {
    render(<CountryPickerModal {...phoneBaseProps} />);
    expect(screen.getByText('Select a Country Code')).toBeInTheDocument();
  });

  it('filters countries based on search input', async () => {
    render(<CountryPickerModal {...phoneBaseProps} />);
    const searchInput = screen.getByPlaceholderText('Type to search country code...');
    await userEvent.type(searchInput, 'United');
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('renders prioritized countries first', () => {
    render(<CountryPickerModal {...phoneBaseProps} />);
    const prioritizedCountry = screen.getByText('United States');
    expect(prioritizedCountry).toBeInTheDocument();
  });

  it('renders grouped countries with letter headers', () => {
    render(<CountryPickerModal {...phoneBaseProps} />);
    const letterHeader = screen.getByText('A');
    expect(letterHeader).toBeInTheDocument();
  });

  it('calls onChange only when submit button is clicked (phone)', async () => {
    const onChangeSpy = vi.fn();
    render(
      <CountryPickerModal
        {...phoneBaseProps}
        variantConfig={{ ...phoneBaseProps.variantConfig, onChange: onChangeSpy }}
      />,
    );
    const countryOption = screen.getByLabelText('United States +1');
    await userEvent.click(countryOption);
    expect(onChangeSpy).not.toHaveBeenCalled();
    const selectButton = screen.getByTestId('country-picker-modal-select-button');
    await userEvent.click(selectButton);
    expect(onChangeSpy).toHaveBeenCalledWith('US');
  });

  it('disables the select button when no country code is selected', () => {
    render(
      <CountryPickerModal {...phoneBaseProps} variantConfig={{ ...phoneBaseProps.variantConfig, value: undefined }} />,
    );
    const selectButton = screen.getByTestId('country-picker-modal-select-button');
    expect(selectButton).toBeDisabled();
  });

  it('enables the select button when a country code is selected', () => {
    render(<CountryPickerModal {...phoneBaseProps} />);
    const selectButton = screen.getByTestId('country-picker-modal-select-button');
    expect(selectButton).not.toBeDisabled();
  });

  it('handles keyboard navigation with arrow keys', async () => {
    render(<CountryPickerModal {...phoneBaseProps} />);
    await userEvent.keyboard('{ArrowDown}');
    // Add assertions to verify focus changes
  });
});
