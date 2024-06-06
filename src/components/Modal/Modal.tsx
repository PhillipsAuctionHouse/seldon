import classnames from 'classnames';
import { px } from '../../utils';
import CloseIcon from '../../assets/close.svg?react';
import Button from '../Button/Button';

export interface ModalProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Boolean that will determine if the modal is open
   */
  open?: boolean;
  /**
   * Function to close the modal
   */
  onClose?: () => void;
}

const onClosePlaceholder = () => {
  console.log('On close clicked');
};

/**
 * ## Overview
 *
 * A component for displaying a modal.
 *
 */

const Modal = ({ children, open = false, onClose = onClosePlaceholder, ...props }: ModalProps) => {
  if (!open) {
    return null;
  }

  const buttonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={classnames(`${px}-modal`)} onClick={onClose} data-testid="modal-background">
      <div className={classnames(`${px}-modal__container`)} data-testid="modal-container" {...props}>
        <Button
          className={classnames(`${px}-modal__close`)}
          data-testid="modal-button"
          buttonType="icon"
          onClick={buttonClick}
        >
          <CloseIcon />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
