import classnames from 'classnames';
import { noOp, px } from '../../utils';
import CloseIcon from '../../assets/close.svg?react';
import Button from '../Button/Button';
import ReactModal from 'react-modal';

export interface ModalProps extends ReactModal.Props {
  /**
   * Function to close the modal
   */
  onClose?: () => void;
}

/**
 * ## Overview
 *
 * A component for displaying a modal.
 *
 */

const Modal = ({ children, className, isOpen = false, onClose = noOp, ...props }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const buttonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classnames(`${px}-modal`, className)}
      overlayClassName={classnames(`${px}-modal__overlay`)}
      ariaHideApp={false}
      {...props}
    >
      <Button
        data-testid="modal-button"
        buttonType="icon"
        onClick={buttonClick}
        aria-label="Close Modal"
        className={classnames(`${px}-modal__close`)}
      >
        <CloseIcon />
      </Button>
      {children}
    </ReactModal>
  );
};

export default Modal;
