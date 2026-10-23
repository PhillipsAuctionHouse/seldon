import classnames from 'classnames';
import { getCommonProps, noOp } from '../../utils';
import { Icon } from '../Icon';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { forwardRef, useRef } from 'react';
import './_modal.scss';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, Dialog.DialogProps {
  /**
   * Called when a pointer or focus interaction happens outside the modal content. Call `event.preventDefault()`
   * to keep the modal open. Only clicks on the overlay close the modal.
   */
  onInteractOutside?: Dialog.DialogContentProps['onInteractOutside'];
  /**
   * Called when a pointer-down happens outside the modal content. Call `event.preventDefault()` to keep the modal open.
   */
  onPointerDownOutside?: Dialog.DialogContentProps['onPointerDownOutside'];
  /**
   * Called when Escape is pressed while the modal is open. Call `event.preventDefault()` to keep the modal open.
   */
  onEscapeKeyDown?: Dialog.DialogContentProps['onEscapeKeyDown'];
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
   * Custom close icon
   */
  closeIcon?: React.ReactElement;
  /**
   * Position of the close icon
   */
  closeIconPosition?: 'left' | 'right';
}

/**
 * ## Overview
 *
 * A component for displaying a modal.
 *
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      className,
      overlayClassName,
      isOpen = false,
      onClose = noOp,
      style,
      closeIcon = <Icon icon="CloseX" height={32} width={32} color="currentColor" />,
      closeIconPosition = 'right',
      title,
      onInteractOutside,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, 'data-testid': testId, ...commonProps } = getCommonProps(props, 'Modal');
    const overlayRef = useRef<HTMLDivElement>(null);

    return (
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            // this is a workaround because Dialogs interacting with other dialogs can get confused and not clear pointer-events correctly. https://my.onetrust.com/s/case/500RO00000XuZl3/pointerevents-none-being-applied-incorrectly-by-manage-cookies-dialog
            document.body.style.removeProperty('pointer-events');
            onClose();
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            ref={overlayRef}
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
            onInteractOutside={(event) => {
              onInteractOutside?.(event);
              // Only the overlay dismisses. Password managers, cookie banners and other injected UI sit above it in
              // the body, so Radix would otherwise treat clicks on them (e.g. 1Password's "Unlock") as outside.
              if (event.target !== overlayRef.current) event.preventDefault();
            }}
          >
            <VisuallyHidden asChild>
              <Dialog.Title>{title ?? 'Modal'}</Dialog.Title>
            </VisuallyHidden>
            <Dialog.Description />
            <Dialog.Close asChild>
              <IconButton
                id="modal-close-button"
                aria-label="Close Modal"
                className={classnames(`${baseClassName}__close`, {
                  [`${baseClassName}__close--left`]: closeIconPosition === 'left',
                })}
                variant={ButtonVariants.tertiary}
              >
                {closeIcon}
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
