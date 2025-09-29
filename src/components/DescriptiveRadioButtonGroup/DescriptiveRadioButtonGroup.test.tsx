import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DescriptiveRadioButtonGroup, { DescriptiveRadioButtonGroupProps } from './DescriptiveRadioButtonGroup';

describe('DescriptiveRadioButtonGroup', () => {
  const defaultProps: DescriptiveRadioButtonGroupProps = {
    legendText: 'Select an option',
    options: [
      { id: '1', value: 'option1', labelText: 'Option 1' },
      { id: '2', value: 'option2', labelText: 'Option 2' },
    ],
    name: 'test-group',
    value: 'option1',
    onValueChange: vi.fn(),
  };

  const legendVariants = [
    { hideLegend: undefined, description: 'renders the legend when provided' },
    { hideLegend: false, description: 'renders the legend when hideLegend is false' },
  ];

  it.each(legendVariants)('$description', ({ hideLegend }) => {
    const props = hideLegend !== undefined ? { ...defaultProps, hideLegend } : defaultProps;
    render(<DescriptiveRadioButtonGroup {...props} />);
    expect(screen.getByText('Select an option')).toBeVisible();
  });

  const optionStates = [
    { value: 'option1', checked: [true, false], description: 'marks the correct option as checked for option1' },
    { value: 'option2', checked: [false, true], description: 'marks the correct option as checked for option2' },
  ];

  it.each(optionStates)('$description', ({ value, checked }) => {
    render(<DescriptiveRadioButtonGroup {...defaultProps} value={value} />);
    expect((screen.getByLabelText('Option 1') as HTMLInputElement).checked).toBe(checked[0]);
    expect((screen.getByLabelText('Option 2') as HTMLInputElement).checked).toBe(checked[1]);
  });

  it('calls onValueChange when an option is selected', () => {
    const onValueChange = vi.fn();
    render(<DescriptiveRadioButtonGroup {...defaultProps} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(onValueChange).toHaveBeenCalledWith('option2');
  });

  it('calls onValueChange with an empty string when the option object has no value', () => {
    const onValueChange = vi.fn();
    const options = [
      { id: '1', value: 'option1', labelText: 'Option 1' },
      { id: '2', value: undefined, labelText: 'Option 2' },
    ];
    render(<DescriptiveRadioButtonGroup {...defaultProps} options={options} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(onValueChange).toHaveBeenCalledWith('');
  });

  it('returns null when no options are provided', () => {
    const { container } = render(<DescriptiveRadioButtonGroup {...defaultProps} options={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className to the fieldset', () => {
    render(<DescriptiveRadioButtonGroup {...defaultProps} className="custom-class" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-class');
  });
});
