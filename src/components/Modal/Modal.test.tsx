import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import Modal from './Modal';
import { forwardRef } from 'react';
import { ModalFromDrawer } from './Modal.stories';
import { px } from '../../utils';

describe('Modal', () => {
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof Modal>>((props, ref) => (
    <Modal {...props} isOpen ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'Modal');

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

  it('renders custom close icon', () => {
    const customCloseIcon = <span>Custom Close</span>;
    render(
      <Modal isOpen onClose={onCloseMock} closeIcon={customCloseIcon} closeIconPosition="left">
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = screen.getByText('Custom Close');
    expect(closeButton).toBeInTheDocument();
  });

  it('renders class to align close icon to the left', () => {
    const customCloseIcon = <span>Custom Close</span>;
    render(
      <Modal isOpen onClose={onCloseMock} closeIcon={customCloseIcon} closeIconPosition="left">
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = screen.getByText('Custom Close');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.parentElement).toHaveClass(`${px}-modal__close--left`);
  });

  it('renders component without left class alignment', () => {
    const customCloseIcon = <span>Custom Close</span>;
    render(
      <Modal isOpen onClose={onCloseMock} closeIcon={customCloseIcon}>
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = screen.getByText('Custom Close');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.parentElement).not.toHaveClass(`${px}-modal__close--left`);
  });

  describe('outside interactions', () => {
    // Password managers (1Password's "Unlock" button, LastPass, Bitwarden) and cookie banners append their UI to
    // the body, outside the dialog. Clicking it must not close the modal, or users lose what they typed.
    it('does not close when clicking UI appended to the body', async () => {
      const onInteractOutside = vi.fn();
      render(
        <Modal isOpen onClose={onCloseMock} onInteractOutside={onInteractOutside}>
          <div>Modal Content</div>
        </Modal>,
      );
      const injected = document.createElement('com-1password-menu');
      injected.innerHTML = '<button>Unlock</button>';
      document.body.appendChild(injected);
      // Radix registers its outside listener on the next tick
      await new Promise((resolve) => setTimeout(resolve, 0));
      // Radix sets pointer-events: none on the body while a modal is open; real password managers override it
      await userEvent.setup({ pointerEventsCheck: 0 }).click(screen.getByText('Unlock'));

      expect(onInteractOutside).toHaveBeenCalledTimes(1);
      expect(onCloseMock).not.toHaveBeenCalled();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      injected.remove();
    });

    it('still closes on overlay click and calls the outside handlers', async () => {
      const onInteractOutside = vi.fn();
      const onPointerDownOutside = vi.fn();
      render(
        <Modal
          isOpen
          onClose={onCloseMock}
          onInteractOutside={onInteractOutside}
          onPointerDownOutside={onPointerDownOutside}
        >
          <div>Modal Content</div>
        </Modal>,
      );
      await userEvent.click(screen.getByTestId('modal-overlay'));

      expect(onPointerDownOutside).toHaveBeenCalledTimes(1);
      expect(onInteractOutside).toHaveBeenCalledTimes(1);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('lets consumers keep the modal open by preventing default', async () => {
      render(
        <Modal isOpen onClose={onCloseMock} onInteractOutside={(event) => event.preventDefault()}>
          <div>Modal Content</div>
        </Modal>,
      );
      await userEvent.click(screen.getByTestId('modal-overlay'));
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('calls onEscapeKeyDown', async () => {
      const onEscapeKeyDown = vi.fn();
      render(
        <Modal isOpen onClose={onCloseMock} onEscapeKeyDown={onEscapeKeyDown}>
          <div>Modal Content</div>
        </Modal>,
      );
      await userEvent.keyboard('{Escape}');
      expect(onEscapeKeyDown).toHaveBeenCalledTimes(1);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
