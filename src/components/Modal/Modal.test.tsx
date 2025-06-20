import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import { ModalFromDrawer } from './Modal.stories';

describe('Modal', () => {
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });
  runCommonTests((props) => <Modal {...props} isOpen></Modal>, 'Modal');

  it('renders the modal when isOpen is true', () => {
    render(
      <Modal isOpen onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');

    expect(screen.getByLabelText('Close Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Close Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls the onClose function when the close button is clicked', async () => {
    render(
      <Modal isOpen onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = screen.getByLabelText('Close Modal');
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('focus moves into the modal when opened by a button in the drawer', async () => {
    render(<ModalFromDrawer />);

    const openDrawerButton = screen.getByText('Open Drawer');
    await userEvent.click(openDrawerButton);

    const openModalButton = screen.getByText('Open Modal');
    await userEvent.click(openModalButton);

    const modalButton = await screen.findByLabelText('Close Modal');
    expect(document.activeElement).toBe(modalButton);
  });

  it('calls onClose when pressing Escape', async () => {
    render(
      <Modal isOpen onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onClose when clicking outside', async () => {
    render(
      <Modal isOpen onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );

    const overlay = screen.getByTestId(/overlay/);
    await userEvent.click(overlay);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
