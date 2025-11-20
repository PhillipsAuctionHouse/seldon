import { forwardRef, useState } from 'react';
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

  describe('pending state', () => {
    it('uses pending state when value changes', () => {
      const onChange = vi.fn();
      const { rerender } = render(<Pagination {...reqProps} value="Lot 1" options={lotOptions} onChange={onChange} />);

      const select = screen.getByTestId('test-id-select-button') as HTMLSelectElement;
      expect(select.value).toBe('Lot 1');

      rerender(<Pagination {...reqProps} value="Lot 3" options={lotOptions} onChange={onChange} />);

      // Pending state should show the new value immediately
      expect(select.value).toBe('Lot 3');
    });

    it('maintains pending state during slow transitions', async () => {
      const onChange = vi.fn();
      render(<Pagination {...reqProps} value="Lot 1" options={lotOptions} onChange={onChange} />);

      const select = screen.getByTestId('test-id-select-button') as HTMLSelectElement;
      await userEvent.selectOptions(select, 'Lot 3');

      // Pending state should be set
      expect(select.value).toBe('Lot 3');
      expect(onChange).toHaveBeenCalledWith('Lot 3', expect.any(Object));
    });
  });

  describe('edge cases', () => {
    it('handles empty options array', () => {
      render(<Pagination {...reqProps} value="" options={[]} onChange={vi.fn()} />);

      const select = screen.getByTestId('test-id-select-button');
      expect(select).toBeInTheDocument();
    });

    it('handles when prevOption is empty string', async () => {
      const onChange = vi.fn();
      const singleOption = ['Lot 1'];
      render(<Pagination {...reqProps} value="Lot 1" options={singleOption} onChange={onChange} />);

      const prevButton = screen.getByTestId('test-id-previous-button');
      await userEvent.click(prevButton);

      expect(onChange).toHaveBeenCalled();
    });

    it('handles mixed option types', () => {
      const mixedOptions = ['Lot 1', { label: 'Lot 2', value: '2' }, 3];
      render(<Pagination {...reqProps} value="Lot 1" options={mixedOptions} onChange={vi.fn()} />);

      const select = screen.getByTestId('test-id-select-button');
      expect(select).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('disables previous button when isDisabled is true', () => {
      render(<Pagination {...reqProps} value="Lot 2" options={lotOptions} onChange={vi.fn()} isDisabled />);

      const prevButton = screen.getByTestId('test-id-previous-button');
      expect(prevButton).toBeDisabled();
    });

    it('disables next button when isDisabled is true', () => {
      render(<Pagination {...reqProps} value="Lot 2" options={lotOptions} onChange={vi.fn()} isDisabled />);

      const nextButton = screen.getByTestId('test-id-next-button');
      expect(nextButton).toBeDisabled();
    });

    it('disables select when isDisabled is true', () => {
      render(<Pagination {...reqProps} value="Lot 2" options={lotOptions} onChange={vi.fn()} isDisabled />);

      const select = screen.getByTestId('test-id-select-button');
      expect(select).toBeDisabled();
    });
  });

  describe('option rendering', () => {
    it('renders string options correctly', () => {
      render(<Pagination {...reqProps} value="Lot 1" options={lotOptions} onChange={vi.fn()} />);

      const select = screen.getByTestId('test-id-select-button') as HTMLSelectElement;
      const options = Array.from(select.options).map((opt) => opt.text);
      expect(options).toEqual(['Lot 1', 'Lot 2', 'Lot 3', 'Lot 4', 'Lot 5']);
    });

    it('renders number options correctly', () => {
      const numberOptions = [1, 2, 3];
      render(<Pagination {...reqProps} value={1} options={numberOptions} onChange={vi.fn()} />);

      const select = screen.getByTestId('test-id-select-button') as HTMLSelectElement;
      const options = Array.from(select.options).map((opt) => opt.text);
      expect(options).toEqual(['1', '2', '3']);
    });

    it('renders PaginationOption objects correctly', () => {
      const objectOptions = [
        { label: 'First Lot', value: '1' },
        { label: 'Second Lot', value: '2' },
      ];
      render(<Pagination {...reqProps} value="1" options={objectOptions} onChange={vi.fn()} />);

      const select = screen.getByTestId('test-id-select-button') as HTMLSelectElement;
      const options = Array.from(select.options).map((opt) => opt.text);
      expect(options).toEqual(['First Lot', 'Second Lot']);
    });
  });

  describe('navigation behavior', () => {
    it('navigates to previous option when clicking previous button', async () => {
      const onChange = vi.fn();
      render(<Pagination {...reqProps} value="Lot 3" options={lotOptions} onChange={onChange} />);

      const prevButton = screen.getByTestId('test-id-previous-button');
      await userEvent.click(prevButton);

      expect(onChange).toHaveBeenCalledWith('Lot 2', undefined);
    });

    it('navigates to next option when clicking next button', async () => {
      const onChange = vi.fn();
      render(<Pagination {...reqProps} value="Lot 3" options={lotOptions} onChange={onChange} />);

      const nextButton = screen.getByTestId('test-id-next-button');
      await userEvent.click(nextButton);

      expect(onChange).toHaveBeenCalledWith('Lot 4', undefined);
    });

    it('handles navigation in middle of options array', async () => {
      const onChange = vi.fn();
      render(<Pagination {...reqProps} value="Lot 3" options={lotOptions} onChange={onChange} />);

      const prevButton = screen.getByTestId('test-id-previous-button');
      const nextButton = screen.getByTestId('test-id-next-button');

      await userEvent.click(prevButton);
      expect(onChange).toHaveBeenCalledWith('Lot 2', undefined);

      onChange.mockClear();

      await userEvent.click(nextButton);
      expect(onChange).toHaveBeenCalledWith('Lot 3', undefined);
    });
  });

  describe('accessibility', () => {
    it('has correct aria-label for previous button', () => {
      render(
        <Pagination
          {...reqProps}
          value="Lot 2"
          options={lotOptions}
          onChange={vi.fn()}
          previousLabel="Go to previous"
        />,
      );

      expect(screen.getByRole('button', { name: 'Go to previous' })).toBeInTheDocument();
    });

    it('has correct aria-label for next button', () => {
      render(<Pagination {...reqProps} value="Lot 2" options={lotOptions} onChange={vi.fn()} nextLabel="Go to next" />);

      expect(screen.getByRole('button', { name: 'Go to next' })).toBeInTheDocument();
    });

    it('has correct aria-label for select', () => {
      render(
        <Pagination {...reqProps} value="Lot 2" options={lotOptions} onChange={vi.fn()} selectLabel="Choose page" />,
      );

      expect(screen.getByRole('combobox', { name: 'Choose page' })).toBeInTheDocument();
    });
  });
});
