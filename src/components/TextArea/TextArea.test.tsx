import TextArea from './TextArea';
import { runCommonTests } from '../../utils/testUtils';
import { render } from '@testing-library/react';
import { createRef } from 'react';

describe('TextArea', () => {
  runCommonTests(TextArea, 'TextArea');
  it('renders with default props', () => {
    const { getByRole, getByLabelText } = render(<TextArea labelText="Test label" />);
    const textarea = getByRole('textarea');
    expect(textarea).toBeInTheDocument();
    expect(getByLabelText('Test label')).toBe(textarea);
  });

  it('applies custom className', () => {
    const { container } = render(<TextArea labelText="Test" className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    const { getByRole } = render(<TextArea labelText="Test" disabled />);
    expect(getByRole('textarea')).toBeDisabled();
  });

  it('shows skeleton loading state', () => {
    const { container } = render(<TextArea labelText="Test" isSkeletonLoading />);
    expect(container.querySelector('.px-skeleton')).toBeInTheDocument();
  });

  it('respects maxLength prop', () => {
    const { getByRole } = render(<TextArea labelText="Test" maxLength={100} />);
    expect(getByRole('textarea')).toHaveAttribute('maxLength', '100');
  });

  it('uses provided rows prop', () => {
    const { getByRole } = render(<TextArea labelText="Test" rows={5} />);
    expect(getByRole('textarea')).toHaveAttribute('rows', '5');
  });

  it('uses provided name and id', () => {
    const { getByRole } = render(<TextArea labelText="Test" name="test-name" id="test-id" />);
    const textarea = getByRole('textarea');
    expect(textarea).toHaveAttribute('name', 'test-name');
    expect(textarea).toHaveAttribute('id', 'test-id');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextArea labelText="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
