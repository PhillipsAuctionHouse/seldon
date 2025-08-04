import React, { forwardRef } from 'react';
import { getCommonProps, noOp } from '../../utils';
import classnames from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
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
   * Optional label for the bottom content area
   */
  bottomContentLabel?: string;
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
      className: classNameFromParent,
      children,
      drawerOpenSide = 'right',
      bottomContentLabel,
      ...props
    },
    ref,
  ) => {
    const { className: localClassName, ...commonProps } = getCommonProps(props, 'Drawer');
    const isBottomSheet = drawerOpenSide === 'bottom';
    const needsExtraPadding = !headerText; // older designs that don't use this header text use 32px instead of 16px

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
              isBottomSheet={isBottomSheet}
              bottomContentLabel={bottomContentLabel}
            />
            <div
              className={classnames(
                `${localClassName}__content-children`,
                needsExtraPadding && `${localClassName}__content-children--extra-padding`,
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
