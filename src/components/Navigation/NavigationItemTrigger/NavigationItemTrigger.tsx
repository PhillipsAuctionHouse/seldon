import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';

export interface NavigationItemTriggerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Label for the navigation item
   */
  label: string;
  /**
   * ID of expanded item
   */
  expandedItem?: string;
  /**
   * Click handler to toggle sub nav open/close
   */
  handleOnClick?: () => void;
}

const NavigationItemTrigger = ({
  label,
  children,
  expandedItem,
  handleOnClick,
  ...props
}: React.PropsWithChildren<NavigationItemTriggerProps>) => (
  <li
    className={classNames(`${px}-nav__item`, { [`${px}-nav__item--expanded`]: expandedItem === label })}
    onClick={handleOnClick}
  >
    <button className={`${px}-nav__item-trigger`} type="button" aria-expanded={expandedItem === label} {...props}>
      <span className={`${px}-nav__item--label`}>{label}</span>
    </button>
    {children}
  </li>
);

export default NavigationItemTrigger;
