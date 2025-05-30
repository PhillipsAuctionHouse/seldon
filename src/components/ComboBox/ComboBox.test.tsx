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
    const onChange = vi.fn();
    render(<ComboBox {...defaultProps} onChange={onChange} value="apple" />);

    const input = screen.getByTestId('fruit-selector-input');
    expect(input).toHaveValue('Apple');

    const clearButton = screen.getByTestId('fruit-selector-clear-button');
    await userEvent.click(clearButton);

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
});
