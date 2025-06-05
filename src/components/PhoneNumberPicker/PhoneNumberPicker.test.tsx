import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { runCommonTests } from '../../utils/testUtils';
import PhoneNumberPicker from './PhoneNumberPicker';

describe('PhoneNumberPicker', () => {
  runCommonTests(PhoneNumberPicker, 'PhoneNumberPicker');
  const reqProps = {
    labelText: 'Test Phone Number',
    id: 'test-id',
  };

  it('should be able to select country with country code and display the dialing code', async () => {
    const mockSetInputValue = vi.fn();
    render(<PhoneNumberPicker {...{ ...reqProps, setInputValue: mockSetInputValue }} />);

    // Use the correct test ID for the dropdown trigger
    const trigger = screen.getByTestId('test-id-combobox-dropdown');

    expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    // Find by option text that includes country code format
    const option = screen.getByText(/\(US\)/i);
    expect(option).toBeInTheDocument();
    await userEvent.click(option);

    // Check that input value is set to the dialing code with space
    expect(mockSetInputValue).toHaveBeenCalledWith('+1');
  });

  it('should be able to select an option from the dropdown by keyboard navigation', async () => {
    const mockSetInputValue = vi.fn();
    render(<PhoneNumberPicker {...{ ...reqProps, setInputValue: mockSetInputValue }} />);

    // Need to click the input first to set focus for keyboard navigation
    const input = screen.getByTestId('test-id-combobox-input');
    await userEvent.click(input);

    // Open dropdown with arrow key
    await userEvent.keyboard('{ArrowDown}');

    // Navigate to an option
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');

    // Select the option
    await userEvent.keyboard('{Enter}');

    // Verify the input value is set with correct format
    expect(mockSetInputValue).toHaveBeenCalled();

    // Update the pattern to match actual format (without requiring space)
    const lastCall = mockSetInputValue.mock.calls[mockSetInputValue.mock.calls.length - 1][0];
    expect(lastCall).toMatch(/^\+\d+$/); // Format is "+XX"
  });

  it('should be able to input a country code directly', async () => {
    // Don't pass inputValue and setInputValue as props to override the state
    const PhoneNumberPickerWrapper = () => {
      return (
        <PhoneNumberPicker labelText="Test Label" id="test-id" />
      );
    };

    render(<PhoneNumberPickerWrapper />);

    const input = screen.getByTestId('test-id-combobox-input');

    // Type directly in the input
    await userEvent.type(input, '+1');

    // Find the US option
    const usOption = screen.getByText(/\(US\)/i);
    expect(usOption).toBeInTheDocument();

    // Select it
    await userEvent.click(usOption);

    // Value should still be +1
    expect(input).toHaveValue('+1');
  });

  it('should display country name in dropdown options', async () => {
    render(<PhoneNumberPicker {...reqProps} />);

    // Open the dropdown
    const trigger = screen.getByTestId('test-id-combobox-dropdown');
    await userEvent.click(trigger);

    // Check that country names are displayed in the options
    expect(screen.getByText(/US/i)).toBeInTheDocument();
    expect(screen.getByText(/CA/i)).toBeInTheDocument();

    // Close dropdown
    await userEvent.keyboard('{Escape}');
  });

  it('initializes with provided value', () => {
    const onChange = vi.fn();
    render(<PhoneNumberPicker id="phone-picker" labelText="Phone" value="US" onChange={onChange} />);

    const input = screen.getByTestId('phone-picker-combobox-input');
    expect(input).toHaveValue('+1'); // US code is +1
  });

  it('handles selecting a country option', async () => {
    const onChange = vi.fn();
    render(<PhoneNumberPicker id="phone-picker" labelText="Phone" onChange={onChange} />);

    const input = screen.getByTestId('phone-picker-combobox-input');

    // Open dropdown
    await userEvent.click(input);

    // Select an option (Germany - DE)
    const option = await screen.findByText(/\(DE\)/);
    await userEvent.click(option);

    // Check if onChange was called with the right value and option
    expect(onChange).toHaveBeenCalledWith(
      'DE',
      expect.objectContaining({
        value: 'DE',
        displayValue: '+49',
      }),
    );
  });

  it('calls the original onBlur handler', async () => {
    const onBlur = vi.fn();
    render(<PhoneNumberPicker id="phone-picker" labelText="Phone" onBlur={onBlur} />);

    const input = screen.getByTestId('phone-picker-combobox-input');

    // Focus and then blur the input
    await userEvent.click(input);
    await userEvent.tab();

    // Check if original onBlur was called
    expect(onBlur).toHaveBeenCalled();
  });
});
