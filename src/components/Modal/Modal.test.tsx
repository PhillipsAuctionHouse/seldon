import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';

describe('Modal', () => {
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });
  runCommonTests((props) => <Modal {...props} isOpen appElementSelector="body"></Modal>, 'Modal');

  it('renders the modal when isOpen is true', () => {
    render(
      <Modal isOpen onClose={onCloseMock} appElementSelector="body">
        <div>Modal Content</div>
      </Modal>,
    );

    expect(document.body).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('icon-button-modal-button')).toBeInTheDocument();
    expect(screen.getByLabelText('Close Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock} appElementSelector="body">
        <div>Modal Content</div>
      </Modal>,
    );

    expect(document.body).not.toHaveAttribute('aria-hidden');
    expect(screen.queryByTestId('icon-button-modal-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Close Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls the onClose function when the close button is clicked', async () => {
    render(
      <Modal isOpen onClose={onCloseMock} appElementSelector="body">
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = screen.getByLabelText('Close Modal');
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
