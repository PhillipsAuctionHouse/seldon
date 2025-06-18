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
 * A component for ComposedModal.
 *
 */
const ComposedModal = forwardRef<HTMLDivElement, ComposedModalProps>(
  ({
    children,
    className,
    overlayClassName,
    isOpen = false,
    onClose = noOp,
    appElementSelector = 'main',
    style,
    shouldFocusAfterRender,
    centerAlignText,
    maxHeightValue = '60vh',
    title,
    ...props
  }: ComposedModalProps) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ComposedModal');
    const defaultModalStyle = {
      content: {
        padding: '0',
        borderRadius: '1rem',
        ...(style || {}),
      },
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        appElementSelector={appElementSelector}
        {...props}
        {...commonProps}
        style={defaultModalStyle}
        className={className}
        shouldFocusAfterRender={shouldFocusAfterRender}
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
