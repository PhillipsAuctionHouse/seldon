import React, { ComponentProps } from 'react';
import { getCommonProps, noOp } from '../../utils';
import classnames from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';

/* Drawer header helpers */

let headerBaseClassName = '';

// Header container component
const DrawerHeaderContainer = ({ children, ...props }: ComponentProps<'div'>) => (
  <div className={headerBaseClassName} {...props}>
    {children}
  </div>
);

// Helps divide space in the header
const DrawerHeaderBookend = ({ children }: ComponentProps<'div'>) => (
  <div className={`${headerBaseClassName}__bookend`}>{children}</div>
);

// Horizontal rule for the drawer header, a drawer horizontal rule if you will
const DrawerHorizontalRule = () => <div className={`${headerBaseClassName}__hr`} />;

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
   * A string to be displayed center on top of the drawer, up with the close button.
   * Its presence also triggers the horizontal rule below the header to be rendered.
   */
  headerText?: string;
}

/**
 * ## Overview
 *
 * A component for displaying a drawer.
 *
 */

const Drawer = ({ className, isOpen = false, onClose = noOp, headerText, children, ...props }: DrawerProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Drawer');
  headerBaseClassName = `${baseClassName}-header`;
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
        <Dialog.Content className={classnames(baseClassName, className)} id={props.id} {...commonProps}>
          <DrawerHeaderContainer>
            <DrawerHeaderBookend />
            <Dialog.Title className={`${baseClassName}-header__title`}>{headerText}</Dialog.Title>
            <DrawerHeaderBookend>
              <Dialog.Close asChild>
                <IconButton
                  onClick={onClose}
                  aria-label="Close"
                  data-testid="drawer-close"
                  variant={ButtonVariants.tertiary}
                >
                  <Icon icon="CloseX" color="currentColor" />
                </IconButton>
              </Dialog.Close>
            </DrawerHeaderBookend>
          </DrawerHeaderContainer>
          {headerText && <DrawerHorizontalRule />}
          <Dialog.Description />
          <div className={`${baseClassName}__content-children`}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Drawer;
