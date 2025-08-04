import { ComponentProps, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Text from '../Text/Text';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import classnames from 'classnames';
import { TextVariants } from '../Text';

type BaseClassName = { baseClassName: string };
type DrawerHeaderHelperProps = ComponentProps<'div'> & BaseClassName;
type DrawerHeaderProps = BaseClassName & {
  headerText?: string;
  onClose: () => void;
  isBottomSheet?: boolean;
  bottomContentLabel?: string;
};

const DrawerHeaderContainer = ({ baseClassName, children, ...rest }: DrawerHeaderHelperProps) => (
  <div className={baseClassName} {...rest}>
    {children}
  </div>
);

const DrawerHeaderBookend = ({ baseClassName, children, ...rest }: DrawerHeaderHelperProps) => (
  <div className={`${baseClassName}__bookend`} {...rest}>
    {children}
  </div>
);

const DrawerHeaderHorizontalRule = ({ baseClassName, children, ...rest }: DrawerHeaderHelperProps) => (
  <div className={`${baseClassName}__hr`} {...rest} />
);

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  (
    { baseClassName: parentBaseClassName, headerText, onClose, isBottomSheet, bottomContentLabel }: DrawerHeaderProps,
    _ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const baseClassName = `${parentBaseClassName}-header`;
    return (
      <>
        <DrawerHeaderContainer baseClassName={baseClassName}>
          <DrawerHeaderBookend baseClassName={baseClassName} />
          <h3 className={`${baseClassName}__title`}>{headerText}</h3>
          <DrawerHeaderBookend baseClassName={baseClassName}>
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
          </DrawerHeaderBookend>
        </DrawerHeaderContainer>
        {headerText && <DrawerHeaderHorizontalRule baseClassName={baseClassName} />}
      </>
    );
  },
);

DrawerHeaderContainer.displayName = 'DrawerHeaderContainer';
DrawerHeaderBookend.displayName = 'DrawerHeaderBookend';
DrawerHeaderHorizontalRule.displayName = 'DrawerHeaderHorizontalRule';
DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
