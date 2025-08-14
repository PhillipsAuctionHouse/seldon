import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CountryPickerOption } from './CountryPickerOption';
import { getTestConfig } from './testUtils';

describe('CountryPickerOption', () => {
  const baseProps: React.ComponentProps<typeof CountryPickerOption> = {
    code: 'US',
    name: 'United States',
    variantConfig: getTestConfig(true),
    isChecked: false,
    inputName: 'country',
    baseClassName: 'country-picker',
  };
  const onChangeSpy = vi.fn();

  it('renders the country name', () => {
    render(<CountryPickerOption {...baseProps} variantConfig={getTestConfig(false)} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('calls onChange with the country name when clicked', () => {
    render(<CountryPickerOption {...baseProps} variantConfig={{ ...getTestConfig(false), onChange: onChangeSpy }} />);
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(onChangeSpy).toHaveBeenCalledWith('United States');
  });

  it('renders the country code when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps} />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('calls onChange with the country code when isPhone is true and clicked', () => {
    render(
      <CountryPickerOption {...baseProps} variantConfig={{ ...baseProps.variantConfig, onChange: onChangeSpy }} />,
    );
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(onChangeSpy).toHaveBeenCalledWith('US');
  });

  it('applies the selected class when isChecked is true', () => {
    render(<CountryPickerOption {...baseProps} isChecked={true} variantConfig={getTestConfig(false)} />);
    const label = screen.getByRole('radio', { name: 'United States' });
    expect(label).toHaveClass('country-picker__radio country-picker__radio--selected');
  });

  it('applies the is-phone class when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps} />);
    const input = screen.getByRole('radio');
    const label = input.closest('label');
    expect(label).toHaveClass('country-picker__option--is-phone');
  });

  it('hides the radio input when isPhone is true', () => {
    render(<CountryPickerOption {...baseProps} />);
    const input = screen.getByRole('radio');
    expect(input).toHaveClass('country-picker__radio--visually-hidden');
  });
});
