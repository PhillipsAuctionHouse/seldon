import React, { ComponentProps, CSSProperties, forwardRef } from 'react';
import { findChildrenOfType, px } from '../../utils';
import classnames from 'classnames';
import { HeaderContext } from '../Header/Header';
import NavigationList, { NavigationListProps } from './NavigationList/NavigationList';

export interface NavigationProps extends ComponentProps<'nav'> {
  /**
   * Optional visible state
   */
  visible?: boolean;
}

/**
 * ## Overview
 *
 * This is used within the Header component and displays the site navigation links.  It support both mobile and desktop.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10570-5784&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-navigation--overview)
 */
const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ children, className, id, visible = true, ...props }, ref) => {
    const { isSearchExpanded } = React.useContext(HeaderContext);
    const childNavList = findChildrenOfType<NavigationListProps>(children, NavigationList);
    const otherChildren = findChildrenOfType(children, NavigationList, true);
    return (
      <nav
        role="navigation"
        data-testid={id}
        id={id}
        style={{ '--visible': visible ? 'visible' : 'hidden' } as CSSProperties}
        className={classnames(`${px}-nav`, className)}
        {...props}
        ref={ref}
      >
        <div className={`${px}-nav__list-container`}>
          {React.isValidElement(childNavList?.[0])
            ? React.cloneElement<NavigationListProps>(childNavList[0], { isOffScreen: isSearchExpanded })
            : undefined}
          {otherChildren}
        </div>
      </nav>
    );
  },
);

Navigation.displayName = 'Navigation';

export default Navigation;
