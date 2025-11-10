import { ComponentProps, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import { DrawerProps } from './Drawer';
import { Text, TextVariants } from '../Text';

type CommonProps = ComponentProps<'div'> & {
  baseClassName: string;
  drawerOpenSide: DrawerProps['drawerOpenSide'];
  onClose: () => void;
};
type BookendProps = CommonProps & {
  bookendSide: 'left' | 'right';
};
export type DrawerHeaderProps = CommonProps & {
  headerText?: string;
};

// There is a Bookend component on either side of the header, the close button renders in whichever
// one matches the side the drawer opened on (or on the left, if the drawer opens from the bottom)
// The close button should always be on the right, unless the drawerOpenSide is 'bottom', in which case it should be on the left.
const Bookend = ({ baseClassName, drawerOpenSide, onClose, bookendSide: thisBookendSide, ...rest }: BookendProps) => {
  const shouldShowClose =
    (drawerOpenSide === 'bottom' && thisBookendSide === 'left') ||
    (drawerOpenSide !== 'bottom' && thisBookendSide === 'right');
  return (
    <div className={`${baseClassName}__bookend ${baseClassName}__bookend-${thisBookendSide}`} {...rest}>
      {shouldShowClose && (
        <Dialog.Close asChild>
          <IconButton onClick={onClose} aria-label="Close" data-testid="drawer-close" variant={ButtonVariants.tertiary}>
            <Icon icon="CloseX" color="currentColor" />
          </IconButton>
        </Dialog.Close>
      )}
    </div>
  );
};

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ baseClassName: parentBaseClassName, headerText, drawerOpenSide, onClose }, _ref) => {
    const baseClassName = `${parentBaseClassName}-header`;
    return (
      <>
        <div className={baseClassName}>
          <Bookend baseClassName={baseClassName} onClose={onClose} drawerOpenSide={drawerOpenSide} bookendSide="left" />
          <Text variant={TextVariants.headingSmall} className={`${baseClassName}__title`}>
            {headerText}
          </Text>
          <Bookend
            baseClassName={baseClassName}
            onClose={onClose}
            drawerOpenSide={drawerOpenSide}
            bookendSide="right"
          />
        </div>
        {headerText && <div className={`${baseClassName}__hr`} />}
      </>
    );
  },
);

DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
