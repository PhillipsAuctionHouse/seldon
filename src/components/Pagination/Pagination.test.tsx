import { act, forwardRef, useState } from 'react';
import { render, screen, waitFor, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import Pagination, { PaginationOptionValue } from './Pagination';

const useMockState = (value: PaginationOptionValue) => {
  const [mockState, setMockState] = useState(value);
  return {
    mockState,
    setMockState,
  };
};

describe('A Pagination', () => {
  // Use a forwardRef wrapper for runCommonTests to ensure ref is tested correctly
  const RefPagination = forwardRef<HTMLDivElement, React.ComponentProps<typeof Pagination>>((props, ref) => (
    <Pagination {...props} ref={ref} />
  ));
  RefPagination.displayName = 'RefPagination';
  runCommonTests(RefPagination, 'Pagination');

  const reqProps = { id: 'test-id' };
  const lotOptions = ['Lot 1', 'Lot 2', 'Lot 3', 'Lot 4', 'Lot 5'];

  describe('string options', () => {
    it('will render a value if passed', () => {
      render(<Pagination {...reqProps} value="Lot 2" options={lotOptions} onChange={vi.fn()}></Pagination>);
      const selectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
      expect(selectValue).toEqual('Lot 2');
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

  describe('number options', () => {
    const lotOptionsNumbers = [1, 2, 3, 4, 5];
    it('will render a value if passed', () => {
      render(<Pagination {...reqProps} value={2} options={lotOptionsNumbers} onChange={vi.fn()}></Pagination>);
      const selectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
      expect(selectValue).toEqual('2');
    });

    it('will cycle to last elment if user clicks Previous button on first element', async () => {
      const { result } = renderHook(() => useMockState(1));
      const { mockState, setMockState } = result.current;
      render(
        <Pagination {...reqProps} value={mockState} options={lotOptionsNumbers} onChange={setMockState}></Pagination>,
      );
      await userEvent.click(screen.getByTestId('test-id-previous-button'));
      expect(result.current.mockState).toEqual(5);
    });

    it('will cycle to first elment if user clicks Next button on last element', async () => {
      const { result } = renderHook(() => useMockState(5));
      const { mockState, setMockState } = result.current;
      render(
        <Pagination {...reqProps} value={mockState} options={lotOptionsNumbers} onChange={setMockState}></Pagination>,
      );
      await userEvent.click(screen.getByTestId('test-id-next-button'));
      expect(result.current.mockState).toEqual(1);
    });

    it('will trigger onChange if the user selects new option on dropdown, Previous button and, or Next button', async () => {
      const { result } = renderHook(() => useMockState(2));
      const { mockState, setMockState } = result.current;
      render(
        <Pagination {...reqProps} value={mockState} options={lotOptionsNumbers} onChange={setMockState}></Pagination>,
      );
      await userEvent.click(screen.getByTestId('test-id-previous-button'));
      await userEvent.selectOptions(screen.getByTestId('test-id-select-button'), ['3']);
      expect(result.current.mockState).toEqual(3);
    });
  });

  describe('PaginationOption options', () => {
    const lotOptionsObjects = [
      { label: 'Lot 1', value: '1' },
      { label: 'Lot 2', value: '2' },
      { label: 'Lot 3', value: '3' },
      { label: 'Lot 4', value: '4' },
      { label: 'Lot 5', value: '5' },
    ];

    it('will render a value if passed', () => {
      render(<Pagination {...reqProps} value="2" options={lotOptionsObjects} onChange={vi.fn()}></Pagination>);
      const selectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
      expect(selectValue).toEqual('2');
    });

    it('will cycle to last element if user clicks Previous button on first element', async () => {
      const { result } = renderHook(() => useMockState('1'));
      const { mockState, setMockState } = result.current;
      render(
        <Pagination {...reqProps} value={mockState} options={lotOptionsObjects} onChange={setMockState}></Pagination>,
      );
      await userEvent.click(screen.getByTestId('test-id-previous-button'));
      expect(result.current.mockState).toEqual('5');
    });

    it('will cycle to first element if user clicks Next button on last element', async () => {
      const { result } = renderHook(() => useMockState('5'));
      const { mockState, setMockState } = result.current;
      render(
        <Pagination {...reqProps} value={mockState} options={lotOptionsObjects} onChange={setMockState}></Pagination>,
      );
      await userEvent.click(screen.getByTestId('test-id-next-button'));
      expect(result.current.mockState).toEqual('1');
    });

    it('will trigger onChange if the user selects new option on dropdown, Previous button and, or Next button', async () => {
      const { result } = renderHook(() => useMockState('2'));
      const { mockState, setMockState } = result.current;
      render(
        <Pagination {...reqProps} value={mockState} options={lotOptionsObjects} onChange={setMockState}></Pagination>,
      );
      await userEvent.click(screen.getByTestId('test-id-previous-button'));
      await userEvent.selectOptions(screen.getByTestId('test-id-select-button'), ['3']);
      expect(result.current.mockState).toEqual('3');
    });
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

  it('renders translated text', () => {
    render(
      <Pagination
        {...reqProps}
        value="Lot 2"
        options={lotOptions}
        onChange={vi.fn()}
        previousLabel="Prev Lot"
        nextLabel="Next Lot"
        selectLabel="Select Lot"
      />,
    );
    expect(screen.getByRole('button', { name: 'Prev Lot' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next Lot' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Select Lot' })).toBeInTheDocument();
  });
});

describe('Pagination edge cases and coverage gaps', () => {
  const reqProps = { id: 'test-id' };

  it('renders with empty options array', () => {
    render(<Pagination {...reqProps} value="" options={[]} onChange={vi.fn()} />);
    expect(screen.getByTestId('test-id-select-button')).toBeInTheDocument();
  });

  it('calls preventDefault on previous button if prevOption has href', () => {
    const lotOptionsObjects = [
      { label: 'Lot 1', value: '1', href: '#' },
      { label: 'Lot 2', value: '2' },
      { label: 'Lot 3', value: '3' },
    ];
    const mockedOnChange = vi.fn();
    render(<Pagination {...reqProps} value="2" options={lotOptionsObjects} onChange={mockedOnChange} />);
    const prevButton = screen.getByLabelText('Previous');

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.preventDefault = vi.fn();
    act(() => {
      prevButton.dispatchEvent(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockedOnChange).toHaveBeenCalled();
  });

  it('calls preventDefault on next button if nextOption has href', () => {
    const lotOptionsObjects = [
      { label: 'Lot 1', value: '1' },
      { label: 'Lot 2', value: '2' },
      { label: 'Lot 3', value: '3', href: '#' },
    ];
    const mockedOnChange = vi.fn();
    render(<Pagination {...reqProps} value="2" options={lotOptionsObjects} onChange={mockedOnChange} />);
    const nextButton = screen.getByLabelText('Next');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.preventDefault = vi.fn();
    act(() => {
      nextButton.dispatchEvent(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockedOnChange).toHaveBeenCalled();
  });

  it('passes prefetch prop to IconButton if present', () => {
    const lotOptionsObjects = [
      { label: 'Lot 1', value: '1', prefetch: 'intent' } as const,
      { label: 'Lot 2', value: '2' },
      { label: 'Lot 3', value: '3' },
    ];
    render(<Pagination {...reqProps} value="2" options={lotOptionsObjects} onChange={vi.fn()} />);
    const prevButton = screen.getByTestId('test-id-previous-button');
    expect(prevButton).toBeInTheDocument();
  });

  it('renders with custom className and baseClassName', () => {
    render(
      <Pagination
        {...reqProps}
        value="Lot 1"
        options={['Lot 1', 'Lot 2']}
        onChange={vi.fn()}
        className="custom-class"
        data-testid="pagination-div"
      />,
    );
    expect(screen.getByTestId('pagination-div')).toHaveClass('custom-class');
  });

  it('renders with variant other than inline', () => {
    render(
      <Pagination {...reqProps} value="Lot 1" options={['Lot 1', 'Lot 2']} onChange={vi.fn()} variant={undefined} />,
    );
    expect(screen.getByTestId('test-id-select-button')).toBeInTheDocument();
  });

  // Instead, you can directly fire a change event with an undefined value to mimic the edge case.
  it('Select onChange does nothing if selectedOption is undefined', () => {
    const mockedOnChange = vi.fn().mockImplementation((e) => {
      console.log(e);
    });
    vi.spyOn(console, 'error').mockImplementation(() => void 0);
    render(<Pagination {...reqProps} value="Lot 1" options={['Lot 1', 'Lot 2']} onChange={mockedOnChange} />);
    const select: HTMLSelectElement = screen.getByTestId('test-id-select-button');
    act(() => {
      // @ts-expect-error sorry, ts. it'll just be undefined for a sec
      select.value = undefined;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(mockedOnChange).not.toHaveBeenCalled();
  });
});
