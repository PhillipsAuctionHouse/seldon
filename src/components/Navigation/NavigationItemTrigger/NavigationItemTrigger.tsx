import * as React from 'react';
import { px } from '../../../utils';
import classNames from 'classnames';
import { HeaderContext } from '../../Header/Header';

export interface NavigationItemTriggerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Label for the navigation item
   */
  label: string;
}

const NavigationItemTrigger = ({
  id,
  label,
  children,
  className,
  ...props
}: React.PropsWithChildren<NavigationItemTriggerProps>) => {
  const { expandedItem, onSelect } = React.useContext(HeaderContext);
  const handleOnClick = () => onSelect(label);
  return (
    <li
      aria-expanded={expandedItem === label}
      data-testid={`nav-item-trigger-${id}`}
      className={classNames(className, `${px}-nav__item`, { [`${px}-nav__item--expanded`]: expandedItem === label })}
      onClick={handleOnClick}
      {...props}
    >
      <button className={`${px}-nav__item-trigger`} type="button">
        <label className={`${px}-nav__item--label`}>{label}</label>
      </button>
      {children}
    </li>
  );
};

export default NavigationItemTrigger;
