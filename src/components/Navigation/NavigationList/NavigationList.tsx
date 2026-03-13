import classNames from 'classnames';
import * as React from 'react';
import { px } from '../../../utils';
import NavigationItem from '../NavigationItem/NavigationItem';
import { NavigationItemProps } from '../NavigationItem/NavigationItem';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import NavigationItemWithSubmenu from '../NavigationItemWithSubmenu/NavigationItemWithSubmenu';

export interface NavigationListProps extends React.ComponentProps<'ul'> {
  /**
   * id for the navigation list
   */
  id: string;
  /**
   * Is the nav list offscreen?
   */
  isOffScreen?: boolean;
  /**
   * Rewrite the onClick event
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * When false (desktop), wrap in Radix NavigationMenu.List and pass desktop behavior to children.
   * When true or omitted (mobile), render plain list and pass mobile behavior to children.
   */
  isMobile?: boolean;
}

function NavigationListContent({ children, isMobile = true }: { children: React.ReactNode; isMobile?: boolean }) {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === NavigationItem) {
          return React.cloneElement(child as React.ReactElement<NavigationItemProps>, {
            isMobile,
          });
        }
        if (React.isValidElement(child) && child.type === NavigationItemWithSubmenu) {
          return React.cloneElement(child as React.ReactElement<{ isMobile?: boolean }>, {
            isMobile,
          });
        }
        return child;
      })}
    </>
  );
}

/**
 * ## Overview
 *
 * Top-level nav list used inside Navigation. Renders direct children (NavigationItem, NavigationItemWithSubmenu).
 * For submenu content with left/right sections, use NavigationSubmenu inside NavigationItemWithSubmenu.
 */
const NavigationList = React.forwardRef<HTMLUListElement, NavigationListProps>(
  ({ id, children, className, isOffScreen, onClick: _onClick, isMobile = true }, ref) => {
    const listContent = <NavigationListContent isMobile={isMobile}>{children}</NavigationListContent>;

    const listClassName = classNames(className, `${px}-nav__list`, {
      [`${px}-nav__list--offscreen`]: isOffScreen,
    });

    if (!isMobile) {
      return (
        <NavigationMenu.List asChild>
          <ul aria-hidden={isOffScreen} id={id} data-testid={id} role="list" className={listClassName} ref={ref}>
            {listContent}
          </ul>
        </NavigationMenu.List>
      );
    }

    return (
      <ul aria-hidden={isOffScreen} id={id} data-testid={id} role="list" className={listClassName} ref={ref}>
        {listContent}
      </ul>
    );
  },
);

NavigationList.displayName = 'NavigationList';
export default NavigationList;
