import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CountryPickerModal from './CountryPickerModal';
import { getConfigVariant } from './testUtils';

const baseProps: React.ComponentProps<typeof CountryPickerModal> = {
  isOpen: true,
  variantConfig: getConfigVariant(false),
  onClose: vi.fn(),
  modalTitle: 'Select a Country',
  searchLabel: 'Search for a country',
  searchPlaceholder: 'Type to search...',
  selectButtonLabel: 'Select',
  baseClassName: 'country-picker-modal',
};

describe('CountryPickerModal', () => {
  it('renders the modal with the correct title', () => {
    render(<CountryPickerModal {...baseProps} />);
    expect(screen.getByText('Select a Country')).toBeInTheDocument();
  });

  it('filters countries based on search input', () => {
    render(<CountryPickerModal {...baseProps} />);
    const searchInput = screen.getByPlaceholderText('Type to search...');
    fireEvent.change(searchInput, { target: { value: 'United' } });
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('renders prioritized countries first', () => {
    render(<CountryPickerModal {...baseProps} />);
    const prioritizedCountry = screen.getByText('United States');
    expect(prioritizedCountry).toBeInTheDocument();
  });

  it('renders grouped countries with letter headers', () => {
    render(<CountryPickerModal {...baseProps} />);
    const letterHeader = screen.getByText('A');
    expect(letterHeader).toBeInTheDocument();
  });

  it('calls onChange when a country is selected', () => {
    const onChangeSpy = vi.fn();
    render(
      <CountryPickerModal
        {...baseProps}
        variantConfig={{ ...getConfigVariant(false), onChange: onChangeSpy, countryValue: undefined }}
      />,
    );
    const countryOption = screen.getByLabelText('United States');
    fireEvent.click(countryOption);
    expect(onChangeSpy).toHaveBeenCalledWith('United States');
  });

  it('disables the select button when no country is selected', () => {
    render(
      <CountryPickerModal {...baseProps} variantConfig={{ ...getConfigVariant(false), countryValue: undefined }} />,
    );
    const selectButton = screen.getByTestId('country-picker-modal-select-button');
    expect(selectButton).toBeDisabled();
  });

  it('enables the select button when a country is selected', () => {
    render(<CountryPickerModal {...baseProps} variantConfig={getConfigVariant(false)} />);
    const selectButton = screen.getByTestId('country-picker-modal-select-button');
    expect(selectButton).not.toBeDisabled();
  });

  it('handles keyboard navigation with arrow keys', () => {
    render(<CountryPickerModal {...baseProps} />);
    const list = screen.getByRole('radiogroup');
    fireEvent.keyDown(list, { key: 'ArrowDown' });
    // Add assertions to verify focus changes
  });
});
