import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { ComponentProps, ElementType } from 'react';
import { getLinkVariantClassName, isLinkExternal } from './utils';
import { LinkVariants } from './types';
import { Text, TextVariants } from '../Text';

export interface LinkProps extends ComponentProps<'a'> {
  /**
   * Describes where the link is used. It controls the styling of the link so we apply consistent styles. Defaults to `standalone`.  See the documentation [here](https://www.figma.com/file/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?type=design&node-id=5731-12815) to see where each variant is used.
   *
   * @default standalone
   * @see LinkVariants
   */
  variant?: LinkVariants;
  /**
   * Can be used to render alternative link components like the prefetching `Link` from `@remix-run/react`.
   * This component should handle the `children`, `data-testid`, `id`, `className`, and `href` props.
   */
  element?: ElementType<LinkProps & { 'data-testid': string }>;
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
  className,
  element: Element = 'a',
  variant = LinkVariants.link,
  href,
  ...props
}: LinkProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Link');
  const classNames = classnames(baseClassName, getLinkVariantClassName(variant), className);

  const isExternal = isLinkExternal(href);

  return (
    <Element
      {...commonProps}
      href={href}
      className={classNames}
      {...(isExternal && Element === 'a' ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
      {...props}
    >
      <Text variant={variant as unknown as TextVariants}>{children}</Text>
    </Element>
  );
};

export default Link;
