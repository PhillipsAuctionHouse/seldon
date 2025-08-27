import userEvent from '@testing-library/user-event';
import PhoneNumberInput from './PhoneNumberInput';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useState } from 'react';

describe('PhoneNumberInput', () => {
  it('renders the component with default props', () => {
    render(<PhoneNumberInput />);
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
  });

  it('displays the correct country code when a country is selected', () => {
    render(<PhoneNumberInput countryCode="US" />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('calls onChange with the correct values when input changes', async () => {
    const handleChange = vi.fn();
    function ControlledPhoneNumberInput() {
      const [value, setValue] = useState('');
      return (
        <PhoneNumberInput
          value={value}
          countryCode="US"
          onChange={(val, code) => {
            setValue(val);
            handleChange(val, code);
          }}
        />
      );
    }
    render(<ControlledPhoneNumberInput />);
    const input = screen.getByLabelText('Phone');
    await userEvent.type(input, '1234567890');
    expect(handleChange).toHaveBeenLastCalledWith('1234567890', 'US');
  });

  it('displays an error message when error is true', () => {
    render(<PhoneNumberInput error errorText="Invalid phone number" />);
    expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
  });

  it('disables the input when the disabled prop is true', () => {
    render(<PhoneNumberInput disabled />);
    const input = screen.getByLabelText('Phone');
    expect(input).toBeDisabled();
  });

  it('renders the hidden and visible phone inputs with correct value', () => {
    render(<PhoneNumberInput value="1234567890" countryCode="US" />);
    // Hidden input
    expect(screen.getByTestId('phone-number-hidden-input')).toHaveValue('1234567890');
    // Visible input
    expect(screen.getByTestId('phone-input')).toHaveValue('1234567890');
  });
});
