import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';
import Link, { LinkProps } from '../../Link/Link';
import { LinkVariants } from '../../Link/types';
import { HeaderContext } from '../../Header/Header';

export interface NavigationItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
  /**
   * Optional badge for navigation item. Used currently for location of auctions
   */
  badge?: React.ReactNode;
  /**
   * href link
   */
  href?: string;
  /**
   * Optional listen to onClick event
   */
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  /**
   * Label for the navigation item
   */
  label?: React.ReactNode;
  /**
   * Optional group for navigation items
   */
  navGroup?: 'nav-link-lg' | 'nav-link-sm';
  /**
   * Optional type for navigation item
   */
  navType?: LinkVariants;
  /**
   * Element to render within the navigation item, renders <Link> by default
   */
  element?: React.ElementType<LinkProps>;
}

const NavigationItem = ({
  badge,
  className = '',
  href,
  label,
  navGroup,
  navType,
  onClick,
  element: Component = Link,
  ...props
}: React.PropsWithChildren<NavigationItemProps>) => {
  const { expandedItem } = React.useContext(HeaderContext);

  return (
    <li
      {...props}
      onClick={onClick}
      data-testid={`nav-item-${label}`}
      className={classNames(`${px}-nav__item`, navGroup, className)}
    >
      <Component
        href={href}
        variant={navType ? navType : LinkVariants.snwHeaderLink}
        tabIndex={expandedItem === '' ? 0 : -1}
      >
        <span className={`${px}-nav__item--label`}>{label}</span>
        {badge ? <span className={`${px}-nav__item--badge `}>{` • ${badge}`}</span> : null}
      </Component>
    </li>
  );
};

export default NavigationItem;
