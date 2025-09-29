import TextArea from './TextArea';
import { cleanup, render, screen } from '@testing-library/react';
import { createRef } from 'react';

describe('TextArea', () => {
  const baseProps = { labelText: 'Test Label' };
  it.each([
    [
      {},
      'renders with default props',
      () => {
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      },
    ],
    [
      { id: 'custom-id' },
      'renders with custom id',
      () => {
        const textarea = screen.getByRole('textbox', { name: 'Test Label' });
        expect(textarea).toHaveAttribute('id', 'custom-id');
      },
    ],
    [
      { isSkeletonLoading: true },
      'applies skeleton loading state',
      () => {
        const label = screen.getByText('Test Label');
        const textarea = screen.getByRole('textbox');
        expect(label).toHaveClass('seldon-skeleton');
        expect(textarea).toHaveClass('seldon-skeleton');
      },
    ],
    [
      { maxLength: 100 },
      'applies custom maxLength',
      () => {
        expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '100');
      },
    ],
    [
      { rows: 5 },
      'applies custom rows',
      () => {
        expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
      },
    ],
    [
      { id: 'test-id' },
      'matches label htmlFor with textarea id',
      () => {
        const textarea = screen.getByTestId('text-area-test-id-input');
        const label = screen.getByTestId('text-area-test-id-label');
        expect(textarea).toHaveAttribute('id', 'test-id');
        expect(label).toHaveAttribute('for', 'test-id');
      },
    ],
  ])('%s', (props, _desc, assertion) => {
    render(<TextArea {...baseProps} {...props} />);
    assertion();
    cleanup();
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextArea labelText="Test Label" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies invalid state and displays error message', () => {
    const { getByText, container } = render(
      <TextArea labelText="Test Label" invalid invalidText="This field is required" />,
    );
    const wrapper = container.querySelector('.seldon-text-area__wrapper');
    expect(wrapper).toHaveClass('seldon-text-area--invalid');
    expect(getByText('This field is required')).toBeInTheDocument();
  });

  it('does not show error message when invalid is false', () => {
    const { queryByText } = render(
      <TextArea labelText="Test Label" invalid={false} invalidText="This field is required" />,
    );
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
    expect(queryByText('Almost at character limit')).not.toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    const { getByRole, container } = render(<TextArea labelText="Test Label" disabled />);
    const textarea = getByRole('textbox');
    expect(textarea).toBeDisabled();
    const wrapper = container.querySelector('.seldon-text-area__wrapper');
    expect(wrapper).toHaveClass('seldon-text-area--disabled');
  });
});
