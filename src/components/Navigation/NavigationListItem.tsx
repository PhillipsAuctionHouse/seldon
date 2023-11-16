import * as React from 'react';
import classnames from 'classnames';

import { px } from '../../utils';

interface NavigationListItemProps extends Record<string, unknown> {
  /**
   * Optional label if not part of the element props
   */
  children?: React.ReactNode;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Optional element to render in place of a button e.g. React-Router, etc
   */
  element?: keyof JSX.IntrinsicElements | React.ComponentType;
  /**
   * Optional href link
   */
  href?: string;
  /**
   * Optional click handler
   */
  handleOnClick?: () => void;
  /**
   *  Blur handler for keyboard a11y for nested list
   */
  onBlur?: (e: React.FocusEvent) => void;
}

const NavigationListItem = ({
  children,
  className,
  element: Element = 'a',
  handleOnClick,
  href,
  ...props // Used to spread props needed for 3rd party elements or a11y attributes
}: NavigationListItemProps) => {
  return (
    <li
      data-testid={`nav-list-item`}
      className={classnames(`${px}-nav__list-item`, { className })}
      onClick={handleOnClick}
    >
      <Element href={href} {...props}>
        {children}
      </Element>
    </li>
  );
};

export default NavigationListItem;
