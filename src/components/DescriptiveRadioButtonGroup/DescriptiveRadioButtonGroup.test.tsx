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

  it('renders the legend when provided', () => {
    render(<DescriptiveRadioButtonGroup {...defaultProps} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders the legend when hideLegend is false', () => {
    const { getByText } = render(<DescriptiveRadioButtonGroup {...defaultProps} hideLegend={false} />);
    expect(getByText('Select an option')).toBeVisible();
  });

  it('renders all options', () => {
    render(<DescriptiveRadioButtonGroup {...defaultProps} />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('marks the correct option as checked', () => {
    render(<DescriptiveRadioButtonGroup {...defaultProps} />);
    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).not.toBeChecked();
  });

  it('calls onValueChange when an option is selected', () => {
    const onValueChange = vi.fn();
    render(<DescriptiveRadioButtonGroup {...defaultProps} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(onValueChange).toHaveBeenCalledWith('option2');
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
