import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { runCommonTests } from '../../utils/testUtils';
import PhoneNumberPicker from './PhoneNumberPicker';
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';

let lastSelectedCountryRefValue: string | undefined;
vi.mock('react', async () => {
  const actual = (await vi.importActual('react')) as typeof import('react');
  return {
    ...actual,
    useRef: (arg?: string) => {
      // sort of silly way to check that this is the correct useRef call for us to mock
      const getIsCountryCode = (arg: unknown) => {
        try {
          return !!getCountryCallingCode(arg as CountryCode);
        } catch {
          return false;
        }
      };
      if (getIsCountryCode(arg)) lastSelectedCountryRefValue = arg;
      let _current = actual.useRef(arg).current;
      return {
        get current() {
          return _current;
        },
        set current(value) {
          if (getIsCountryCode(value)) lastSelectedCountryRefValue = value;
          _current = value;
        },
      };
    },
  };
});
describe('PhoneNumberPicker', () => {
  runCommonTests(PhoneNumberPicker, 'PhoneNumberPicker');
  const reqProps = {
    labelText: 'Test Phone Number',
    id: 'test-id',
  };

  it('should be able to select country with country code and display the dialing code', async () => {
    const onChange = vi.fn();
    render(<PhoneNumberPicker {...reqProps} onChange={onChange} />);

    // Use the correct test ID for the dropdown trigger
    const trigger = screen.getByTestId('test-id-combobox-dropdown');
    await userEvent.click(trigger);

    // Find and select the US option
    const option = screen.getByText(/\(US\)/i);
    await userEvent.click(option);

    // Check that onChange was called with the correct value
    expect(onChange).toHaveBeenCalledWith(
      'US',
      expect.objectContaining({
        value: 'US',
        displayValue: '+1',
      }),
    );

    // Check the input displays the dialing code
    const input = screen.getByTestId('test-id-combobox-input');
    expect(input).toHaveValue('+1');
  });

  it('should initialize with provided value', () => {
    render(<PhoneNumberPicker id="test-id" labelText="Phone" value="US" />);

    const input = screen.getByTestId('test-id-combobox-input');
    expect(input).toHaveValue('+1'); // US code is +1
  });

  it('calls the original onBlur handler', async () => {
    const onBlur = vi.fn();
    render(<PhoneNumberPicker {...reqProps} onBlur={onBlur} />);

    const input = screen.getByTestId('test-id-combobox-input');

    // Focus and then blur the input
    await userEvent.click(input);
    await userEvent.tab();

    // Check if original onBlur was called
    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle country selection when typing a dialing code', async () => {
    const onChange = vi.fn();
    render(<PhoneNumberPicker {...reqProps} onChange={onChange} />);

    const input = screen.getByTestId('test-id-combobox-input');

    // Type a dialing code
    await userEvent.type(input, '+49');

    // Wait for options to filter
    await waitFor(() => {
      expect(screen.getByText(/\(DE\)/i)).toBeInTheDocument();
    });

    // Select the option
    const option = screen.getByText(/\(DE\)/i);
    await userEvent.click(option);

    // Check onChange called with correct value
    expect(onChange).toHaveBeenCalledWith('DE', expect.objectContaining({ value: 'DE', displayValue: '+49' }));
  });
});

it('should clear lastSelectedCountry reference when value is cleared', async () => {
  const onChange = vi.fn();
  render(<PhoneNumberPicker id="test-id" labelText="Phone" value="US" onChange={onChange} />);
  await userEvent.click(screen.getByTestId('test-id-combobox-clear-button'));
  // await userEvent.clear(screen.getByTestId('test-id-combobox-input'));
  await userEvent.tab();

  expect(lastSelectedCountryRefValue).toBe('');
});

it('should update lastSelectedCountry reference when a country is selected', async () => {
  const onChange = vi.fn();
  render(<PhoneNumberPicker id="test-id" labelText="Phone" onChange={onChange} />);

  const trigger = screen.getByTestId('test-id-combobox-dropdown');
  await userEvent.click(trigger);

  const option = screen.getByText(/\(CA\)/i);
  await userEvent.click(option);

  await waitFor(() => {
    expect(lastSelectedCountryRefValue).toBe('CA');
  });
});
