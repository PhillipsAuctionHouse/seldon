import { render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import ComposedModal from './ComposedModal';

describe('ComposedModal', () => {
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });
  runCommonTests(
    (props) => (
      <ComposedModal {...props} data-testid="modal-componentid" isOpen appElementSelector="body"></ComposedModal>
    ),
    'Modal',
  );

  it('renders the modal title when isOpen is true', () => {
    render(
      <ComposedModal isOpen onClose={onCloseMock} appElementSelector="body" title="Test Modal">
        <div>Modal Content</div>
      </ComposedModal>,
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });
});
