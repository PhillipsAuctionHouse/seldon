import userEvent from '@testing-library/user-event';
import PhoneNumberInput from './PhoneNumberInput';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useState } from 'react';
import { CountryCode } from './types';

// A consumer that keeps both the number and the country in its own state, like a form library would
function ControlledPhoneNumberInput({
  onChange,
  initialCountryCode,
}: {
  onChange: (val: string, code: CountryCode) => void;
  initialCountryCode?: CountryCode;
}) {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  return (
    <PhoneNumberInput
      value={value}
      countryCode={countryCode}
      handleValueChange={(val, code) => {
        setValue(val);
        setCountryCode(code);
        onChange(val, code);
      }}
    />
  );
}

async function pickCountry(optionText: string) {
  await userEvent.click(screen.getByRole('button', { name: 'Phone country' }));
  await userEvent.click(await screen.findByText(optionText));
  await userEvent.click(screen.getByRole('button', { name: 'Select' }));
}

describe('PhoneNumberInput', () => {
  it('renders the component with default props', () => {
    render(<PhoneNumberInput />);
    expect(screen.getByLabelText('Phone country')).toBeInTheDocument();
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
          handleValueChange={(val, code) => {
            setValue(val);
            handleChange(val, code);
          }}
        />
      );
    }
    render(<ControlledPhoneNumberInput />);
    const input = screen.getByLabelText('Phone phone');
    await userEvent.type(input, '1234567890');
    expect(handleChange).toHaveBeenLastCalledWith('1234567890', 'US');
  });

  it('displays an error message when error is true', () => {
    render(<PhoneNumberInput error errorText="Invalid phone number" />);
    expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
  });

  it('disables the input when the disabled prop is true', () => {
    render(<PhoneNumberInput disabled />);
    const input = screen.getByLabelText('Phone phone');
    expect(input).toBeDisabled();
  });

  it('renders the hidden and visible phone inputs with correct value', () => {
    render(<PhoneNumberInput value="1234567890" countryCode="US" />);
    // Hidden input
    expect(screen.getByTestId('phone-number-hidden-input')).toHaveValue('1234567890');
    // Visible input
    expect(screen.getByTestId('phone-input')).toHaveValue('1234567890');
  });

  // L3-16329: a consumer holding the country in its own state never heard about a country change
  // made after typing, so validation saw an empty country even though the trigger showed one
  it('calls handleValueChange with the typed value and the new country when the country is picked after typing', async () => {
    const handleChange = vi.fn();
    render(<ControlledPhoneNumberInput onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText('Phone phone'), '7700900123');
    expect(handleChange).toHaveBeenLastCalledWith('7700900123', '');

    await pickCountry('United Kingdom');

    expect(handleChange).toHaveBeenLastCalledWith('7700900123', 'GB');
    expect(screen.getByTestId('phone-country-code-hidden-input')).toHaveValue('GB');
    expect(screen.getByTestId('phone-number-hidden-input')).toHaveValue('7700900123');
  });

  it('keeps reporting the picked country on later typing', async () => {
    const handleChange = vi.fn();
    render(<ControlledPhoneNumberInput onChange={handleChange} initialCountryCode="US" />);
    await pickCountry('United Kingdom');
    await userEvent.type(screen.getByLabelText('Phone phone'), '1');
    expect(handleChange).toHaveBeenLastCalledWith('1', 'GB');
  });

  // e.g. an edit form that loads the saved number after first render
  it('updates the trigger and hidden country input when the countryCode prop changes', () => {
    const { rerender } = render(<PhoneNumberInput value="1234567890" countryCode="US" />);
    expect(screen.getByText('+1')).toBeInTheDocument();

    rerender(<PhoneNumberInput value="1234567890" countryCode="GB" />);

    expect(screen.getByText('+44')).toBeInTheDocument();
    expect(screen.getByTestId('phone-country-code-hidden-input')).toHaveValue('GB');
  });

  // Uncontrolled consumers (e.g. ones that read the hidden inputs from the form post) pass a fixed countryCode
  it('keeps the picked country when the countryCode prop does not change', async () => {
    render(<PhoneNumberInput countryCode="US" />);
    await pickCountry('United Kingdom');
    expect(screen.getByTestId('phone-country-code-hidden-input')).toHaveValue('GB');
  });
});
