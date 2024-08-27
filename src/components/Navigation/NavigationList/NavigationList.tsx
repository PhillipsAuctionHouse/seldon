import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';
import { NavigationItemProps } from '../NavigationItem/NavigationItem';
import { HeaderContext } from '../../Header/Header';

export interface NavigationListProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * id for the navigation list
   */
  id: string;
  /**
   * Is the nav list offscreen?
   */
  isOffScreen?: boolean;
}

const NavigationList: React.FC<NavigationListProps> = ({ id, children, className, isOffScreen, ...props }) => {
  const { isExpanded } = React.useContext(HeaderContext);
  const largeCtaItems = React.Children.toArray(children).filter((child) => {
    if (child && (child as React.ReactElement<NavigationItemProps>).props.navGroup === 'nav-link-lg') {
      return child;
    }
  });
  const smallCtaItems = React.Children.toArray(children).filter((child) => {
    if (child && (child as React.ReactElement<NavigationItemProps>).props.navGroup === 'nav-link-sm') {
      return child;
    }
  });
  return (
    <ul
      id={id}
      data-testid={id}
      role="list"
      aria-expanded={isExpanded}
      className={classNames(className, `${px}-nav__list`, {
        [`${px}-nav__list--expanded`]: isExpanded,
        [`${px}-nav__list--offscreen`]: isOffScreen,
      })}
      {...props}
    >
      {largeCtaItems.length > 0 ? (
        <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--large-cta`)}>
          {largeCtaItems}
        </div>
      ) : null}
      {smallCtaItems.length > 0 ? (
        <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--small-cta`)}>
          {smallCtaItems}
        </div>
      ) : null}
      {!largeCtaItems.length && !smallCtaItems.length ? children : null}
    </ul>
  );
};

export default NavigationList;
