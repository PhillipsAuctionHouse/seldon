import React, { useMemo } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { determineColumnSpanClassName, validateColumnSpans } from './gridItemUtils';
import { GridItemAlign } from './types';

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
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=6226-1330&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-layouts-griditem--overview)
 */
const GridItem = ({
  children,
  xs = 2,
  sm = 4,
  md = 12,
  lg = 12,
  align = GridItemAlign.center,
  element: Element = 'div',
  className,
  ...props
}: GridItemProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'GridItem');

  const columnSpansPerBreakpoint = useMemo(() => ({ xs, sm, md, lg }) as const, [xs, sm, md, lg]);
  const gridItemClasses = useMemo(() => {
    return [
      baseClassName, // figure out the class names for each breakpoint
      Object.entries(columnSpansPerBreakpoint).map(([key, value]) =>
        determineColumnSpanClassName(key as GridItemAlign, value, align),
      ),
      className,
    ];
  }, [align, columnSpansPerBreakpoint, baseClassName, className]);

  if (!validateColumnSpans(Object.values(columnSpansPerBreakpoint))) {
    return null;
  }

  return (
    <Element {...commonProps} className={classnames(gridItemClasses)} {...props}>
      {children}
    </Element>
  );
};

export default GridItem;
