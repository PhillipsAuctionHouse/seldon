import { ComponentProps, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import { DrawerProps } from './Drawer';

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
const Bookend = ({ baseClassName, drawerOpenSide, onClose, bookendSide: thisBookendSide, ...rest }: BookendProps) => (
  <div className={`${baseClassName}__bookend ${baseClassName}__bookend-${thisBookendSide}`} {...rest}>
    {(drawerOpenSide === thisBookendSide || (drawerOpenSide === 'bottom' && thisBookendSide === 'left')) && (
      <Dialog.Close asChild>
        <IconButton onClick={onClose} aria-label="Close" data-testid="drawer-close" variant={ButtonVariants.tertiary}>
          <Icon icon="CloseX" color="currentColor" />
        </IconButton>
      </Dialog.Close>
    )}
  </div>
);

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ baseClassName: parentBaseClassName, headerText, drawerOpenSide, onClose }, _ref) => {
    const baseClassName = `${parentBaseClassName}-header`;
    return (
      <>
        <div className={baseClassName}>
          <Bookend baseClassName={baseClassName} onClose={onClose} drawerOpenSide={drawerOpenSide} bookendSide="left" />
          <h3 className={`${baseClassName}__title`}>{headerText}</h3>
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
