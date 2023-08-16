import { px } from '../../utils';
import classnames from 'classnames';


interface NavigationListItemTriggerProps extends Record<string, unknown>{
  /**
   * Optional label if not part of the element props
   */
  children?: React.ReactNode;
  /**
   * Are any navigation links expanded
   */
  expanded?: boolean;
  /**
   * ID of expanded subnav
   */
  expandedItem?: string;
  /**
   * Label for button that triggers the dropdown
   */
  label: string;
  /**
   * Click handler to toggle sub nav open/close
   */
  onClick: () => void;
}

const NavigationListItemTrigger = ({
  children,
  expanded,
  expandedItem,
  label,
  onClick,
  ...props // Used to spread props needed for 3rd party elements or a11y attributes
}: NavigationListItemTriggerProps) => {
  return (
    <li
    data-testid={`nav-list-item`}
    className={classnames(`${px}-nav__list-item`, {[`${px}-nav__list-item--expanded`]: expandedItem===label})}
    onClick={onClick}
  >
    <button className={`${px}-nav__list-item-trigger`} type="button" tabIndex={!expanded ? 0 : -1} aria-expanded={expandedItem === label} {...props}>
      {label}
    </button>
    {children}
  </li>
  );
};

export default NavigationListItemTrigger
