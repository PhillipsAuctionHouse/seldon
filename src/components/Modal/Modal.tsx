import classnames from 'classnames';
import { getCommonProps, noOp } from '../../utils';
import { Icon } from '../Icon';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { forwardRef } from 'react';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, Dialog.DialogProps {
  /**
   * Boolean to determine if the modal is open
   */
  isOpen: boolean;
  /**
   * Function to close the modal
   */
  onClose?: () => void;
  /**
   * The children of the modal
   */
  children: React.ReactNode;
  /**
   * className for the modal
   */
  className?: string;
  /**
   * className for the modal overlay
   */
  overlayClassName?: string;
  /**
   * style for the modal
   */
  style?: React.CSSProperties;
  /**
   * Content label for accessibility
   */
  contentLabel?: string;
}

/**
 * ## Overview
 *
 * A component for displaying a modal.
 *
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, className, overlayClassName, isOpen = false, onClose = noOp, style, contentLabel, ...props }, ref) => {
    const { className: baseClassName, 'data-testid': testId, ...commonProps } = getCommonProps(props, 'Modal');

    return (
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            className={classnames(`${baseClassName}__overlay`, overlayClassName)}
            data-testid={`modal-overlay`}
          />
          <Dialog.Content
            ref={ref}
            className={classnames(baseClassName, className)}
            data-testid={testId}
            aria-modal="true"
            style={style}
            {...commonProps}
            {...props}
          >
            <VisuallyHidden asChild>
              <Dialog.Title>{contentLabel ?? 'Modal'}</Dialog.Title>
            </VisuallyHidden>
            <Dialog.Description />
            <Dialog.Close asChild>
              <IconButton
                id="modal-close-button"
                aria-label="Close Modal"
                className={classnames(`${baseClassName}__close`)}
                variant={ButtonVariants.tertiary}
              >
                <Icon icon="CloseX" height={32} width={32} color="currentColor" />
              </IconButton>
            </Dialog.Close>
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
