import { useState } from 'react';
import { render, screen, waitFor, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import Pagination from './Pagination';

const useMockState = (value: string) => {
  const [mockState, setMockState] = useState(value);
  return {
    mockState,
    setMockState,
  };
};

describe('A Pagination', () => {
  runCommonTests(Pagination, 'Pagination');

  const reqProps = { id: 'test-id' };
  const lotOptions = ['Lot 1', 'Lot 2', 'Lot 3', 'Lot 4', 'Lot 5'];

  it('will render a value if passed', () => {
    render(<Pagination {...reqProps} value="Lot 2" options={lotOptions} onChange={vi.fn()}></Pagination>);
    const selectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
    expect(selectValue).toEqual('Lot 2');
  });

  it('will not be interactive if isDisabled', async () => {
    const mockedOnChange = vi.fn();
    const { rerender } = render(
      <Pagination {...reqProps} value="Lot 1" options={lotOptions} onChange={mockedOnChange}></Pagination>,
    );

    await userEvent.selectOptions(screen.getByTestId('test-id-select-button'), ['Lot 1']);
    await waitFor(() => expect(mockedOnChange.mock.calls).toHaveLength(1));

    vi.clearAllMocks();

    rerender(
      <Pagination
        {...reqProps}
        onChange={mockedOnChange}
        value="Lot 1"
        options={lotOptions}
        isDisabled={true}
      ></Pagination>,
    );
    const selectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
    expect(selectValue).toEqual('Lot 1');
    await waitFor(() => expect(mockedOnChange.mock.calls).toHaveLength(0));
  });

  it('will cycle to last elment if user clicks Previous button on first element', async () => {
    const { result } = renderHook(() => useMockState('Lot 1'));
    const { mockState, setMockState } = result.current;
    render(<Pagination {...reqProps} value={mockState} options={lotOptions} onChange={setMockState}></Pagination>);
    await userEvent.click(screen.getByTestId('test-id-previous-button'));
    expect(result.current.mockState).toEqual('Lot 5');
  });

  it('will cycle to first elment if user clicks Next button on last element', async () => {
    const { result } = renderHook(() => useMockState('Lot 5'));
    const { mockState, setMockState } = result.current;
    render(<Pagination {...reqProps} value={mockState} options={lotOptions} onChange={setMockState}></Pagination>);
    await userEvent.click(screen.getByTestId('test-id-next-button'));
    expect(result.current.mockState).toEqual('Lot 1');
  });

  it('will trigger onChange if the user selects new option on dropdown, Previous button and, or Next button', async () => {
    const { result } = renderHook(() => useMockState('Lot 2'));
    const { mockState, setMockState } = result.current;
    render(<Pagination {...reqProps} value={mockState} options={lotOptions} onChange={setMockState}></Pagination>);
    await userEvent.click(screen.getByTestId('test-id-previous-button'));
    await userEvent.selectOptions(screen.getByTestId('test-id-select-button'), ['Lot 3']);
    expect(result.current.mockState).toEqual('Lot 3');
  });
});
