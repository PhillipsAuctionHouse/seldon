import React from 'react';
import { determineDefaultComponentProps } from '../../utils';

// Be as specific as you can about the top-level element type
export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional element to render as the top-level component e.g. 'div', 'span', CustomComponent, etc.  Defaults to the appropriate HTML based on the variant.
   */
  element?: React.ElementType;
}
/**
 * ## Overview
 *
 * Overview of this component
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](Point back to yourself here)
 */
const ComponentName = ({ children, element: CustomElement, ...props }: ComponentNameProps) => {
  const Component = CustomElement || 'div';

  return (
    <Component {...props} {...determineDefaultComponentProps(props, 'ComponentName')}>
      {children}
    </Component>
  );
};

export default ComponentName;
