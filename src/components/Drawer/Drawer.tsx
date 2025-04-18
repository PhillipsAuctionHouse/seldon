import React from 'react';
import { getCommonProps, noOp } from '../../utils';
import classnames from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';

// You'll need to change the HTMLDivElement to match the top-level element of your component
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
}
/**
 * ## Overview
 *
 * A component for displaying a drawer.
 *
 */
const Drawer = ({ className, isOpen = false, onClose = noOp, children, ...props }: DrawerProps) => {
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
        <Dialog.Overlay
          onClick={onClose}
          className={classnames(`${baseClassName}__overlay`)}
          data-testid="drawer-overlay"
        />
        <Dialog.Content className={classnames(baseClassName, className)} id={props.id} {...commonProps}>
          <Dialog.Title />
          <Dialog.Description />
          <Dialog.Close asChild>
            <IconButton
              onClick={onClose}
              className={classnames(`${baseClassName}__close`)}
              aria-label="Close"
              data-testid="drawer-close"
              variant={ButtonVariants.tertiary}
            >
              <Icon icon="CloseX" />
            </IconButton>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Drawer;
