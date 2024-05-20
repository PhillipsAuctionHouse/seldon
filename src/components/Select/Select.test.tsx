import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import Select from './Select';

describe('A Select', () => {
  const reqProps = { labelText: 'My Test Label', id: 'test-id' };

  it('will render a default value if passed', () => {
    const testRef = React.createRef<HTMLSelectElement>();
    render(
      <Select ref={testRef} {...reqProps} defaultValue="option two">
        <option>option one</option>
        <option>option two</option>
      </Select>,
    );
    expect(testRef?.current?.value).toEqual('option two');
  });

  it('will not be interactive if disabled or readonly', async () => {
    const testRef = React.createRef<HTMLSelectElement>();
    const mockedOnClick = vi.fn();
    const mockedOnChange = vi.fn();
    const { rerender } = render(
      <Select ref={testRef} {...reqProps} defaultValue="option two" onChange={mockedOnChange} onClick={mockedOnClick}>
        <option>option one</option>
        <option>option two</option>
      </Select>,
    );

    userEvent.selectOptions(screen.getByTestId('test-id'), ['option one']);
    await waitFor(() => expect(mockedOnClick.mock.calls).toHaveLength(2));
    await waitFor(() => expect(mockedOnChange.mock.calls).toHaveLength(1));
    expect(testRef?.current?.value).toEqual('option one');
    vi.clearAllMocks();

    rerender(
      <Select ref={testRef} {...reqProps} defaultValue="option two" onClick={mockedOnClick} disabled>
        <option>option one</option>
        <option>option two</option>
      </Select>,
    );
    userEvent.selectOptions(screen.getByTestId('test-id'), ['option one']);
    await waitFor(() => expect(mockedOnClick.mock.calls).toHaveLength(0));
    await waitFor(() => expect(mockedOnChange.mock.calls).toHaveLength(0));

    rerender(
      <Select ref={testRef} {...reqProps} defaultValue="option two" onClick={mockedOnClick} readOnly>
        <option>option one</option>
        <option>option two</option>
      </Select>,
    );
    userEvent.selectOptions(screen.getByTestId('test-id'), ['option one']);
    await waitFor(() => expect(mockedOnClick.mock.calls).toHaveLength(0));
    await waitFor(() => expect(mockedOnChange.mock.calls).toHaveLength(0));
  });
});
