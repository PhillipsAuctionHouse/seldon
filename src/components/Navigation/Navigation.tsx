import { px } from '../../utils';
import classnames from 'classnames';
import { ComponentProps, CSSProperties, forwardRef } from 'react';

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
const Navigation = forwardRef<HTMLElement, NavigationProps>(({ children, className, id, visible = true }) => {
  return (
    <nav
      role="navigation"
      data-testid={id}
      id={id}
      style={{ '--visible': visible ? 'visible' : 'hidden' } as CSSProperties}
      className={classnames(`${px}-nav`, className)}
    >
      {children}
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
