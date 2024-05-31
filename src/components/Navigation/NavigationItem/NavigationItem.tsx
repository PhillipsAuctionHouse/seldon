import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';
import Link from '../../Link/Link';
import { LinkVariants } from '../../Link/utils';

export interface NavigationItemProps extends React.HTMLAttributes<HTMLElement> {
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
  /**
   * Optional click handler
   */
  handleOnClick?: () => void;
  /**
   *  Blur handler for keyboard a11y for nested list
   */
  onBlur?: (e: React.FocusEvent) => void;
}

const NavigationItem = ({
  children,
  className = '',
  handleOnClick,
  href,
  label,
  navGroup,
  navType,
  ...props
}: React.PropsWithChildren<NavigationItemProps>) => (
  <li data-testid={`nav-item`} className={classNames(`${px}-nav__item`, navGroup, className)} onClick={handleOnClick}>
    <Link {...props} href={href} variant={navType ? navType : LinkVariants.navMain}>
      <span className={`${px}-nav__item--label`}>{label}</span>
      {children}
    </Link>
  </li>
);

export default NavigationItem;
