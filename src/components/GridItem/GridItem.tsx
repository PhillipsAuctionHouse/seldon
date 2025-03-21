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
   * Determines how many columns this GridItem spans at the xs breakpoint, defaults to the maximum of 2 columns.  If there are less than 2 columns in the Grid at the xs breakpoint it will be centered.
   */
  xs?: number;
  /**
   * Determines how many columns this GridItem spans at the sm breakpoint, defaults to the maximum of 2 columns.  If there are less than 2 columns in the Grid at the sm breakpoint it will be centered.
   */
  sm?: number;
  /**
   * Determines how many columns this GridItem spans at the md breakpoint, defaults to the maximum of 6 columns.  If there are less than 6 columns in the Grid at the md breakpoint they will be centered.
   */
  md?: number;
  /**
   * Determines how many columns this GridItem spans at the lg breakpoint, defaults to the maximum of 12 columns.  If there are less than 2 columns in the Grid at the lg breakpoint they will be centered.
   */
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
  sm = 2,
  md = 6,
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
