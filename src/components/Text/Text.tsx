import { forwardRef } from 'react';
import { getCommonProps, px } from '../../utils';
import { TextAlignments, TextVariants } from './types';
import { determineDefaultTextElement, determineTextClassName } from './utils';
import classNames from 'classnames';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional element to render as the top-level component e.g. 'div', 'span', CustomComponent, etc.  Defaults to the appropriate HTML based on the variant.
   */
  element?: React.ElementType;
  /**
   * The OOTB style to apply to the text
   */
  variant?: TextVariants;
  /**
   * The alignment of the text
   */
  align?: TextAlignments;
  /**
   * Boolean to specify whether we need to display skeleton loader
   */
  isSkeletonLoading?: boolean;
}
/**
 * ## Overview
 *
 * All text rendered in the UI can be wrapped in this component to enforce consistent styling and semantic HTML.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=7263-1361&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-text--overview)
 */

const Text = forwardRef<HTMLElement, TextProps>(
  (
    { children, className, element: CustomElement, variant = TextVariants.bodyMd, align, isSkeletonLoading, ...props },
    ref,
  ) => {
    const Component = CustomElement || determineDefaultTextElement(variant);
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Text');

    return (
      <Component
        {...commonProps}
        className={classNames(baseClassName, className, determineTextClassName(variant), {
          [`${baseClassName}--${align}`]: !!align,
        })}
        ref={ref}
        {...props}
      >
        <span
          className={classNames({
            [`${px}-skeleton`]: isSkeletonLoading,
          })}
        >
          {children}
        </span>
      </Component>
    );
  },
);
Text.displayName = 'Text';

export default Text;
