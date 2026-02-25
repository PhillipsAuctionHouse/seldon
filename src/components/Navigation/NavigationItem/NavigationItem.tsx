import { px } from '../../../utils';
import classNames from 'classnames';
import Link, { LinkProps } from '../../Link/Link';
import { LinkVariants } from '../../Link/types';
import { ComponentProps, ElementType, forwardRef, MouseEventHandler, ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export interface NavigationItemProps extends ComponentProps<'li'> {
  /**
   * Optional badge for navigation item. Used currently for location of auctions
   */
  badge?: ReactNode;
  /**
   * href link
   */
  href?: string;
  /**
   * Optional value to give the navigation item unique styling
   */
  isViewAllLink?: boolean;
  /**
   * Label for the navigation item
   */
  label?: ReactNode;
  /**
   * Optional group for navigation items
   */
  navGroup?: 'nav-link-start' | 'nav-link-end';
  /**
   * Optional type for navigation item
   */
  navType?: LinkVariants;
  /**
   * Element to render within the navigation item, renders <Link> by default
   */
  element?: ElementType<LinkProps>;
  /**
   * When true (desktop Radix list), render as NavigationMenu.Item + Link for arrow-key navigation
   */
  asRadixLink?: boolean;
  /**
   * When true (desktop submenu), wrap link in NavigationMenu.Link so Radix closes the submenu on click
   */
  asRadixSubmenuLink?: boolean;
  /**
   * When true, sets aria-current="page" on the link for the current page (helps screen reader users).
   */
  isCurrentPage?: boolean;
}

/**
 * ## Overview
 *
 * Renders a styled link within the Header->Navigation component.  It supports both mobile and desktop layouts.  It can be used with Remix links as well.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10570-6295&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-languageselector--overview)
 */
const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
  (
    {
      badge,
      className = '',
      href,
      isViewAllLink = false,
      isCurrentPage = false,
      label,
      navGroup,
      navType,
      onClick,
      element: Component = Link,
      asRadixLink,
      asRadixSubmenuLink,
      ...props
    },
    ref,
  ) => {
    const itemClassName = classNames(`${px}-nav__item`, `${px}-nav__item--${navGroup}`, className);
    const linkContent = (
      <Component
        className={classNames({
          [`${px}-nav__item--view-all`]: isViewAllLink,
        })}
        href={href}
        variant={navType ? navType : LinkVariants.linkStylised}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        {...(isCurrentPage ? { 'aria-current': 'page' as const } : {})}
      >
        <span className={`${px}-nav__item--label`}>{label}</span>
        {badge ? <span className={`${px}-nav__item--badge `}>{` • ${badge}`}</span> : null}
      </Component>
    );

    if (asRadixLink) {
      const { value: _omitValue, ...restProps } = props as ComponentProps<'li'> & { value?: unknown };
      return (
        <NavigationMenu.Item ref={ref} data-testid={`nav-item-${label}`} className={itemClassName} {...restProps}>
          <NavigationMenu.Link asChild>{linkContent}</NavigationMenu.Link>
        </NavigationMenu.Item>
      );
    }

    if (asRadixSubmenuLink) {
      return (
        <li {...props} data-testid={`nav-item-${label}`} className={itemClassName} ref={ref}>
          <NavigationMenu.Link asChild>{linkContent}</NavigationMenu.Link>
        </li>
      );
    }

    return (
      <li {...props} onClick={onClick} data-testid={`nav-item-${label}`} className={itemClassName} ref={ref}>
        {linkContent}
      </li>
    );
  },
);

NavigationItem.displayName = 'NavigationItem';

export default NavigationItem;
