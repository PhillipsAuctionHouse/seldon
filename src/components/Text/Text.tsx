import React from 'react';
import { px } from '../../utils';
import classnames from 'classnames';
import { TextVariants } from './types';
import { determineDefaultTextElement, determineTextClassName } from './utils';

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
const Text = ({
  children,
  id,
  element: CustomElement,
  variant = TextVariants.body2,
  className,
  ...props
}: TextProps) => {
  const dataTestId = id ? `text-${id}` : `text`;
  const baseClassName = `${px}-text`;

  const Component = CustomElement || determineDefaultTextElement(variant);

  return (
    <Component
      {...props}
      data-testid={dataTestId}
      id={id}
      className={classnames(baseClassName, determineTextClassName(variant), className)}
    >
      {children}
    </Component>
  );
};

export default Text;
