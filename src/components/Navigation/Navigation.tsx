import * as React from 'react';
import { findChildrenOfType, px } from '../../utils';
import classnames from 'classnames';
import { HeaderContext } from '../Header/Header';
import NavigationList, { NavigationListProps } from './NavigationList/NavigationList';

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
  const { defaultMobileMenuLabel, isExpanded, expandedItem, setExpandedItem, isSearchExpanded } =
    React.useContext(HeaderContext);
  const onBack = () => setExpandedItem(expandedItem === defaultMobileMenuLabel ? expandedItem : defaultMobileMenuLabel);

  const childNavList = findChildrenOfType<NavigationListProps>(children, NavigationList);
  const otherChildren = findChildrenOfType(children, NavigationList, true);

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
      {React.isValidElement(childNavList?.[0])
        ? React.cloneElement<NavigationListProps>(childNavList[0], { isOffScreen: isSearchExpanded })
        : undefined}
      {otherChildren}
    </nav>
  );
};

export default Navigation;
