import { ComponentProps, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import { getCommonProps } from '../../utils';

const withDisplayName = <T, Props>(displayName: string, component: React.ForwardRefRenderFunction<T, Props>) =>
  Object.assign(forwardRef(component), { displayName });

type BaseClassName = { baseClassName: string };
type DrawerHeaderHelperProps = ComponentProps<'div'> & BaseClassName;
type DrawerHeaderProps = BaseClassName & {
  headerText?: string;
  onClose: () => void;
};

const DrawerHeaderContainer = withDisplayName<HTMLDivElement, DrawerHeaderHelperProps>(
  'DrawerHeaderContainer',
  ({ baseClassName, children, ...rest }, ref) => (
    <div className={baseClassName} ref={ref} {...rest}>
      {children}
    </div>
  ),
);

const DrawerHeaderBookend = withDisplayName<HTMLDivElement, DrawerHeaderHelperProps>(
  'DrawerHeaderBookend',
  ({ baseClassName, children, ...rest }, ref) => (
    <div className={`${baseClassName}__bookend`} ref={ref} {...rest}>
      {children}
    </div>
  ),
);

const DrawerHeaderHorizontalRule = withDisplayName<HTMLDivElement, DrawerHeaderHelperProps>(
  'DrawerHorizontalRule',
  ({ baseClassName, children, ...rest }, ref) => <div className={`${baseClassName}__hr`} ref={ref} {...rest} />,
);

const DrawerHeaderBase = ({ baseClassName, headerText, onClose, ...props }: DrawerHeaderProps) => {
  const { className, ...commonProps } = getCommonProps(props, `${baseClassName.replace('seldon-', '')}-header`);
  return (
    <>
      <DrawerHeaderContainer baseClassName={className} {...commonProps}>
        <DrawerHeaderBookend baseClassName={className} />
        <Dialog.Title className={`${className}__title`} id={className}>
          {headerText}
        </Dialog.Title>
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

export const DrawerHeader = withDisplayName<never, DrawerHeaderProps>('DrawerHeader', DrawerHeaderBase);
