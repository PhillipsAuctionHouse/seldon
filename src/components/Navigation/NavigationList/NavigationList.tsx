import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';
import { NavigationItemProps } from '../NavigationItem/NavigationItem';
import { HeaderContext } from '../../Header/Header';

export type NavigationListProps = React.HTMLAttributes<HTMLElement>;

const NavigationList = ({ children }: React.PropsWithChildren<NavigationListProps>) => {
  const { expanded } = React.useContext(HeaderContext);
  const largeCtaItems: React.ReactNode[] = [];
  const smallCtaItems: React.ReactNode[] = [];
  React.Children.map(
    children as React.ReactElement<NavigationItemProps>[],
    (child: React.ReactElement<NavigationItemProps>) => {
      if (child && child.props.navGroup === 'nav-link-lg') {
        largeCtaItems.push(child);
      } else if (child && child.props.navGroup === 'nav-link-sm') {
        smallCtaItems.push(child);
      }
    },
  );

  return (
    <ul
      id="nav-list"
      data-testid="nav-list"
      className={classNames(`${px}-nav__list`, { [`${px}-nav__list--expanded`]: expanded })}
    >
      {largeCtaItems.length > 0 ? (
        <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--large-cta`)}>
          {largeCtaItems.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </div>
      ) : null}
      {smallCtaItems.length > 0 ? (
        <div className={classNames(`${px}-nav__list__section`, `${px}-nav__list__section--small-cta`)}>
          {smallCtaItems.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </div>
      ) : null}
      {!largeCtaItems.length && !smallCtaItems.length ? children : null}
    </ul>
  );
};

export default NavigationList;
