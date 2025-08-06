import React, { forwardRef } from 'react';
import classnames from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { getCommonProps, noOp } from '../../utils';
import DrawerHeader from './DrawerHeader';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';

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
   * Defaults to the headerText if that's provided, otherwise an empty string.
   */
  title?: string;
  /**
   * Used as the accessibility description for the drawer, used for screen readers.
   * Defaults to the title if that's provided, otherwise an empty string.
   */
  description?: string;
  /**
   * Which side the drawer opens from: left, right, or bottom
   */
  drawerOpenSide?: 'left' | 'right' | 'bottom';
  /**
   * Older designs for left/right drawers have more padding around the content.
   * This value is in rem, and must be an integer under 3.
   *
   * Default is 2 if null or undefined, or 1 if headingText is supplied. This is silly
   * but aligns with design and allows this prop to be left out most of the time.
   */
  paddingLevel?: 0 | 1 | 2;
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
      isOpen,
      onClose = noOp,
      headerText,
      title,
      description = title,
      drawerOpenSide = 'right',
      paddingLevel,
      className: classNameFromParent,
      children,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Drawer');
    const isBottomSheet = drawerOpenSide === 'bottom';

    // the most common value for paddingLevel is 2. some newer designs with header text use 1. 0 is used by the filter drawer.
    // this might be better served on a usage-by-usage basis, but I hope drawer designs will be consistent enough that this is fine.
    paddingLevel ??= headerText ? 1 : 2;
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
            className={classnames(baseClassName, classNameFromParent, {
              [`${baseClassName}--bottom`]: isBottomSheet,
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
              <Dialog.Description>{description}</Dialog.Description>
            </VisuallyHidden>
            {headerText ? (
              <DrawerHeader
                baseClassName={baseClassName}
                headerText={headerText}
                onClose={onClose}
                drawerOpenSide={drawerOpenSide}
              />
            ) : (
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
            )}
            <div
              className={classnames(
                `${baseClassName}__content`,
                paddingLevel < 3 && `${baseClassName}__content--ep${paddingLevel}`,
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
