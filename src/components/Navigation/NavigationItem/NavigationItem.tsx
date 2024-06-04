import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';
import Link from '../../Link/Link';
import { LinkVariants } from '../../Link/utils';
import { HeaderContext } from '../../Header/Header';

export interface NavigationItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional badge for navigation item. Used currently for location of auctions
   */
  badge?: string;
  /**
   * href link
   */
  href: string;
  /**
   * Label for the navigation item
   */
  label?: string;
  /**
   * Optional group for navigation items
   */
  navGroup?: 'nav-link-lg' | 'nav-link-sm';
  /**
   * Optional type for navigation item
   */
  navType?: LinkVariants;
}

const NavigationItem = ({
  badge,
  className = '',
  href,
  label,
  navGroup,
  navType,
  ...props
}: React.PropsWithChildren<NavigationItemProps>) => {
  const { expandedItem } = React.useContext(HeaderContext);
  return (
    <li data-testid={`nav-item`} className={classNames(`${px}-nav__item`, navGroup, className)}>
      <Link
        {...props}
        href={href}
        variant={navType ? navType : LinkVariants.navMain}
        tabIndex={expandedItem === '' ? 0 : -1}
      >
        <span className={`${px}-nav__item--label`}>{label}</span>
        {badge ? <span className={`${px}-nav__item--badge `}>{badge}</span> : null}
      </Link>
    </li>
  );
};

export default NavigationItem;
