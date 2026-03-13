import classNames from 'classnames';
import * as React from 'react';
import { px } from '../../../utils';
import { Text, TextVariants } from '../../Text';
import type { NavigationItemProps } from '../NavigationItem/NavigationItem';

export interface NavigationSubmenuProps extends React.ComponentProps<'ul'> {
  /**
   * id for the submenu list
   */
  id: string;
  /**
   * Optional left section heading (for nav-link-start items)
   */
  leftSectionHeading?: string;
  /**
   * Optional right section heading (for nav-link-end items, e.g. "View all")
   */
  rightSectionHeading?: string;
  /**
   * Rewrite the onClick event (e.g. close menu on link click)
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * When true (desktop submenu content), wrap each section item in NavigationMenu.Link so submenu closes on link click
   */
  wrapLinksInRadixLink?: boolean;
}

/**
 * ## Overview
 *
 * Used as the content of a submenu (inside NavigationItemWithSubmenu). Renders left and right sections
 * from NavigationItem children with navGroup="nav-link-start" and navGroup="nav-link-end".
 *
 * Use NavigationList for the top-level nav in Navigation; use NavigationSubmenu for dropdown submenus.
 */
const NavigationSubmenu = React.forwardRef<HTMLUListElement, NavigationSubmenuProps>(
  (
    { id, children, className, leftSectionHeading, rightSectionHeading, onClick, wrapLinksInRadixLink, ...props },
    ref,
  ) => {
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

    const listContent = (
      <>
        {leftSectionItems.length > 0 ? (
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
          <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--end`)}>
            {rightSectionHeading ? (
              <Text variant={TextVariants.headingMedium} className={`${px}-nav__list__section--end__title`}>
                {rightSectionHeading}
              </Text>
            ) : null}
            {rightSectionItems}
          </div>
        ) : null}
      </>
    );

    const listClassName = classNames(className, `${px}-nav__list`);

    return (
      <ul id={id} data-testid={id} role="list" className={listClassName} ref={ref} {...props}>
        {listContent}
      </ul>
    );
  },
);

NavigationSubmenu.displayName = 'NavigationSubmenu';
export default NavigationSubmenu;
