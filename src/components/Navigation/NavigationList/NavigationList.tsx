import classNames from 'classnames';
import * as React from 'react';
import { px } from '../../../utils';
import { Text, TextVariants } from '../../Text';
import NavigationItem from '../NavigationItem/NavigationItem';
import { NavigationItemProps } from '../NavigationItem/NavigationItem';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

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
   * Optional left section heading
   */
  leftSectionHeading?: string;
  /**
   * Optional right section heading
   */
  rightSectionHeading?: string;
  /**
   * Rewrite the onClick event
   * */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * When true (desktop only), wrap in Radix NavigationMenu.List for accessibility
   */
  asRadixList?: boolean;
  /**
   * When true (desktop submenu content), wrap each section item in NavigationMenu.Link so submenu closes on link click
   */
  wrapLinksInRadixLink?: boolean;
}

const NavigationList = React.forwardRef<HTMLUListElement, NavigationListProps>(
  (
    {
      id,
      children,
      className,
      isOffScreen,
      leftSectionHeading,
      rightSectionHeading,
      onClick,
      asRadixList,
      wrapLinksInRadixLink,
    },
    ref,
  ) => {
    // Submenu left section: items with navGroup='nav-link-start', optionally wrapped in Radix Link for close-on-click
    const leftSectionItems = React.Children.toArray(children)
      .map((child) => {
        if (
          React.isValidElement(child) &&
          (child as React.ReactElement<NavigationItemProps>).props.navGroup === 'nav-link-start'
        ) {
          return React.cloneElement(child as React.ReactElement<NavigationItemProps>, {
            onClick: (e: React.MouseEvent<HTMLElement>) => {
              onClick?.(e);
              child.props?.onClick?.(e);
            },
            ...(wrapLinksInRadixLink ? { asRadixSubmenuLink: true } : {}),
          });
        }
      })
      .filter(Boolean);

    // Submenu right section: items with navGroup='nav-link-end', optionally wrapped in Radix Link for close-on-click
    const rightSectionItems = React.Children.toArray(children)
      .map((child) => {
        if (
          React.isValidElement(child) &&
          (child as React.ReactElement<NavigationItemProps>).props.navGroup === 'nav-link-end'
        ) {
          return React.cloneElement(child as React.ReactElement<NavigationItemProps>, {
            onClick: (e: React.MouseEvent<HTMLElement>) => {
              onClick?.(e);
              child.props?.onClick?.(e);
            },
            ...(wrapLinksInRadixLink ? { asRadixSubmenuLink: true } : {}),
          });
        }
      })
      .filter(Boolean);

    // Desktop top-level only: wrap each direct NavigationItem in Radix Item+Link for arrow-key navigation
    const topLevelChildren =
      asRadixList && !leftSectionItems.length && !rightSectionItems.length
        ? React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === NavigationItem) {
              return React.cloneElement(child as React.ReactElement<NavigationItemProps>, {
                asRadixLink: true,
              });
            }
            return child;
          })
        : null;

    // One of: left section + right section (submenu), or top-level items (no sections)
    const listContent = (
      <>
        {leftSectionItems.length > 0 ? (
          /* Left section (submenu links) */
          <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--start`)}>
            {leftSectionHeading ? (
              <Text variant={TextVariants.headingMedium} className={`${px}-nav__list__section--start__title`}>
                {leftSectionHeading}
              </Text>
            ) : null}
            {leftSectionItems}
          </div>
        ) : null}
        {rightSectionItems.length > 0 ? (
          /* Right section (e.g. "View all" link) */
          <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--end`)}>
            {rightSectionHeading ? (
              <Text variant={TextVariants.headingMedium} className={`${px}-nav__list__section--end__title`}>
                {rightSectionHeading}
              </Text>
            ) : null}
            {rightSectionItems}
          </div>
        ) : null}
        {/* No sections: top-level nav items only (desktop main list or mobile) */}
        {!leftSectionItems.length && !rightSectionItems.length ? (topLevelChildren ?? children) : null}
      </>
    );

    const listClassName = classNames(className, `${px}-nav__list`, {
      [`${px}-nav__list--offscreen`]: isOffScreen,
    });

    // Desktop Radix: wrap in NavigationMenu.List for role and keyboard nav
    if (asRadixList) {
      return (
        <NavigationMenu.List asChild>
          <ul aria-hidden={isOffScreen} id={id} data-testid={id} role="list" className={listClassName} ref={ref}>
            {listContent}
          </ul>
        </NavigationMenu.List>
      );
    }

    // Plain list (mobile or non-Radix)
    return (
      <ul aria-hidden={isOffScreen} id={id} data-testid={id} role="list" className={listClassName} ref={ref}>
        {listContent}
      </ul>
    );
  },
);

NavigationList.displayName = 'NavigationList';
export default NavigationList;
