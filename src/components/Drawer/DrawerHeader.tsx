import { ComponentProps, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';

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
  ({ baseClassName, children }, ref) => (
    <div className={baseClassName} ref={ref}>
      {children}
    </div>
  ),
);

const DrawerHeaderBookend = withDisplayName<HTMLDivElement, DrawerHeaderHelperProps>(
  'DrawerHeaderBookend',
  ({ baseClassName, children }, ref) => (
    <div className={`${baseClassName}__bookend`} ref={ref}>
      {children}
    </div>
  ),
);

const DrawerHorizontalRule = withDisplayName<HTMLDivElement, DrawerHeaderHelperProps>(
  'DrawerHorizontalRule',
  ({ baseClassName }, ref) => <div className={`${baseClassName}__hr`} ref={ref} />,
);

const DrawerHeaderBase = ({ baseClassName, headerText, onClose }: DrawerHeaderProps) => (
  <>
    <DrawerHeaderContainer baseClassName={baseClassName}>
      <DrawerHeaderBookend baseClassName={baseClassName} />
      <Dialog.Title className={`${baseClassName}__title`} id={baseClassName}>
        {headerText}
      </Dialog.Title>
      <DrawerHeaderBookend baseClassName={baseClassName}>
        <Dialog.Close asChild>
          <IconButton onClick={onClose} aria-label="Close" data-testid="drawer-close" variant={ButtonVariants.tertiary}>
            <Icon icon="CloseX" color="currentColor" />
          </IconButton>
        </Dialog.Close>
      </DrawerHeaderBookend>
    </DrawerHeaderContainer>
    {headerText && <DrawerHorizontalRule baseClassName={baseClassName} />}
  </>
);

export const DrawerHeader = withDisplayName<never, DrawerHeaderProps>('DrawerHeader', DrawerHeaderBase);
