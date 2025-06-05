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
  it('handles typing in the input correctly', async () => {
    const onChange = vi.fn();
    render(<ComboBox {...defaultProps} onChange={onChange} />);

    const input = screen.getByTestId('fruit-selector-input');

    // Type in the input
    await userEvent.type(input, 'App');

    // Input should show what was typed
    expect(input).toHaveValue('App');

    // Type more to complete the word
    await userEvent.type(input, 'le');

    // Input should show the complete word
    expect(input).toHaveValue('Apple');

    // Press Enter to select the option
    await userEvent.type(input, '{enter}');

    // Verify selection was made
    expect(onChange).toHaveBeenCalledWith('apple', expect.objectContaining({ value: 'apple' }));
  });

  it('does not clear input when autoClearInput is false', async () => {
    render(<ComboBox {...defaultProps} autoClearInput={false} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);
    await userEvent.type(input, 'No match');

    // Click outside
    await userEvent.click(document.body);

    // Input should still contain what was typed
    expect(input).toHaveValue('No match');
  });

  it('filters correctly while typing even without inputValue prop', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    // Type to filter
    await userEvent.type(input, 'Eld');

    // Dropdown should show filtered options
    await waitFor(() => {
      expect(screen.getByText('Elderberry')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    // Click the option
    await userEvent.click(screen.getByText('Elderberry'));

    // Input should show displayValue of selected option
    expect(input).toHaveValue('Purple Elderberry');
  });

  it('maintains focus when typing character by character', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');

    // Initial focus
    await userEvent.click(input);
    expect(document.activeElement).toBe(input);

    // Type one character at a time with small delays to simulate real typing
    await userEvent.type(input, 'A', { delay: 50 });
    expect(document.activeElement).toBe(input);
    expect(input).toHaveValue('A');

    await userEvent.type(input, 'p', { delay: 50 });
    expect(document.activeElement).toBe(input);
    expect(input).toHaveValue('Ap');

    await userEvent.type(input, 'p', { delay: 50 });
    expect(document.activeElement).toBe(input);
    expect(input).toHaveValue('App');

    await userEvent.type(input, 'l', { delay: 50 });
    expect(document.activeElement).toBe(input);
    expect(input).toHaveValue('Appl');

    await userEvent.type(input, 'e', { delay: 50 });
    expect(document.activeElement).toBe(input);
    expect(input).toHaveValue('Apple');

    // Verify dropdown shows filtered options during typing
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    // Check we can still interact with dropdown after typing
    await userEvent.click(screen.getByText('Apple'));

    // Verify selection works after character-by-character typing
    await waitFor(() => {
      expect(input).toHaveValue('Apple');
    });
  });

  it('focuses the input on initial click', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    expect(document.activeElement).toBe(input);
  });

  it('maintains focus on input after clearing via clear button', async () => {
    render(<ComboBox {...defaultProps} value="apple" />);

    // First verify the input has the selected value
    const input = screen.getByTestId('fruit-selector-input');
    expect(input).toHaveValue('Apple');

    // Click the clear button
    const clearButton = screen.getByTestId('fruit-selector-clear-button');
    await userEvent.click(clearButton);

    // Input should be cleared and still have focus
    expect(input).toHaveValue('');
    expect(document.activeElement).toBe(input);
  });

  it('maintains focus after selection is made', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    // Open dropdown
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    // Select an option
    await userEvent.click(screen.getByText('Banana'));

    // Input should have the selected value and retain focus
    expect(input).toHaveValue('Banana');
    expect(document.activeElement).toBe(input);
  });

  it('loses focus when clicking outside', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    // Verify input has focus
    expect(document.activeElement).toBe(input);

    // Click outside
    await userEvent.click(document.body);

    // Input should no longer have focus
    expect(document.activeElement).not.toBe(input);
  });

  it('focuses back on the input when clicking dropdown button', async () => {
    render(<ComboBox {...defaultProps} />);

    // Click dropdown button
    const dropdownButton = screen.getByTestId('fruit-selector-dropdown');
    await userEvent.click(dropdownButton);

    // Input should have focus
    const input = screen.getByTestId('fruit-selector-input');

    await waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  it('opens dropdown when clicking the input', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(<ComboBox {...defaultProps} />);

    // Open dropdown
    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    // Verify dropdown is open
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    // Click outside
    await userEvent.click(document.body);

    // Verify dropdown is closed
    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  it('reopens dropdown after typing to filter with exactly one match', async () => {
    render(<ComboBox {...defaultProps} />);

    const input = screen.getByTestId('fruit-selector-input');
    await userEvent.click(input);

    // Close dropdown
    await userEvent.keyboard('{Escape}');

    // Type something that matches exactly one option
    await userEvent.type(input, 'ban');

    // Verify dropdown reopens with just that option
    await waitFor(() => {
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    // Press Enter to select
    await userEvent.keyboard('{Enter}');

    // Verify option selected
    expect(input).toHaveValue('Banana');
  });
});
