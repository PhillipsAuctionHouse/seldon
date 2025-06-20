import { render, screen } from '@testing-library/react';
import { px } from '../../utils';
import { runCommonTests } from '../../utils/testUtils';
import ComposedModal from './ComposedModal';

describe('ComposedModal', () => {
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });
  runCommonTests((props) => <ComposedModal {...props} isOpen />, 'Modal');

  it('renders the modal title when isOpen is true', () => {
    render(
      <ComposedModal isOpen onClose={onCloseMock} title="Test Modal">
        <div>Modal Content</div>
      </ComposedModal>,
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders the modal children when isOpen is true', () => {
    render(
      <ComposedModal isOpen onClose={onCloseMock} title="Test Modal">
        <div>Modal Children Content</div>
      </ComposedModal>,
    );

    expect(screen.getByText('Modal Children Content')).toBeInTheDocument();
  });

  it('renders the scrollable body with max height', () => {
    render(
      <ComposedModal isOpen onClose={onCloseMock} title="Test Modal" maxHeightValue="100px">
        <div>{'Lorem ipsum '.repeat(150)}</div>
      </ComposedModal>,
    );

    const body = document.querySelector(`.${px}-composed-modal__body`);
    expect(body).toHaveClass(`${px}-composed-modal__body`);
    expect(body).toHaveStyle({ maxHeight: '100px' });
  });
});
