import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DescriptiveRadioButton from './DescriptiveRadioButton';

describe('DescriptiveRadioButton', () => {
  it('renders label and description', () => {
    render(<DescriptiveRadioButton label="Test Label" description="Test Description" name="test" value="test" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders without description', () => {
    render(<DescriptiveRadioButton label="Test Label" name="test" value="test" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<DescriptiveRadioButton label="Test Label" name="test" value="test" onChange={handleChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('is checked when checked prop is true', () => {
    render(
      <DescriptiveRadioButton label="Test Label" name="test" value="test" checked={true} onChange={() => void 0} />,
    );
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('is not checked when checked prop is false', () => {
    render(
      <DescriptiveRadioButton label="Test Label" name="test" value="test" checked={false} onChange={() => void 0} />,
    );
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('applies custom class names', () => {
    render(
      <DescriptiveRadioButton
        label="Test Label"
        name="test"
        value="test"
        className="custom-input"
        containerClassName="custom-container"
      />,
    );
    expect(screen.getByRole('radio')).toHaveClass('custom-input');
    expect(screen.getByText('Test Label').closest('label,div')).toHaveClass('custom-container');
  });
});
