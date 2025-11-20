import classnames from 'classnames';
import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { getCommonProps, noOp } from '../../utils';
import { Divider } from '../Divider';
import Modal, { ModalProps } from '../Modal/Modal';
import { Text, TextVariants } from '../Text';

export interface ComposedModalProps extends Omit<ModalProps, 'onClose' | 'role' | 'style'> {
  /**
   * Title for Composed Modal
   */
  title?: string;
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
  secondaryButton?: React.ReactNode;
  /**
   * Right Button Props
   */
  primaryButton?: React.ReactNode;
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
  (
    {
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
    }: ComposedModalProps & { id?: string },
    ref,
  ) => {
    const {
      className: baseClassName,
      'data-testid': testId,
      ...commonProps
    } = getCommonProps({ id, ...props }, 'ComposedModal');

    const footerRef = useRef<HTMLDivElement>(null);
    const [footerHeight, setFooterHeight] = useState<string>('0px');

    useEffect(() => {
      const measureFooter = () => {
        if (footerRef.current) {
          const height = footerRef.current.offsetHeight;
          setFooterHeight(`${height}px`);
        } else {
          setFooterHeight('0px');
        }
      };

      if (!footerRef.current) {
        setFooterHeight('0px');
        return;
      }

      // Initial measurement
      requestAnimationFrame(measureFooter);

      // Set up ResizeObserver to watch for size changes
      const resizeObserver = new ResizeObserver(() => {
        measureFooter();
      });

      resizeObserver.observe(footerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, [secondaryButton, primaryButton, footerContent]);

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        {...props}
        {...commonProps}
        className={classnames(`${baseClassName}`, className)}
        id={id}
        ref={ref}
        title={title}
        style={
          {
            ['--modal-footer-height']: footerHeight,
          } as React.CSSProperties
        }
      >
        <div
          className={`${baseClassName}__body`}
          style={{ ['--max-modal-body-height']: maxHeightValue } as React.CSSProperties}
        >
          {children}
        </div>
        {(secondaryButton || primaryButton || footerContent) && (
          <div ref={footerRef} className={`${baseClassName}__footer`}>
            <Divider className={`${baseClassName}__divider`} id={`${id}-divider`} />
            <div className={`${baseClassName}__btns-group`}>
              {secondaryButton}
              {primaryButton}
            </div>
            {footerContent && (
              <Text variant={TextVariants.bodySmall} className={`${baseClassName}__disclaimer`}>
                {footerContent}
              </Text>
            )}
          </div>
        )}
      </Modal>
    );
  },
);

ComposedModal.displayName = 'ComposedModal';

export default ComposedModal;
