import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';
import { NavigationItemProps } from '../NavigationItem/NavigationItem';
import { Text, TextVariants } from '../../Text';

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
}

const NavigationList = React.forwardRef<HTMLUListElement, NavigationListProps>(
  ({ id, children, className, isOffScreen, leftSectionHeading, rightSectionHeading, onClick }, ref) => {
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
          });
        }
      })
      .filter(Boolean);

    return (
      <ul
        aria-hidden={isOffScreen}
        id={id}
        data-testid={id}
        role="list"
        className={classNames(className, `${px}-nav__list`, { [`${px}-nav__list--offscreen`]: isOffScreen })}
        ref={ref}
      >
        {leftSectionItems.length > 0 ? (
          <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--start`)}>
            {leftSectionHeading ? (
              <Text variant={TextVariants.heading4} className={`${px}-nav__list__section--start__title`}>
                {leftSectionHeading}
              </Text>
            ) : null}
            {leftSectionItems}
          </div>
        ) : null}
        {rightSectionItems.length > 0 ? (
          <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--end`)}>
            {rightSectionHeading ? (
              <Text variant={TextVariants.heading4} className={`${px}-nav__list__section--end__title`}>
                {rightSectionHeading}
              </Text>
            ) : null}
            {rightSectionItems}
          </div>
        ) : null}
        {!leftSectionItems.length && !rightSectionItems.length ? children : null}
      </ul>
    );
  },
);

NavigationList.displayName = 'NavigationList';
export default NavigationList;
