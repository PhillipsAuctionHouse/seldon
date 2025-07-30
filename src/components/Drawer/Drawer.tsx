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
   * Accessibility label for the drawer, used for screen readers.
   * Defaults to the headerText if provided, otherwise an empty string.
   */
  ariaTitle?: string;
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
      className,
      isOpen = false,
      onClose = noOp,
      headerText,
      title,
      ariaTitle = headerText ?? title ?? '',
      children,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Drawer');

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
          <Dialog.Overlay onClick={onClose} className={`${baseClassName}__overlay`} data-testid="drawer-overlay" />
          <Dialog.Content className={classnames(baseClassName, className)} id={props.id} {...commonProps} ref={ref}>
            <VisuallyHidden asChild>
              <Dialog.Title>{ariaTitle}</Dialog.Title>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <Dialog.Description>{ariaTitle}</Dialog.Description>
            </VisuallyHidden>
            <DrawerHeader baseClassName={baseClassName} headerText={headerText} onClose={onClose} />
            <div className={`${baseClassName}__content-children`}>{children}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

Drawer.displayName = 'Drawer';

export default Drawer;
