import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComboBox from './ComboBox';
import { ComboBoxOption } from './types';

const mockOptions: ComboBoxOption[] = [
  { value: 'brainfuck', label: 'Brainfuck' },
  { value: 'befunge', label: 'Befunge' },
  { value: 'whitespace', label: 'Whitespace', filterTerms: ['space', 'minimal'] },
  { value: 'malbolge', label: 'Malbolge' },
  { value: 'intercal', label: 'INTERCAL', displayValue: 'INTERCAL (Compiler Language)' },
];

const sharedProps = {
  id: 'esolang-selector',
  labelText: 'Select an esolang',
  options: mockOptions,
  placeholder: 'Choose an esolang',
};

describe('ComboBox', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering & Trigger', () => {
    it('renders with default props', () => {
      render(<ComboBox {...sharedProps} />);
      expect(screen.getByTestId('esolang-selector-label')).toHaveTextContent('Select an esolang');
      expect(screen.getByTestId('esolang-selector-input')).toBeInTheDocument();
      expect(screen.getByTestId('esolang-selector-dropdown')).toBeInTheDocument();
    });

    it.each(mockOptions.map((o) => ({ value: o.value, expectedLabel: o.displayValue || o.label })))(
      'shows selected value "$expectedLabel" in input',
      ({ value, expectedLabel }) => {
        render(<ComboBox {...sharedProps} value={value} />);
        const input = screen.getByTestId('esolang-selector-input');
        expect(input).toHaveValue(expectedLabel);
      },
    );

    it('shows invalid state when specified', () => {
      render(<ComboBox {...sharedProps} invalid={true} invalidText="Please select a valid esolang" />);
      expect(screen.getByText('Please select a valid esolang')).toBeInTheDocument();
      expect(screen.getByTestId('esolang-selector-label')).toHaveClass('seldon-combo-box__label--invalid');
    });
  });

  describe('Dropdown opening & closing', () => {
    it('opens dropdown when clicking the dropdown button', async () => {
      render(<ComboBox {...sharedProps} />);
      const dropdownButton = screen.getByTestId('esolang-selector-dropdown');
      await userEvent.click(dropdownButton);
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
        expect(screen.getByText('Befunge')).toBeInTheDocument();
      });
    });

    it('opens dropdown when clicking the input', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
        expect(screen.getByText('Befunge')).toBeInTheDocument();
      });
    });

    it('closes dropdown when clicking outside', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
      });
      await userEvent.click(document.body);
      await waitFor(() => {
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
    });

    it('toggles dropdown when clicking the dropdown button multiple times', async () => {
      render(<ComboBox {...sharedProps} />);
      const dropdownButton = screen.getByTestId('esolang-selector-dropdown');
      await userEvent.click(dropdownButton);
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
      });
      await userEvent.click(dropdownButton);
      await waitFor(() => {
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
      await userEvent.click(dropdownButton);
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
      });
    });

    it('focuses back on the input when clicking dropdown button', async () => {
      render(<ComboBox {...sharedProps} />);
      const dropdownButton = screen.getByTestId('esolang-selector-dropdown');
      await userEvent.click(dropdownButton);
      const input = screen.getByTestId('esolang-selector-input');
      await waitFor(() => {
        expect(document.activeElement).toBe(input);
      });
    });
  });

  describe('Filtering', () => {
    it('filters options based on input value', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'cal');
      await waitFor(() => {
        expect(screen.getByText('INTERCAL')).toBeInTheDocument();
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
    });

    it('filters options using filterTerms', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'minimal');
      await waitFor(() => {
        expect(screen.getByText('Whitespace')).toBeInTheDocument();
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
    });

    it('filters correctly while typing even without inputValue prop', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'INTER');
      await waitFor(() => {
        expect(screen.getByText('INTERCAL')).toBeInTheDocument();
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
      await userEvent.click(screen.getByText('INTERCAL'));
      expect(input).toHaveValue('INTERCAL (Compiler Language)');
    });

    it('does not open dropdown when no options match', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.type(input, 'zzzzzz');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByText('No Options.')).toBeInTheDocument();
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
    });

    it('shows no options message when no matches found', async () => {
      render(<ComboBox {...sharedProps} noOptionsMessage="No esolangs found" />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'xyz');
      await waitFor(() => {
        expect(screen.getByText('No esolangs found')).toBeInTheDocument();
      });
    });

    it('uses default no options message when prop not provided', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'xyz');
      await waitFor(() => {
        expect(screen.getByText('No Options.')).toBeInTheDocument();
      });
    });

    it('if input value matches selected option display all', async () => {
      render(<ComboBox {...sharedProps} value="brainfuck" />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        mockOptions.forEach((option) => {
          if (!option.label)
            throw new Error(
              `Option label is required for this test, found none on this object: ${JSON.stringify(option, null, 2)}`,
            );
          expect(screen.getByText(option.label)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Selection & Value', () => {
    it('selects an option when clicked', async () => {
      const onChange = vi.fn();
      render(<ComboBox {...sharedProps} onChange={onChange} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
      });
      await userEvent.click(screen.getByText('Brainfuck'));
      expect(onChange).toHaveBeenCalledWith(
        'brainfuck',
        expect.objectContaining({ value: 'brainfuck', label: 'Brainfuck' }),
      );
      expect(input).toHaveValue('Brainfuck');
    });

    it('displays custom displayValue when option is selected', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByText('INTERCAL')).toBeInTheDocument();
      });
      await userEvent.click(screen.getByText('INTERCAL'));
      expect(input).toHaveValue('INTERCAL (Compiler Language)');
    });

    it('selects exact match on outside click', async () => {
      const onChange = vi.fn();
      render(<ComboBox {...sharedProps} onChange={onChange} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'Brainfuck');
      await userEvent.click(document.body);
      expect(onChange).toHaveBeenCalledWith('brainfuck', expect.objectContaining({ value: 'brainfuck' }));
    });

    it('selects option on Enter key when there is exactly one match', async () => {
      const onChange = vi.fn();
      render(<ComboBox {...sharedProps} onChange={onChange} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'bef');
      await userEvent.type(input, '{enter}');
      expect(onChange).toHaveBeenCalledWith('befunge', expect.objectContaining({ value: 'befunge' }));
      expect(input).toHaveValue('Befunge');
    });

    it('clears the input when clear button is clicked', async () => {
      let value = 'brainfuck';
      const onChange = vi.fn().mockImplementation((newValue) => {
        value = newValue;
      });
      const { rerender } = render(<ComboBox {...sharedProps} onChange={onChange} value={value} />);
      const input = screen.getByTestId('esolang-selector-input');
      expect(input).toHaveValue('Brainfuck');
      const clearButton = screen.getByTestId('esolang-selector-clear-button');
      await userEvent.click(clearButton);
      rerender(<ComboBox {...sharedProps} onChange={onChange} value={value} />);
      await waitFor(() => {
        expect(input).toHaveValue('');
        expect(onChange).toHaveBeenCalledWith('', null);
      });
    });

    it('works in controlled mode', () => {
      const onChange = vi.fn();
      const { rerender } = render(<ComboBox {...sharedProps} value="brainfuck" onChange={onChange} />);
      const input = screen.getByTestId('esolang-selector-input');
      expect(input).toHaveValue('Brainfuck');
      rerender(<ComboBox {...sharedProps} value="befunge" onChange={onChange} />);
      expect(input).toHaveValue('Befunge');
    });
  });

  describe('Input & Focus', () => {
    it('focuses the input on initial click', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      expect(document.activeElement).toBe(input);
    });

    it('maintains focus on input after clearing via clear button', async () => {
      render(<ComboBox {...sharedProps} value="brainfuck" />);
      const input = screen.getByTestId('esolang-selector-input');
      expect(input).toHaveValue('Brainfuck');
      const clearButton = screen.getByTestId('esolang-selector-clear-button');
      await userEvent.click(clearButton);
      expect(input).toHaveValue('');
      expect(document.activeElement).toBe(input);
    });

    it('maintains focus after selection is made', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
      });
      await userEvent.click(screen.getByText('Befunge'));
      expect(input).toHaveValue('Befunge');
      expect(document.activeElement).toBe(input);
    });

    it('loses focus when clicking outside', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      expect(document.activeElement).toBe(input);
      await userEvent.click(document.body);
      expect(document.activeElement).not.toBe(input);
    });

    it('maintains focus when typing character by character', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      expect(document.activeElement).toBe(input);
      await userEvent.type(input, 'B', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('B');
      await userEvent.type(input, 'r', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('Br');
      await userEvent.type(input, 'a', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('Bra');
      await userEvent.type(input, 'i', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('Brai');
      await userEvent.type(input, 'n', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('Brain');
      await userEvent.type(input, 'f', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('Brainf');
      await userEvent.type(input, 'u', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('Brainfu');
      await userEvent.type(input, 'c', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('Brainfuc');
      await userEvent.type(input, 'k', { delay: 50 });
      expect(document.activeElement).toBe(input);
      expect(input).toHaveValue('Brainfuck');
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
      });
      await userEvent.click(screen.getByText('Brainfuck'));
      await waitFor(() => {
        expect(input).toHaveValue('Brainfuck');
      });
    });

    it('handles typing in the input correctly', async () => {
      const onChange = vi.fn();
      render(<ComboBox {...sharedProps} onChange={onChange} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.type(input, 'Bra');
      expect(input).toHaveValue('Bra');
      await userEvent.type(input, 'infuck');
      expect(input).toHaveValue('Brainfuck');
      await userEvent.type(input, '{enter}');
      expect(onChange).toHaveBeenCalledWith('brainfuck', expect.objectContaining({ value: 'brainfuck' }));
    });

    it('backspace should remove one character at a time', async () => {
      render(<ComboBox {...sharedProps} value="brainfuck" />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, '{backspace}');
      expect(input).toHaveValue('Brainfuc');
    });
  });

  describe('Keyboard & Navigation', () => {
    it('handles keyboard navigation', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, '{arrowdown}');
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
      });
      await userEvent.type(input, '{escape}');
      await waitFor(() => {
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
    });

    it('reopens dropdown after typing to filter with exactly one match', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.keyboard('{Escape}');
      await userEvent.type(input, 'bef');
      await waitFor(() => {
        expect(screen.getByText('Befunge')).toBeInTheDocument();
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
      await userEvent.keyboard('{Enter}');
      expect(input).toHaveValue('Befunge');
    });
  });

  describe('Controlled & Uncontrolled Value Reset', () => {
    it('clears input value if nothing was selected before leaving', async () => {
      render(<ComboBox {...sharedProps} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'cal');
      await userEvent.tab();
      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('controlled: clears input value if nothing was selected before leaving', async () => {
      render(<ComboBox {...sharedProps} value="" />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await userEvent.type(input, 'cal');
      await userEvent.tab();
      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('controlled mode: if selected option then type a new filter but tab out it should reset', async () => {
      const onChange = vi.fn();
      render(<ComboBox {...sharedProps} value="brainfuck" onChange={onChange} />);
      const input = screen.getByTestId('esolang-selector-input');
      expect(input).toHaveValue('Brainfuck');
      await userEvent.type(input, 'minimal');
      await userEvent.tab();
      expect(input).toHaveValue('Brainfuck');
    });

    it('controlled mode: if selected option then type a new filter but do not select and press Escape, it should reset', async () => {
      const onChange = vi.fn();
      render(<ComboBox {...sharedProps} value="brainfuck" onChange={onChange} />);
      const input = screen.getByTestId('esolang-selector-input');
      expect(input).toHaveValue('Brainfuck');
      await userEvent.type(input, 'minimal');
      await userEvent.type(input, '{escape}');
      expect(input).toHaveValue('Brainfuck');
    });

    it('controlled mode: if selected option then type a new filter but do not select but click outside it should reset', async () => {
      const onChange = vi.fn();
      render(<ComboBox {...sharedProps} value="brainfuck" onChange={onChange} />);
      const input = screen.getByTestId('esolang-selector-input');
      expect(input).toHaveValue('Brainfuck');
      await userEvent.type(input, 'minimal');
      await userEvent.click(document.body);
      expect(input).toHaveValue('Brainfuck');
    });
  });

  describe('Custom Option Rendering', () => {
    it('allows custom option rendering', async () => {
      const renderOption = (option: ComboBoxOption) => (
        <div data-testid={`custom-option-${option.value}`}>Custom: {option.label}</div>
      );
      render(<ComboBox {...sharedProps} renderOption={renderOption} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByTestId('custom-option-brainfuck')).toBeInTheDocument();
        expect(screen.getByText('Custom: Brainfuck')).toBeInTheDocument();
      });
    });
  });

  describe('Dropdown character threshold', () => {
    it('does not open until the required number of characters are typed (countOfCharsBeforeDropdown)', async () => {
      render(<ComboBox {...sharedProps} countOfCharsBeforeDropdown={3} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.queryByText('Befunge')).not.toBeInTheDocument();
      });
      await userEvent.type(input, 'b');
      expect(screen.queryByText('Befunge')).not.toBeInTheDocument();
      await userEvent.type(input, 'ef');
      expect(input).toHaveValue('bef');
      await waitFor(() => expect(screen.getByText('Befunge')).toBeInTheDocument());
    });

    it('opens after first character when countOfCharsBeforeDropdown is 1', async () => {
      render(<ComboBox {...sharedProps} countOfCharsBeforeDropdown={1} />);
      const input = screen.getByTestId('esolang-selector-input');
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.queryByText('Brainfuck')).not.toBeInTheDocument();
      });
      await userEvent.type(input, 'b');
      await waitFor(() => {
        expect(screen.getByText('Brainfuck')).toBeInTheDocument();
      });
    });
  });
});
