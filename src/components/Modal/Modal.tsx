import classnames from 'classnames';
import { noOp, px } from '../../utils';
import CloseIcon from '../../assets/close.svg?react';
import ReactModal from 'react-modal';
import IconButton from '../IconButton/IconButton';
import { useMemo } from 'react';

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
  const appElement = useMemo(() => {
    return document.querySelector(appElementSelector);
  }, [appElementSelector]);

  if (!isOpen || !appElement) {
    return null;
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classnames(`${px}-modal`, className)}
      overlayClassName={classnames(`${px}-modal__overlay`)}
      appElement={(appElement as HTMLElement) ?? undefined}
      ariaHideApp={!appElement}
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
