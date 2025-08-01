import { ComponentProps, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';

type BaseClassName = { baseClassName: string };
type DrawerHeaderHelperProps = ComponentProps<'div'> & BaseClassName;
type DrawerHeaderProps = BaseClassName & {
  headerText?: string;
  onClose: () => void;
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
    { baseClassName: parentBaseClassName, headerText, onClose }: DrawerHeaderProps,
    _ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const baseClassName = `${parentBaseClassName}-header`;
    return (
      <>
        <DrawerHeaderContainer baseClassName={baseClassName}>
          <DrawerHeaderBookend baseClassName={baseClassName} />
          <h3 className={`${baseClassName}__title`}>{headerText}</h3>
          <DrawerHeaderBookend baseClassName={baseClassName}>
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
