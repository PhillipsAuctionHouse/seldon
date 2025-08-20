import { forwardRef } from 'react';
import { PaddingTokens, generatePaddingClassName, getCommonProps } from '../../utils';
import classnames from 'classnames';

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional element to render as the top-level component e.g. 'div', 'span', CustomComponent, etc.  Defaults to 'section'.
   */
  element?: React.ElementType;
  /**
   * Optional  padding override for the row.  Defaults to `lg`.  Horizontal padding is fixed for Row components at `lg`
   */
  padding?: { top: PaddingTokens; bottom: PaddingTokens };
}

/**
 * ## Overview
 *
 * A page will usually contain multiple Rows.  The Row component will apply paddings to the contents within it.  Usually a Grid will be rendered within a Row to align to the grid, but other elements are supported.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=6741-6223&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-layouts-row--overview)
 */

const Row = forwardRef<HTMLElement, RowProps>(
  (
    {
      children,
      element: CustomElement,
      padding = { top: PaddingTokens.lg, bottom: PaddingTokens.lg },
      className,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Row');
    const Component = CustomElement || 'section';
    return (
      <Component
        ref={ref}
        {...commonProps}
        className={classnames(
          baseClassName,
          padding.top && generatePaddingClassName(padding.top, 'start'),
          padding.bottom && generatePaddingClassName(padding.bottom, 'end'),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Row.displayName = 'Row';
export default Row;
