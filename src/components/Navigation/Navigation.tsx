import * as React from 'react';
import classnames from 'classnames';

import { px } from '../../utils';

interface NavigationProps {
  /**
   * Label for back button
   */
  backBtnLabel?: string;
  /**
   * The nav items to render
   */
  children: React.ReactNode;
  /**
  * Optional class for component
  */
  className?: string;
  /**
   * Boolean for when a sub nav is open
   */
  expanded?: boolean;
  /**
  * Optional unique id for component
  */
  id?: string;
  /**
  * Label for navigation
  */
  label?: string;
  /**
   * Event handler on mobile for going back to main menu
   */
  onBack?: () => void;
  /**
  * Boolean to dictate the label visibility
  */
  visible?: boolean;
}

const Navigation = ({
  backBtnLabel,
  children,
  className,
  expanded,
  id,
  label = "Main Menu",
  onBack,
  visible = true
}: NavigationProps) => {
  return (
    <nav
      aria-labelledby={`${id}-label`}
      data-testid={id ? `nav-${id}` : `nav`}
      id={id}
      className={classnames(`${px}-nav`, className,  {[`${px}-nav--expanded`]: expanded})}
    >
      <button tabIndex={expanded? 0 : -1} className={`${px}-nav__back-btn`} onClick={onBack}>{backBtnLabel}</button>
      <h2
        id={`${id}-label`}
        className={`${px}-nav__label`}
        style={{'--visible': visible ? "visible" : "hidden"}  as React.CSSProperties}
      >
        {label}
      </h2>
      {children}
    </nav>
  );
};

export default Navigation
