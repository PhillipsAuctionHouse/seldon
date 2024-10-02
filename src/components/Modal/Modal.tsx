import classnames from 'classnames';
import { getCommonProps, noOp } from '../../utils';
import CloseIcon from '../../assets/close.svg?react';
import ReactModal from 'react-modal';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';

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
  /**
   * className for the modal
   */
  className?: string;
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

  const { className: baseClassName, 'data-testid': testId, ...commonProps } = getCommonProps(props, 'Modal');

  ReactModal.setAppElement(appElementSelector);

  return (
    <ReactModal
      {...commonProps}
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classnames(baseClassName, className)}
      overlayClassName={classnames(`${baseClassName}__overlay`)}
      ariaHideApp={isOpen}
      testId={testId}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
      {...props}
    >
      <IconButton
        id="modal-button"
        onClick={onClose}
        aria-label="Close Modal"
        className={classnames(`${baseClassName}__close`)}
        variant={ButtonVariants.secondary}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </ReactModal>
  );
};

export default Modal;
