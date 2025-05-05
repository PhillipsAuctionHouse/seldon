import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { runCommonTests } from '../../utils/testUtils';
import PhoneNumberPicker, { PhoneNumberPickerProps } from './PhoneNumberPicker';

describe('PhoneNumberPicker', () => {
  runCommonTests(PhoneNumberPicker, 'PhoneNumberPicker');
  const reqProps = { labelText: 'Test Phone Number', id: 'test-id', setInputValue: () => vitest.fn(), inputValue: '' };

  it('should be able to select country with country code and only called with country code value', async () => {
    const mockSetInputValue = vi.fn();
    render(<PhoneNumberPicker {...{ ...reqProps, setInputValue: mockSetInputValue }} />);
    const trigger = screen.getAllByTestId('test-id-combobox-dropdown')[0];

    expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    const option = screen.getByText('AC +247');
    expect(option).toBeInTheDocument();
    await userEvent.click(option);

    expect(mockSetInputValue).toHaveBeenCalledWith('+247');
    expect(mockSetInputValue).toHaveBeenCalledTimes(1);
  });

  it('should be able to select an option from the dropdown by keyboard navigation', async () => {
    const mockSetInputValue = vi.fn();
    render(<PhoneNumberPicker {...{ ...reqProps, setInputValue: mockSetInputValue }} />);
    const trigger = screen.getAllByTestId('test-id-combobox-dropdown')[0];

    await userEvent.click(trigger);

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    expect(mockSetInputValue).toHaveBeenCalledWith('+93');
    expect(mockSetInputValue).toHaveBeenCalledTimes(1);
  });

  it('should be able to select an option from only country code typed in', async () => {
    const PhoneNumberPickerWrapper = (props: PhoneNumberPickerProps) => {
      const [inputValue, setInputValue] = useState('');
      return <PhoneNumberPicker {...props} inputValue={inputValue} setInputValue={setInputValue} />;
    };
    render(
      <PhoneNumberPickerWrapper labelText="Test Label" id="test-id" inputValue="" setInputValue={() => undefined} />,
    );

    const input = screen.getByTestId('test-id-combobox-input');
    await userEvent.type(input, '+1');
    await userEvent.keyboard('{Enter}');

    expect(input).toHaveValue('+1');
  });
});
