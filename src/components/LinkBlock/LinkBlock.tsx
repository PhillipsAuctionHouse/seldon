import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import Link, { LinkProps } from '../Link/Link';
import { LinkVariants } from '../Link/types';
import { Text } from '../Text';
import { forwardRef } from 'react';

export interface LinkBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Props for the Link component */
  linkProps: Omit<LinkProps, 'variant'>;
  /** Renders description under link */
  description: React.ReactNode;
}

/**
 * ## Overview
 *
 * The LinkBlock component is used to render a link with a description underneath it. Usually this is used in a list of links.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=4612-79026&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-links-linkblock--overview)
 *
 */
const LinkBlock = forwardRef<HTMLDivElement, LinkBlockProps>(
  ({ linkProps, description, className: classNameProp, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'LinkBlock');
    const className = classnames(baseClassName, classNameProp);
    const LinkComponent = linkProps.element ?? Link;
    return (
      <div {...commonProps} className={className} {...props} ref={ref}>
        <LinkComponent
          {...linkProps}
          className={`${baseClassName}__link`}
          data-testid={`${commonProps['data-testid']}-link`}
          variant={LinkVariants.linkMedium}
        />
        <Text className={`${baseClassName}__description`}>{description}</Text>
      </div>
    );
  },
);
LinkBlock.displayName = 'LinkBlock';

export default LinkBlock;
