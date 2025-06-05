import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComboBox from './ComboBox';
import { ComboBoxOption } from './types';

describe('ComboBox', () => {
  const mockOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry', filterTerms: ['fruit', 'red'] },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry', displayValue: 'Purple Elderberry' },
  ];

  const defaultProps = {
    id: 'fruit-selector',
    labelText: 'Select a fruit',
    options: mockOptions,
    placeholder: 'Choose a fruit',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<ComboBox {...defaultProps} />);

    expect(screen.getByTestId('fruit-selector-label')).toHaveTextContent('Select a fruit');
    expect(screen.getByTestId('fruit-selector-input')).toBeInTheDocument();
    expect(screen.getByTestId('fruit-selector-dropdown')).toBeInTheDocument();
  });

  it('opens dropdown when clicking the dropdown button', async () => {
    render(<ComboBox {...defaultProps} />);

    const dropdownButton = screen.getByTestId('fruit-selector-dropdown');
    await userEvent.click(dropdownButton);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });
  });

  it('filters options based on input value', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);
    await userEvent.type(input, 'ber');

    await waitFor(() => {
      expect(screen.getByText('Elderberry')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  it('backspace should remove one character at a time', async () => {
    render(<ComboBox {...defaultProps} value="apple" />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);
    await userEvent.type(input, '{backspace}'); // Remove one char
    expect(input).toHaveValue('Appl'); // Should still show partial input
  });

  it('filters options using filterTerms', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);
    await userEvent.type(input, 'red');

    await waitFor(() => {
      expect(screen.getByText('Cherry')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  it('selects an option when clicked', async () => {
    const onChange = vi.fn();
    render(<ComboBox {...defaultProps} onChange={onChange} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText('Apple'));

    expect(onChange).toHaveBeenCalledWith('apple', expect.objectContaining({ value: 'apple', label: 'Apple' }));
    expect(input).toHaveValue('Apple');
  });

  it('displays custom displayValue when option is selected', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Elderberry')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText('Elderberry'));

    expect(input).toHaveValue('Purple Elderberry');
  });

  it('clears the input when clear button is clicked', async () => {
    let value = 'apple';
    const onChange = vi.fn().mockImplementation((newValue) => {
      value = newValue;
    });
    const { rerender } = render(<ComboBox {...defaultProps} onChange={onChange} value={value} />);

    const input = screen.getByTestId('fruit-selector-input');
    expect(input).toHaveValue('Apple');

    const clearButton = screen.getByTestId('fruit-selector-clear-button');
    await userEvent.click(clearButton);

    rerender(<ComboBox {...defaultProps} onChange={onChange} value={value} />);

    await waitFor(() => {
      expect(input).toHaveValue('');
      expect(onChange).toHaveBeenCalledWith('', null);
    });
  });

  it('works in controlled mode', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ComboBox {...defaultProps} value="apple" onChange={onChange} />);

    const input = screen.getByTestId('fruit-selector-input');
    expect(input).toHaveValue('Apple');

    // Simulate controlled update
    rerender(<ComboBox {...defaultProps} value="banana" onChange={onChange} />);

    expect(input).toHaveValue('Banana');
  });

  it('controlled mode: if selected option then type a new filter but tab out it should reset', async () => {
    const onChange = vi.fn();
    render(<ComboBox {...defaultProps} value="apple" onChange={onChange} />);

    const input = screen.getByTestId('fruit-selector-input');
    expect(input).toHaveValue('Apple');

    // Simulate typing a new filter
    await userEvent.type(input, 'red');

    // Simulate leaving the input
    await userEvent.tab();

    // Check that the input value has reset
    expect(input).toHaveValue('Apple');
  });

  it('controlled mode: if selected option then type a new filter but do not select and press Escape, it should reset', async () => {
    const onChange = vi.fn();
    render(<ComboBox {...defaultProps} value="apple" onChange={onChange} />);

    const input = screen.getByTestId('fruit-selector-input');
    expect(input).toHaveValue('Apple');

    // Simulate typing a new filter
    await userEvent.type(input, 'red');

    // Press Escape
    await userEvent.type(input, '{escape}');

    // Check that the input value has reset
    expect(input).toHaveValue('Apple');
  });

  it('controlled mode: if selected option then type a new filter but do not select but click outside it should reset', async () => {
    const onChange = vi.fn();
    render(<ComboBox {...defaultProps} value="apple" onChange={onChange} />);

    const input = screen.getByTestId('fruit-selector-input');
    expect(input).toHaveValue('Apple');

    // Simulate typing a new filter
    await userEvent.type(input, 'red');

    // Click outside
    await userEvent.click(document.body);

    // Check that the input value has reset
    expect(input).toHaveValue('Apple');
  });

  it('shows invalid state when specified', () => {
    render(<ComboBox {...defaultProps} invalid={true} invalidText="Please select a valid fruit" />);

    expect(screen.getByText('Please select a valid fruit')).toBeInTheDocument();
    expect(screen.getByTestId('fruit-selector-label')).toHaveClass('seldon-combo-box__label--invalid');
  });

  it('handles keyboard navigation', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    // Press down arrow to open dropdown
    await userEvent.type(input, '{arrowdown}');

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    // Press escape to close dropdown
    await userEvent.type(input, '{escape}');

    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  it('allows custom option rendering', async () => {
    const renderOption = (option: ComboBoxOption) => (
      <div data-testid={`custom-option-${option.value}`}>Custom: {option.label}</div>
    );

    render(<ComboBox {...defaultProps} renderOption={renderOption} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    await waitFor(() => {
      expect(screen.getByTestId('custom-option-apple')).toBeInTheDocument();
      expect(screen.getByText('Custom: Apple')).toBeInTheDocument();
    });
  });

  it('shows no options message when no matches found', async () => {
    render(<ComboBox {...defaultProps} noOptionsMessage="No fruits found" />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);
    await userEvent.type(input, 'xyz');

    await waitFor(() => {
      expect(screen.getByText('No fruits found')).toBeInTheDocument();
    });
  });

  it('toggles dropdown when clicking the dropdown button multiple times', async () => {
    render(<ComboBox {...defaultProps} />);

    const dropdownButton = screen.getByTestId('fruit-selector-dropdown');

    // First click - open
    await userEvent.click(dropdownButton);
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    // Second click - close
    await userEvent.click(dropdownButton);
    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    // Third click - open again
    await userEvent.click(dropdownButton);
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });
  });
  it('selects exact match on outside click', async () => {
    const onChange = vi.fn();
    render(<ComboBox {...defaultProps} onChange={onChange} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);
    await userEvent.type(input, 'Apple');

    // Click outside (should select the exact match)
    await userEvent.click(document.body);

    expect(onChange).toHaveBeenCalledWith('apple', expect.objectContaining({ value: 'apple' }));
  });
  it('selects option on Enter key when there is exactly one match', async () => {
    const onChange = vi.fn();
    render(<ComboBox {...defaultProps} onChange={onChange} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);
    await userEvent.type(input, 'ban');

    // Press Enter (should select Banana as it's the only match)
    await userEvent.type(input, '{enter}');

    expect(onChange).toHaveBeenCalledWith('banana', expect.objectContaining({ value: 'banana' }));
    expect(input).toHaveValue('Banana');
  });
  it('opens dropdown when clicking input with filtered options', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');

    // Type to filter options
    await userEvent.type(input, 'a');

    // Click outside to close dropdown
    await userEvent.click(document.body);

    // Wait for dropdown to close
    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    // Click input again
    await userEvent.click(input);

    // Verify dropdown opens with filtered options
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
    });
  });
  it('does not open dropdown when no options match', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');

    // Type something that doesn't match any option
    await userEvent.type(input, 'zzzzzz');

    // Try to open dropdown by clicking input
    await userEvent.click(input);

    // Verify dropdown shows "no options" message instead of options
    await waitFor(() => {
      expect(screen.getByText('No Options.')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });
});
