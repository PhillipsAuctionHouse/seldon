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

    // When asRadixList, wrap top-level NavigationItem in Radix Item+Link so arrow keys work between all items
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
        {!leftSectionItems.length && !rightSectionItems.length ? (topLevelChildren ?? children) : null}
      </>
    );

    const listClassName = classNames(className, `${px}-nav__list`, {
      [`${px}-nav__list--offscreen`]: isOffScreen,
    });

    if (asRadixList) {
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
