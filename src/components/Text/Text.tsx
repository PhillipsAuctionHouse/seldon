import React from 'react';
import { getCommonProps } from '../../utils';
import { TextVariants } from './types';
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
const Text = ({ children, className, element: CustomElement, variant = TextVariants.body2, ...props }: TextProps) => {
  const Component = CustomElement || determineDefaultTextElement(variant);
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Text');

  return (
    <Component
      {...props}
      {...commonProps}
      className={classNames(baseClassName, className, determineTextClassName(variant))}
    >
      {children}
    </Component>
  );
};

export default Text;
