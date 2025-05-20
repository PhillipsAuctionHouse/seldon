import TextArea from './TextArea';
import { render } from '@testing-library/react';
import { createRef } from 'react';

describe('TextArea', () => {
  it('renders with default props', () => {
    const { getByRole, getByText } = render(<TextArea labelText="Test Label" />);
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with custom id', () => {
    const { getByRole } = render(<TextArea id="custom-id" labelText="Test Label" />);
    const textarea = getByRole('textbox', { name: 'Test Label' });
    expect(textarea).toHaveAttribute('id', 'custom-id');
  });

  it('applies skeleton loading state', () => {
    const { getByRole, getByText } = render(<TextArea labelText="Test Label" isSkeletonLoading />);
    const label = getByText('Test Label');
    const textarea = getByRole('textbox');
    expect(label).toHaveClass('seldon-skeleton');
    expect(textarea).toHaveClass('seldon-skeleton');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextArea labelText="Test Label" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies custom maxLength', () => {
    const { getByRole } = render(<TextArea labelText="Test Label" maxLength={100} />);
    expect(getByRole('textbox')).toHaveAttribute('maxLength', '100');
  });

  it('applies custom rows', () => {
    const { getByRole } = render(<TextArea labelText="Test Label" rows={5} />);
    expect(getByRole('textbox')).toHaveAttribute('rows', '5');
  });

  it('matches label htmlFor with textarea id', () => {
    const { getByTestId } = render(<TextArea labelText="Test Label" id="test-id" />);
    const textarea = getByTestId('text-area-test-id-input');
    const label = getByTestId('text-area-test-id-label');
    expect(textarea).toHaveAttribute('id', 'test-id');
    expect(label).toHaveAttribute('for', 'test-id');
  });

  it('applies invalid state and displays error message', () => {
    const { getByText, container } = render(
      <TextArea labelText="Test Label" invalid invalidText="This field is required" />,
    );

    // Check that the wrapper has the invalid class
    const wrapper = container.querySelector('.seldon-text-area__wrapper');
    expect(wrapper).toHaveClass('seldon-text-area--invalid');

    // Check that the error message is displayed
    expect(getByText('This field is required')).toBeInTheDocument();
  });

  it('does not show error message when invalid is false', () => {
    const { queryByText } = render(
      <TextArea labelText="Test Label" invalid={false} invalidText="This field is required" />,
    );

    // Check that the error message is not displayed
    expect(queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('applies warn state and displays warning message', () => {
    const { getByText, container } = render(
      <TextArea labelText="Test Label" warn warnText="Almost at character limit" />,
    );

    const wrapper = container.querySelector('.seldon-text-area__wrapper');
    expect(wrapper).toHaveClass('seldon-text-area--warn');

    expect(getByText('Almost at character limit')).toBeInTheDocument();
  });

  it('does not show warning message when warn is false', () => {
    const { queryByText } = render(
      <TextArea labelText="Test Label" warn={false} warnText="Almost at character limit" />,
    );

    // Check that the warning message is not displayed
    expect(queryByText('Almost at character limit')).not.toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    const { getByRole, container } = render(<TextArea labelText="Test Label" disabled />);

    // Check that the textarea has disabled attribute
    const textarea = getByRole('textbox');
    expect(textarea).toBeDisabled();

    // Check that the wrapper has the disabled class
    const wrapper = container.querySelector('.seldon-text-area__wrapper');
    expect(wrapper).toHaveClass('seldon-text-area--disabled');
  });
});
