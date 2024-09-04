import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';
import { NavigationItemProps } from '../NavigationItem/NavigationItem';

export interface NavigationListProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * id for the navigation list
   */
  id: string;
}

const NavigationList = ({ id, children, className }: React.PropsWithChildren<NavigationListProps>) => {
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
    <ul id={id} data-testid={id} role="list" className={classNames(className, `${px}-nav__list`)}>
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
