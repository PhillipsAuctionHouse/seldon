import classnames from 'classnames';

import { px } from '../../utils';
import React, { HTMLAttributes } from 'react';
import { getLinkVariantClassName, isLinkExternal } from './utils';
import { LinkVariants } from './utils';

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * Describes where the link is used. It controls the styling of the link so we apply consistent styles. Defaults to `standalone`.  See the documentation [here](https://www.figma.com/file/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?type=design&node-id=5731-12815) to see where each variant is used.
   *
   * @default standalone
   * @see LinkVariants
   */
  variant?: LinkVariants;
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
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=4612-79026&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-links-link--overview)
 */

const Link = ({
  children,
  id,
  className,
  element: Element = 'a',
  variant = LinkVariants.standalone,
  href,
  ...props
}: LinkProps) => {
  const classNames = classnames(`${px}-link`, getLinkVariantClassName(variant), className);
  const dataTestId = id ? `link-${id}` : `link`;
  const isExternal = isLinkExternal(href);

  return (
    <Element
      {...props}
      href={href}
      data-testid={dataTestId}
      id={id}
      className={classNames}
      {...(isExternal && Element === 'a' ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
    >
      {children}
    </Element>
  );
};

export default Link;
