import { px } from '../../utils';
import classnames from 'classnames';

interface HTMLEvent extends Event {
  target: HTMLElement;
}
interface NavigationListItemTriggerProps extends Record<string, unknown>{
  /**
   * Optional label if not part of the element props
   */
  children?: React.ReactNode;
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
  expandedItem,
  label,
  onClick,
  ...props // Used to spread props needed for 3rd party elements or a11y attributes
}: NavigationListItemTriggerProps) => {
  const handleOnClick = function(e: HTMLEvent) {
    console.log("parent", e.target.parentElement?.lastChild)
    onClick();

  }
  return (
    <li
    data-testid={`nav-list-item`}
    className={classnames(`${px}-nav__list-item`, {[`${px}-nav__list-item--expanded`]: expandedItem===label})}
    onClick={handleOnClick}
  >
    <button className={`${px}-nav__list-item-trigger`} type="button" aria-expanded={expandedItem===label} {...props}>
      {label}
    </button>
    {children}
  </li>
  );
};

export default NavigationListItemTrigger
