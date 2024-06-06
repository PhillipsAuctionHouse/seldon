import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('renders the modal when open prop is true', () => {
    render(
      <Modal open={true}>
        <div>Modal Content</div>
      </Modal>,
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();
  });

  it('does not render the modal when open prop is false', () => {
    render(
      <Modal open={false}>
        <div>Modal Content</div>
      </Modal>,
    );

    const modalContent = screen.queryByText('Modal Content');
    expect(modalContent).not.toBeInTheDocument();
  });

  it('calls the onClose function when the close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(
      <Modal open={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = screen.getByTestId('modal-button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls the onClose function when the background is clicked', () => {
    const onCloseMock = vi.fn();
    render(
      <Modal open={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );

    const modalBackground = screen.getByTestId('modal-background');
    fireEvent.click(modalBackground);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
