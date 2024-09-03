import { px } from '../../../utils';
import classNames from 'classnames';
import { HeaderContext } from '../../Header/Header';
import { ComponentProps, forwardRef, MouseEvent, useContext } from 'react';

export interface NavigationItemTriggerProps extends ComponentProps<'li'> {
  /**
   * Label for the navigation item
   */
  label: string;
}

const NavigationItemTrigger = forwardRef<HTMLLIElement, NavigationItemTriggerProps>(
  ({ id, label, children, className, onClick, ...props }, ref) => {
    // This should be handled by the accordion context
    const { expandedItem, setExpandedItem } = useContext(HeaderContext);

    const handleClick = (event: MouseEvent<HTMLLIElement>) => {
      onClick?.(event);
      setExpandedItem(expandedItem === label ? '' : label);
    };
    return (
      <li
        ref={ref}
        aria-expanded={expandedItem === label}
        data-testid={`nav-item-trigger-${id}`}
        className={classNames(className, `${px}-nav__item`, { [`${px}-nav__item--expanded`]: expandedItem === label })}
        onClick={handleClick}
        {...props}
      >
        <button className={`${px}-nav__item-trigger`} type="button">
          <label className={`${px}-nav__item--label`}>{label}</label>
        </button>
        {children}
      </li>
    );
  },
);

NavigationItemTrigger.displayName = 'NavigationItemTrigger';

export default NavigationItemTrigger;
