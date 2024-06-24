import React from 'react';
import { PaddingTokens, generatePaddingClassName, getCommonProps } from '../../utils';
import GridItem, { GridItemProps } from '../GridItem/GridItem';
import classnames from 'classnames';

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
  /** These children can be an array of GridItem components */
  children: React.ReactElement<GridItemProps, typeof GridItem> | React.ReactElement<GridItemProps, typeof GridItem>[];
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

const Row = ({
  children,

  element: CustomElement,
  padding = { top: PaddingTokens.lg, bottom: PaddingTokens.lg },
  className,
  ...props
}: RowProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Row');

  const Component = CustomElement || 'section';

  return (
    <Component
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
};

export default Row;
