import * as React from 'react';
import { px } from '../../utils';
import classnames from 'classnames';
import { HeaderContext } from '../Header/Header';

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  backBtnLabel?: string;
  /**
   * Optional visible state
   */
  visible?: boolean;
}

const Navigation = ({
  backBtnLabel,
  children,
  className,
  id,
  visible = true,
}: React.PropsWithChildren<NavigationProps>) => {
  const { defaultMobileMenuLabel, isExpanded, expandedItem, setExpandedItem } = React.useContext(HeaderContext);
  const onBack = () => setExpandedItem(expandedItem === defaultMobileMenuLabel ? expandedItem : defaultMobileMenuLabel);
  return (
    <nav
      role="navigation"
      aria-labelledby={`${id}-label`}
      data-testid={id}
      id={id}
      className={classnames(`${px}-nav`, className, { [`${px}-nav--expanded`]: isExpanded })}
    >
      <button
        data-testid={`${id}-back-btn`}
        tabIndex={isExpanded ? 0 : -1}
        className={`${px}-nav__back-btn`}
        onClick={onBack}
      >
        {backBtnLabel}
      </button>
      <h2
        id={`${id}-label`}
        data-testid={`${id}-label`}
        className={classnames(`${px}-nav__label`, { [`${px}-nav__label--hidden`]: !visible })}
        style={{ '--visible': visible ? 'visible' : 'hidden' } as React.CSSProperties}
      >
        {expandedItem ? expandedItem : 'Main Menu'}
      </h2>
      {children}
    </nav>
  );
};

export default Navigation;
