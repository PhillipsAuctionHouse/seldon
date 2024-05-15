import React from 'react';
import { PaddingTokens, generatePaddingClassName, px } from '../../utils';
import GridItem, { GridItemProps } from '../GridItem/GridItem';
import classNames from 'classnames';

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
 * [Figma Link](https://www.figma.com/design/Hp2FyltbOmRxTuw9kSwBAd/EPIC-About-Us?node-id=912-5904&t=WzvEYp5zbnGnRFUf-4)
 */
const Row = ({
  children,
  id,
  element: CustomElement,
  padding = { top: PaddingTokens.lg, bottom: PaddingTokens.lg },
  ...props
}: RowProps) => {
  const dataTestId = id ? `row-${id}` : `row`;
  const baseClassName = `${px}-row`;

  const Component = CustomElement || 'section';

  return (
    <Component
      {...props}
      data-testid={dataTestId}
      id={id}
      className={classNames(
        baseClassName,
        padding.top && generatePaddingClassName(padding.top, 'start'),
        padding.bottom && generatePaddingClassName(padding.bottom, 'end'),
      )}
    >
      {children}
    </Component>
  );
};

export default Row;
