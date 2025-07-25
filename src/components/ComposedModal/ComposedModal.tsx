import classnames from 'classnames';
import { forwardRef, ReactNode } from 'react';
import { getCommonProps, noOp } from '../../utils';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Divider } from '../Divider';
import Modal, { ModalProps } from '../Modal/Modal';
import { Text, TextVariants } from '../Text';

export interface ModalButtonProps {
  /**
   * Callback click function for button
   */
  onClick?: () => void | unknown;
  /**
   * Button label text
   */
  buttonLabel?: string;
}

export interface ComposedModalProps extends Omit<ModalProps, 'onClose' | 'role' | 'style'> {
  /**
   * Title for Composed Modal
   */
  title: string;
  /**
   * The content of the modal.
   */
  children: React.ReactNode;
  /**
   * onClose handler for the modal
   */
  onClose?: () => void;

  /**
   * Maximum height value for the modal body
   */
  maxHeightValue?: string;
  /**
   * Left Button Props
   */
  secondaryButton?: ModalButtonProps;
  /**
   * Right Button Props
   */
  primaryButton?: ModalButtonProps;
  /**
   * Footer content for bottom of Viewings Details
   */
  footerContent?: ReactNode;
}

/**
 * ## Overview
 *
 * A component for ComposedModal that extends the base Modal component.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/Design-System--Responsive-Web?node-id=25578-15048&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-composedmodal--overview)
 *
 */
const ComposedModal = forwardRef<HTMLDivElement, ComposedModalProps>(
  ({
    children,
    className,
    overlayClassName,
    isOpen = false,
    onClose = noOp,
    maxHeightValue = '60vh',
    title,
    footerContent,
    secondaryButton,
    primaryButton,
    id,
    ...props
  }: ComposedModalProps & { id?: string }) => {
    const {
      className: baseClassName,
      'data-testid': testId,
      ...commonProps
    } = getCommonProps({ id, ...props }, 'ComposedModal');

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        {...props}
        {...commonProps}
        className={classnames(`${baseClassName}`, className)}
        id={id}
      >
        <Text variant={TextVariants.heading3} className={`${baseClassName}__title`}>
          {title}
        </Text>
        <div
          className={`${baseClassName}__body`}
          style={{ ['--max-modal-body-height']: maxHeightValue } as React.CSSProperties}
        >
          {children}
        </div>
        {(secondaryButton || primaryButton || footerContent) && (
          <>
            <Divider className={`${baseClassName}__divider`} id={`${id}-divider`} />
            <div className={`${baseClassName}__btns-group`}>
              {secondaryButton && (
                <Button id={`${id}-secondary-btn`} variant={ButtonVariants.secondary} onClick={secondaryButton.onClick}>
                  {secondaryButton.buttonLabel}
                </Button>
              )}
              {primaryButton && (
                <Button id={`${id}-primary-btn`} variant={ButtonVariants.primary} onClick={primaryButton.onClick}>
                  {primaryButton.buttonLabel}
                </Button>
              )}
            </div>
            {footerContent && (
              <Text variant={TextVariants.heading5} className={`${baseClassName}__disclaimer`}>
                {footerContent}
              </Text>
            )}
          </>
        )}
      </Modal>
    );
  },
);

ComposedModal.displayName = 'ComposedModal';

export default ComposedModal;
