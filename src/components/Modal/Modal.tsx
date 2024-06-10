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
}

ReactModal.setAppElement('body');
// resolves the following error: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`. This is needed so screen readers don't see main content when modal is opened. It is not recommended, but you can opt-out by setting `ariaHideApp={false}`.

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

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classnames(`${px}-modal`, className)}
      overlayClassName={classnames(`${px}-modal__overlay`)}
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
