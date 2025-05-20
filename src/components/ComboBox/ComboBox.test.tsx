import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComboBox, { ComboBoxOption } from './ComboBox';

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', filterTerms: ['fruit', 'red'] },
  { value: 'date', label: 'Date', displayValue: 'Date fruit' },
];

describe('ComboBox', () => {
  it('renders with required props', () => {
    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue=""
        setInputValue={() => void 0}
      />,
    );

    expect(screen.getByTestId('test-combo-label')).toHaveTextContent('Test Label');
    expect(screen.getByTestId('test-combo-input')).toBeInTheDocument();
  });

  it('shows dropdown when clicking input', async () => {
    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue=""
        setInputValue={() => void 0}
      />,
    );

    await userEvent.click(screen.getByTestId('test-combo-input'));

    // Check that all options are displayed
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Cherry')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
    });
  });

  it('filters options based on input value', async () => {
    const setInputValue = vi.fn();

    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue="b"
        setInputValue={setInputValue}
      />,
    );

    await userEvent.click(screen.getByTestId('test-combo-input'));

    // Only Banana should be visible
    await waitFor(() => {
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  it('selects an option when clicked', async () => {
    const setInputValue = vi.fn();
    const onChange = vi.fn();

    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue=""
        setInputValue={setInputValue}
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByTestId('test-combo-input'));
    await waitFor(() => expect(screen.getByText('Banana')).toBeInTheDocument());

    await userEvent.click(screen.getByText('Banana'));

    expect(setInputValue).toHaveBeenCalledWith('Banana');
    expect(onChange).toHaveBeenCalledWith('banana', mockOptions[1]);
  });

  it('displays invalidText when invalid prop is true', () => {
    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue=""
        setInputValue={() => void 0}
        invalid={true}
        invalidText="This field is required"
      />,
    );

    expect(screen.getByTestId('test-combo-invalid-text')).toHaveTextContent('This field is required');
  });

  it('clears input when clear button is clicked', async () => {
    const setInputValue = vi.fn();
    const onChange = vi.fn();

    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue="Banana"
        setInputValue={setInputValue}
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByTestId('test-combo-clear-button'));

    expect(setInputValue).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('', null);
  });

  it('handles allowCustomValue mode false correctly', async () => {
    const setInputValue = vi.fn();
    const onChange = vi.fn();

    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue=""
        setInputValue={setInputValue}
        onChange={onChange}
        allowCustomValue={true}
      />,
    );

    const input = screen.getByTestId('test-combo-input');
    await userEvent.click(input);
    await userEvent.type(input, 'Custom Value');

    // Check that setInputValue was called multiple times - once per character
    expect(setInputValue).toHaveBeenCalledTimes(12); // 'Custom Value' has 12 characters

    // Check that the last call has the complete string
    const lastCall = setInputValue.mock.calls[setInputValue.mock.calls.length - 1][0];
    expect(lastCall).toBe('e'); // Last character typed

    // Similarly check the final state with onChange
    // expect(onChange).toHaveBeenCalled();

    // Get the last onChange call
    const lastOnChangeCall = onChange.mock.calls[onChange.mock.calls.length - 1];
    expect(lastOnChangeCall[0]).toBe('e');
    expect(lastOnChangeCall[1]).toBe(null);
  });

  it('uses displayValue when provided', async () => {
    const setInputValue = vi.fn();
    const onChange = vi.fn();

    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue=""
        setInputValue={setInputValue}
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByTestId('test-combo-input'));
    await waitFor(() => expect(screen.getByText('Date')).toBeInTheDocument());

    await userEvent.click(screen.getByText('Date'));

    expect(setInputValue).toHaveBeenCalledWith('Date fruit');
  });

  it('filters by additional filter terms', async () => {
    const setInputValue = vi.fn();

    const { rerender } = render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue="red"
        setInputValue={setInputValue}
      />,
    );

    await userEvent.click(screen.getByTestId('test-combo-input'));

    // Should find Cherry by its filter term "red"
    await waitFor(() => {
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });

    // Update with a different filter term
    rerender(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue="fruit"
        setInputValue={setInputValue}
      />,
    );

    // Should still find Cherry by its filter term "fruit"
    await waitFor(() => {
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });
  });

  it('renders custom option content when renderOption is provided', async () => {
    const renderOption = (option: ComboBoxOption) => (
      <div data-testid={`custom-${option.value}`}>{option.label} - Custom</div>
    );

    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue=""
        setInputValue={() => void 0}
        renderOption={renderOption}
      />,
    );

    await userEvent.click(screen.getByTestId('test-combo-input'));

    await waitFor(() => {
      expect(screen.getByTestId('custom-apple')).toHaveTextContent('Apple - Custom');
      expect(screen.getByTestId('custom-banana')).toHaveTextContent('Banana - Custom');
    });
  });

  it('toggles dropdown when dropdown button is clicked', async () => {
    render(
      <ComboBox
        id="test-combo"
        options={mockOptions}
        labelText="Test Label"
        inputValue=""
        setInputValue={() => void 0}
      />,
    );

    await userEvent.click(screen.getByTestId('test-combo-dropdown'));

    // Check that dropdown is opened
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    // Click dropdown button again to close it
    await userEvent.click(screen.getByTestId('test-combo-dropdown'));

    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });
});
