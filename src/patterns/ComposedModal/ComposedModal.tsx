import classnames from 'classnames';
import { forwardRef } from 'react';
import Modal, { ModalProps } from '../../components/Modal/Modal';
import { Text, TextVariants } from '../../components/Text';
import { getCommonProps, noOp } from '../../utils';
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
   * Add any additional styles to the component
   */
  style?: React.CSSProperties;
  /**
   * Whether the modal should focus after render
   */
  shouldFocusAfterRender?: boolean;
  /**
   * Optional proprerty center align all text in the component
   */
  centerAlignText?: boolean;
  /**
   * Maximum height value for the modal body
   */
  maxHeightValue?: string;
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
    style,
    shouldFocusAfterRender,
    centerAlignText,
    maxHeightValue = '60vh',
    title,
    ...props
  }: ComposedModalProps) => {
    const { className: baseClassName, 'data-testid': testId, ...commonProps } = getCommonProps(props, 'ComposedModal');

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        {...props}
        {...commonProps}
        className={classnames(`${baseClassName}`, className)}
      >
        <Text
          variant={TextVariants.heading3}
          className={classnames(`${baseClassName}__title`, { [`${baseClassName}__center-align`]: centerAlignText })}
        >
          {title}
        </Text>
        <div className={`${baseClassName}__body`} style={{ maxHeight: maxHeightValue }}>
          {children}
        </div>
      </Modal>
    );
  },
);

ComposedModal.displayName = 'ComposedModal';

export default ComposedModal;
