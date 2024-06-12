import classnames from 'classnames';
import { noOp, px } from '../../utils';
import CloseIcon from '../../assets/close.svg?react';
import ReactModal from 'react-modal';
import IconButton from '../IconButton/IconButton';

export interface ModalProps extends ReactModal.Props {
  /**
   * Boolean to determine if the modal is open
   */
  isOpen: boolean;
  /**
   * Function to close the modal
   */
  onClose?: () => void;
  /**
   * The selector for aria-hide
   */
  appElementSelector?: string;
  /**
   * The children of the modal
   */
  children: React.ReactNode;
}

/**
 * ## Overview
 *
 * A component for displaying a modal.
 *
 */

const Modal = ({
  children,
  className,
  isOpen = false,
  onClose = noOp,
  appElementSelector = 'main',
  ...props
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  ReactModal.setAppElement(appElementSelector);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classnames(`${px}-modal`, className)}
      overlayClassName={classnames(`${px}-modal__overlay`)}
      ariaHideApp={isOpen}
      {...props}
    >
      <IconButton
        data-testid="modal-button"
        onClick={onClose}
        aria-label="Close Modal"
        className={classnames(`${px}-modal__close`)}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </ReactModal>
  );
};

export default Modal;
