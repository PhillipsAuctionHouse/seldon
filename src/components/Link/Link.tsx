import classnames from 'classnames';

import { px } from '../../utils';
import React, { HTMLAttributes } from 'react';
import { getLinkVariantClassName } from './utils';

export const LinkVariants = {
  /** Default variant, used */
  standalone: 'standalone',
  /** link rendering emailto: */
  email: 'email',
  /** these links are being rendered in a list */
  list: 'list',
  /** link is being rendered within body copy */
  inline: 'inline',
} as const;

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * Describes where the link is used. It controls the styling of the link so we apply consistent styles. Defaults to `standalone`.  See the documentation [here](https://www.figma.com/file/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?type=design&node-id=5731-12815) to see where each variant is used.
   *
   * @default standalone
   * @see LinkVariants
   */
  variant?: keyof typeof LinkVariants;
  /**
   * The text of the link
   */
  children: React.ReactNode;
  /**
   * URL to navigate to when clicked
   */
  href: string;
  /**
   * Can be used to render alternative link components like the prefetching `Link` from `@remix-run/react`.
   * This component should handle the `children`, `data-testid`, `id`, `className`, and `href` props.
   */
  element?: React.ElementType<LinkProps & { 'data-testid': string }>;
}

/**
 * ## Overview
 *
 * A component that can be used to navigate to different pages or external websites. Renders a standard anchor tag by default.
 *
 * [Figma Link](https://www.figma.com/file/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=5736%3A13364&mode=dev)
 */
const Link = ({ children, id, className, element: Component = 'a', variant, href, ...props }: LinkProps) => {
  const classNames = classnames(`${px}-link`, getLinkVariantClassName(variant ?? LinkVariants.standalone), className);
  const dataTestId = id ? `link-${id}` : `link`;
  const isExternal = href.match(
    /(http[s]?:\/\/)(?!.*phillips\.com)([a-zA-Z0-9\-.]+)(:[0-9]{1,4})?([a-zA-Z0-9/\-._~:?#[\]@!$&'()*+,;=]*)/g,
  );

  return (
    <Component
      {...props}
      href={href}
      data-testid={dataTestId}
      id={id}
      className={classNames}
      {...(isExternal && Component === 'a' ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
    >
      {children}
    </Component>
  );
};

export default Link;
