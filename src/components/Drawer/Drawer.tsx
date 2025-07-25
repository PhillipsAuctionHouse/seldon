import React from 'react';
import { getCommonProps, noOp } from '../../utils';
import classnames from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';

import { DrawerHeader } from './DrawerHeader';

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
}

/**
 * ## Overview
 *
 * A component for displaying a drawer.
 *
 */

const Drawer = ({ className, isOpen = false, onClose = noOp, headerText, children, ...props }: DrawerProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Drawer');
  const headerBaseClassName = `${baseClassName}-header`;
  const descriptionId = headerText ? headerBaseClassName : undefined;

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
        <Dialog.Content
          className={classnames(baseClassName, className)}
          id={props.id}
          aria-describedby={descriptionId}
          {...commonProps}
        >
          <DrawerHeader baseClassName={headerBaseClassName} headerText={headerText} onClose={onClose} />
          {headerText && (
            <Dialog.Description id={descriptionId} style={{ display: 'none' }}>
              {headerText}
            </Dialog.Description>
          )}
          <div className={`${baseClassName}__content-children`}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Drawer;
