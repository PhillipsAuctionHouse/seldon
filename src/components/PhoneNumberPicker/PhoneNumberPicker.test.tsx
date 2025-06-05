import { render, screen, waitFor } from '@testing-library/react';
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

  it('restores the last selected country on blur when display values match', async () => {
    // Both US and CA have +1 code
    const onChange = vi.fn();
    const { rerender } = render(<PhoneNumberPicker {...reqProps} value="US" onChange={onChange} />);

    // Select Canada
    const input = screen.getByTestId('test-id-combobox-input');
    await userEvent.click(input);

    // Find and click Canada option
    const option = await screen.findByText(/\(CA\)/);
    await userEvent.click(option);

    // Update component with Canada selected
    rerender(<PhoneNumberPicker {...reqProps} value="CA" onChange={onChange} />);

    // Now clear and type the same dialing code
    await userEvent.clear(input);
    await userEvent.type(input, '+1');

    // Blur the input
    await userEvent.tab();

    // It should restore the last explicitly selected country (CA)
    expect(onChange).toHaveBeenCalledWith('CA', expect.objectContaining({ value: 'CA' }));
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
