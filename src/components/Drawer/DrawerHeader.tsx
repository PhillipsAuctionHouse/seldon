import { ComponentProps } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import { getCommonProps, px } from '../../utils';

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

const DrawerHeaderBase = ({ baseClassName, headerText, onClose, ...props }: DrawerHeaderProps) => {
  const { className, ...commonProps } = getCommonProps(props, `${baseClassName.replace(px, '')}-header`);
  return (
    <>
      <DrawerHeaderContainer baseClassName={className} {...commonProps}>
        <DrawerHeaderBookend baseClassName={className} />
        <p className={`${className}__title`}>{headerText}</p>
        <DrawerHeaderBookend baseClassName={className}>
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
      {headerText && <DrawerHeaderHorizontalRule baseClassName={className} />}
    </>
  );
};

DrawerHeaderContainer.displayName = 'DrawerHeaderContainer';
DrawerHeaderBookend.displayName = 'DrawerHeaderBookend';
DrawerHeaderHorizontalRule.displayName = 'DrawerHeaderHorizontalRule';
DrawerHeaderBase.displayName = 'DrawerHeader';

export const DrawerHeader = DrawerHeaderBase;
