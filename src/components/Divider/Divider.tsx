import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';
// import './_divider.scss';

export interface DividerProps extends ComponentProps<'div'> {
  /**
   * Optional element to render as the top-level component e.g. 'div', 'span', CustomComponent, etc.  Defaults to the appropriate HTML based on the variant.
   */
  element?: React.ElementType;
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/rIefa3bRPyZbZmtyV9PSQv/My-Account?node-id=61-13461&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-divider--overview)
 */
const Divider = forwardRef<HTMLDivElement, DividerProps>(({ className, element: CustomElement, ...props }) => {
  const Component = CustomElement || 'div';
  const { className: baseClassName } = getCommonProps(props, 'Divider');

  return (
    <Component className={classNames(baseClassName, className)} {...props} data-testid={`divider-${props.id}`}>
      <hr className={`${baseClassName}-line`} />
    </Component>
  );
});

Divider.displayName = 'Divider';

export default Divider;
