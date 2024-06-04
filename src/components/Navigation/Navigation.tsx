import * as React from 'react';
import { px } from '../../utils';
import classNames from 'classnames';
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
  const { expanded, expandedItem, setExpandedItem } = React.useContext(HeaderContext);
  const onBack = () => setExpandedItem(expandedItem === 'Main Menu' ? expandedItem : 'Main Menu');
  return (
    <nav
      aria-labelledby={`${id}-label`}
      data-testid={id ? `nav-${id}` : `nav`}
      id={id}
      className={classNames(`${px}-nav`, className, { [`${px}-nav--expanded`]: expanded })}
    >
      <button tabIndex={expanded ? 0 : -1} className={`${px}-nav__back-btn`} onClick={onBack}>
        {backBtnLabel}
      </button>
      <h2
        id={`${id}-label`}
        className={`${px}-nav__label`}
        style={{ '--visible': visible ? 'visible' : 'hidden' } as React.CSSProperties}
      >
        {expandedItem}
      </h2>
      {children}
    </nav>
  );
};

export default Navigation;
