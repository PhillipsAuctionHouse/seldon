import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CountryPickerOption } from './CountryPickerOption';
import { CountryCode } from 'libphonenumber-js';

describe('CountryPickerOption', () => {
  const baseProps = {
    code: 'US' as CountryCode,
    name: 'United States',
    isChecked: false,
    isPhone: false,
    inputName: 'country',
    onChange: vi.fn(),
    baseClassName: 'country-picker',
  };

  it('renders the country name', () => {
    render(<CountryPickerOption {...baseProps} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('calls onChange with the country name when clicked', () => {
    render(<CountryPickerOption {...baseProps} />);
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(baseProps.onChange).toHaveBeenCalledWith('United States');
  });

  it('renders the country code when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps} isPhone={true} />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('calls onChange with the country code when isPhone is true and clicked', () => {
    render(<CountryPickerOption {...baseProps} isPhone={true} />);
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(baseProps.onChange).toHaveBeenCalledWith('US');
  });

  it('applies the selected class when isChecked is true', () => {
    render(<CountryPickerOption {...baseProps} isChecked={true} />);
    const label = screen.getByLabelText('United States');
    expect(label).toHaveClass('country-picker__radio country-picker__radio--selected');
  });

  it('applies the is-phone class when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps} isPhone={true} />);
    const input = screen.getByRole('radio');
    const label = input.closest('label');
    expect(label).toHaveClass('country-picker__option--is-phone');
  });

  it('hides the radio input when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps} isPhone={true} />);
    const input = screen.getByRole('radio');
    expect(input).toHaveClass('country-picker__radio--hidden');
  });
});
