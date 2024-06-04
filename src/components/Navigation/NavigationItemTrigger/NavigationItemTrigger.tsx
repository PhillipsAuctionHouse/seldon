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

const NavigationItemTrigger = ({ label, children, ...props }: React.PropsWithChildren<NavigationItemTriggerProps>) => {
  const { expandedItem, handleSelection } = React.useContext(HeaderContext);
  const handleOnClick = () => handleSelection(label);
  return (
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
};

export default NavigationItemTrigger;
