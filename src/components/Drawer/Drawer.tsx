import React, { forwardRef } from 'react';
import classnames from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { getCommonProps, noOp } from '../../utils';
import DrawerHeader from './DrawerHeader';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the drawer is open or not
   */
  isOpen?: boolean;
  /**
   * Callback when the drawer is closed
   */
  onClose?: () => void;
  /**
   * The content of the drawer
   */
  children?: React.ReactNode;
  /**
   * A string to be displayed center at the top of the drawer, up with the close button.
   * Its presence also triggers the horizontal rule below the header to be rendered.
   */
  headerText?: string;
  /**
   * Used as the accessibility label for the drawer, used for screen readers.
   * Defaults to the headerText if provided, otherwise an empty string.
   *
   * Supplying this prop also reduces the content padding from 32px to 16px,
   * which aligns with the design.
   */
  title?: string;
  /**
   * Which side the drawer opens from: left, right, or bottom
   */
  drawerOpenSide?: 'left' | 'right' | 'bottom';
  /**
   * Older designs for left/right drawers had more padding around the content, this adds the extra 16px
   */
  extraPaddingAmount?: 0 | 1 | 2;
}

/**
 * ## Overview
 *
 * A component for displaying a drawer.
 *
 */

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen = false,
      onClose = noOp,
      headerText = '',
      title = '',
      drawerOpenSide = 'right',
      className: classNameFromParent,
      children,
      extraPaddingAmount = 2, // legacy value for extra padding, modern designs set this to 0 or 1. should be removed in the future
      ...props
    },
    ref,
  ) => {
    const { className: localClassName, ...commonProps } = getCommonProps(props, 'Drawer');
    const isBottomSheet = drawerOpenSide === 'bottom';

    return (
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            onClose();
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay onClick={onClose} className={`${localClassName}__overlay`} data-testid="drawer-overlay" />
          <Dialog.Content
            className={classnames(localClassName, classNameFromParent, {
              [`${localClassName}--bottom`]: isBottomSheet,
            })}
            data-side={drawerOpenSide}
            id={props.id}
            ref={ref}
            {...commonProps}
          >
            <VisuallyHidden asChild>
              <Dialog.Title>{title}</Dialog.Title>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <Dialog.Description>{title}</Dialog.Description>
            </VisuallyHidden>

            <DrawerHeader
              baseClassName={localClassName}
              headerText={headerText}
              onClose={onClose}
              drawerOpenSide={drawerOpenSide}
            />

            <div
              className={classnames(
                `${localClassName}__content-children`,
                extraPaddingAmount && `${localClassName}__content-children--ep${extraPaddingAmount}`,
              )}
            >
              {children}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

Drawer.displayName = 'Drawer';

export default Drawer;
