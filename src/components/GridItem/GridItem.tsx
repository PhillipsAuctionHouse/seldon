import React from 'react';
import { px } from '../../utils';
import classNames from 'classnames';
import { GridItemAlign, determineColumnSpanClassName, validateColumnSpans } from './gridItemUtils';

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alignment defaults to 'center'
   */
  align?: GridItemAlign;
  /**
   * column spans at different breakpoints, defaults to all columns.  If less than the total number of columns at the breakpoint it will be centered.
   */
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  /**
   * Optional element to render as the top-level component e.g. 'div', 'span', CustomComponent, etc.  Defaults to 'div'.
   */
  element?: React.ElementType;
}
/**
 * ## Overview
 *
 * This item can be placed in a Grid and appropriately sized for the current breakpoint.  It can also be aligned within the grid cell.
 * If you center multiple GridItems in a Grid, they will wrap to the next line and be centered on that line.
 *
 * [Figma Link](https://www.figma.com/design/Hp2FyltbOmRxTuw9kSwBAd/EPIC-About-Us?node-id=912-5904&t=WzvEYp5zbnGnRFUf-4)
 */
const GridItem = ({
  children,
  xs = 2,
  sm = 4,
  md = 12,
  lg = 12,
  align = GridItemAlign.center,
  id,
  element: Element = 'div',
  ...props
}: GridItemProps) => {
  const dataTestId = id ? `grid-item-${id}` : `grid-item`;

  if (!validateColumnSpans(xs, sm, md, lg)) {
    return null;
  }

  return (
    <Element
      {...props}
      data-testid={dataTestId}
      id={id}
      className={classNames(
        `${px}-grid-item`, // figure out the class names for each breakpoint
        determineColumnSpanClassName('xs', xs, align),
        determineColumnSpanClassName('sm', sm, align),
        determineColumnSpanClassName('md', md, align),
        determineColumnSpanClassName('lg', lg, align),
      )}
    >
      {children}
    </Element>
  );
};

export default GridItem;
