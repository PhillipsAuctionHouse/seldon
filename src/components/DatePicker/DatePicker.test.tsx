import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import DatePicker from './DatePicker';

describe('A DatePicker', () => {
  const reqProps = { labelText: 'My Test Label', id: 'test-id' };

  it('will render a default value if passed', () => {
    const testRef = React.createRef<HTMLInputElement>();
    render(<DatePicker ref={testRef} {...reqProps} defaultValue={['2023-06-01T08:30', '2023-06-05T08:30']} />);
    expect(testRef?.current?.value).toEqual('2023-06-01 to 2023-06-05');
  });

  it('will render with no ref passed in', () => {
    render(<DatePicker {...reqProps} defaultValue={['2023-06-01T08:30', '2023-06-05T08:30']} />);
    expect((screen.getByTestId('test-id') as HTMLInputElement).value).toEqual('2023-06-01 to 2023-06-05');
  });

  it('will update the input with a newly selected date', async () => {
    const mockedOnChange = vi.fn();
    render(
      <DatePicker {...reqProps} onChange={mockedOnChange} defaultValue={['2023-06-01T08:30', '2023-06-05T08:30']} />,
    );
    await userEvent.click(screen.getByTestId('test-id'));
    const seven = await screen.findAllByText('7');
    await userEvent.click(seven[0]);
    const eight = await screen.findAllByText('8');
    await userEvent.click(eight[0]);
    await waitFor(() =>
      expect((screen.getByTestId('test-id') as HTMLInputElement).value).toEqual('2023-06-07 to 2023-06-08'),
    );
    expect(mockedOnChange.mock.calls).toHaveLength(2);
  });

  it('will render a time input if `enableTime` is passed', async () => {
    const { rerender } = render(<DatePicker {...reqProps} />);
    const input = screen.getByTestId('test-id');
    await userEvent.click(input);
    expect(await screen.queryByText('PM')).not.toBeInTheDocument();
    rerender(<DatePicker {...reqProps} enableTime />);
    await userEvent.click(input);
    expect(await screen.findByText('PM')).toBeInTheDocument();
  });

  it('will call onChange callback if input is manually entered', async () => {
    const mockedOnChange = vi.fn();
    render(
      <DatePicker
        {...reqProps}
        onChange={mockedOnChange}
        defaultValue={['2023-06-01T08:30', '2023-06-05T08:30']}
        allowInput
      />,
    );
    const input = screen.getByTestId('test-id');
    await userEvent.click(input);
    await userEvent.type(input, '{backspace}6');
    await waitFor(() => expect((input as HTMLInputElement).value).toEqual('2023-06-01 to 2023-06-06'));
    await userEvent.click(document.body);
    expect(mockedOnChange.mock.calls).toHaveLength(2);
  });

  it('will revert to old value if user input is not a valid date', async () => {
    render(<DatePicker {...reqProps} defaultValue={['2023-06-01T08:30', '2023-06-05T08:30']} allowInput />);
    const input = screen.getByTestId('test-id');
    await userEvent.click(input);
    await userEvent.type(input, '{backspace}adbadfd');
    await userEvent.keyboard('{tab}');
    await waitFor(() => expect((input as HTMLInputElement).value).not.toMatch(/adbadfd/));
  });

  it('will render calendar in another language if correct language string is passed', async () => {
    render(<DatePicker {...reqProps} locale="ru" />);
    const input = screen.getByTestId('test-id');
    await userEvent.click(input);
    expect(screen.getByText('Пн')).toBeInTheDocument();
  });
});

//git commit -m "chore(datepicker): write the rest of the test for date pickr"
