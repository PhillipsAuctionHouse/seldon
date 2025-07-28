import * as Dialog from '@radix-ui/react-dialog';
import classnames from 'classnames';
import React from 'react';
import { getCommonProps, noOp } from '../../utils';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import IconButton from '../IconButton/IconButton';
import Text from '../Text/Text';
import { TextVariants } from '../Text/types';

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
const Drawer = ({
  className,
  isOpen = false,
  onClose = noOp,
  children,
  drawerOpenSide = 'right',
  bottomContentLabel,
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
          ) : (
            <div className={`${baseClassName}__bottom-content`}>
              <Dialog.Close asChild>
                <IconButton
                  onClick={onClose}
                  className={classnames(`${baseClassName}__close--bottom`)}
                  aria-label="Close"
                  data-testid="drawer-close"
                  variant={ButtonVariants.tertiary}
                >
                  <Icon icon="CloseX" color="currentColor" />
                </IconButton>
              </Dialog.Close>
              <Text variant={TextVariants.string1} className={`${baseClassName}__bottom-content--label`}>
                {bottomContentLabel}
              </Text>
            </div>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Drawer;
