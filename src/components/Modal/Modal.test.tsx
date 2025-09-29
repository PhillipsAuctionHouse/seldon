import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import Modal from './Modal';
import { forwardRef } from 'react';
import { ModalFromDrawer } from './Modal.stories';
import { px } from '../../utils';
import { Mock } from 'vitest';

let onCloseMock: Mock;
beforeEach(() => {
  onCloseMock = vi.fn();
});
afterEach(() => {
  vi.clearAllMocks();
});

describe('Modal', () => {
  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof Modal>>((props, ref) => (
    <Modal {...props} isOpen ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'Modal');

  it.each([
    [true, 'renders the modal when isOpen is true', true],
    [false, 'does not render the modal when isOpen is false', false],
  ])('%s', (isOpen, _desc, shouldRender) => {
    render(
      <Modal isOpen={isOpen} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );
    if (shouldRender) {
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(screen.getByLabelText('Close Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    } else {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Close Modal')).not.toBeInTheDocument();
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    }
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
});
