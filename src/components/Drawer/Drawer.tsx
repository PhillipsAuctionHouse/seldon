import * as Dialog from '@radix-ui/react-dialog';
import classnames from 'classnames';
import React from 'react';
import { getCommonProps, noOp } from '../../utils';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import IconButton from '../IconButton/IconButton';

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
   * Which side the drawer opens from: left, right, or bottom
   */
  drawerOpenSide?: 'left' | 'right' | 'bottom';
}

/**
 * ## Overview
 *
 * A component for displaying a drawer.
 *
 */
const Drawer = ({
  className,
  isOpen = false,
  onClose = noOp,
  children,
  drawerOpenSide = 'right',
  ...props
}: DrawerProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Drawer');
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
        <Dialog.Overlay
          onClick={onClose}
          className={classnames(`${baseClassName}__overlay`)}
          data-testid="drawer-overlay"
        />
        <Dialog.Content
          className={classnames(baseClassName, className, { [`${baseClassName}--bottom`]: isBottomSheet })}
          data-side={drawerOpenSide}
          id={props.id}
          {...commonProps}
        >
          <Dialog.Title />
          <Dialog.Description />
          {!isBottomSheet ? (
            <Dialog.Close asChild>
              <IconButton
                onClick={onClose}
                className={classnames(`${baseClassName}__close`)}
                aria-label="Close"
                data-testid="drawer-close"
                variant={ButtonVariants.tertiary}
              >
                <Icon icon="CloseX" color="currentColor" />
              </IconButton>
            </Dialog.Close>
          ) : null}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Drawer;
