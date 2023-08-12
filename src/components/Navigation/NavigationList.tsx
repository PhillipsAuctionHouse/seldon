
import * as React from 'react';
import classnames from 'classnames';

import { px } from '../../utils';

interface NavigationListProps {
  /**
   * The nav items to render
   */
  children: React.ReactNode
  /**
   * Boolean for when a sub nav is open
   */
  expanded?: boolean;
}

const NavigationList = ({
 children,
 expanded
}: NavigationListProps) => {
  return (
    <ul id="nav-list" data-testid="nav-list" className={classnames(`${px}-nav__list`, {[`${px}-nav__list--expanded`]: expanded})}>
      {children}
    </ul>
  );
};

export default NavigationList
