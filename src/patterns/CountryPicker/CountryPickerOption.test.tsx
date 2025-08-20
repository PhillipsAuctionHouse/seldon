import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CountryPickerOption } from './CountryPickerOption';
import { toConfig } from './types';

describe('CountryPickerOption', () => {
  const baseProps: (isPhone?: boolean, useSpy?: boolean) => React.ComponentProps<typeof CountryPickerOption> = (
    isPhone = false,
    useSpy = false,
  ) => ({
    code: 'US',
    name: 'United States',
    variantConfig: isPhone
      ? toConfig(true, 'US', useSpy ? onChangeSpy : vi.fn())
      : toConfig(false, 'United States', useSpy ? onChangeSpy : vi.fn()),
    isChecked: false,
    inputName: 'country',
    baseClassName: 'country-picker',
  });
  const onChangeSpy = vi.fn();

  it('renders the country name', () => {
    render(<CountryPickerOption {...baseProps()} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('calls onChange with the country name when clicked', () => {
    render(<CountryPickerOption {...baseProps(false, true)} />);
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(onChangeSpy).toHaveBeenCalledWith('United States');
  });

  it('renders the country code when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps(true)} />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('calls onChange with the country code when isPhone is true and clicked', () => {
    render(<CountryPickerOption {...baseProps(true, true)} />);
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(onChangeSpy).toHaveBeenCalledWith('US');
  });

  it('applies the selected class when isChecked is true', () => {
    render(<CountryPickerOption {...baseProps()} isChecked={true} />);
    const label = screen.getByRole('radio', { name: 'United States' });
    expect(label).toHaveClass('country-picker__radio country-picker__radio--selected');
  });

  it('applies the is-phone class when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps(true)} />);
    const input = screen.getByRole('radio');
    const label = input.closest('label');
    expect(label).toHaveClass('country-picker__option--is-phone');
  });

  it('hides the radio input when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps(true)} />);
    const input = screen.getByRole('radio');
    expect(input).toHaveClass('country-picker__radio--visually-hidden');
  });
});
