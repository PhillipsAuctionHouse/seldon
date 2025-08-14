import classnames from 'classnames';

import { getCommonProps, SpacingTokens } from '../../utils';
import { determineGridClassName } from './utils';
import { forwardRef } from 'react';

export interface GridProps<GridElementType = HTMLElement> extends React.HTMLAttributes<GridElementType> {
  /**
   * A Grid must have children
   */
  children: React.ReactNode;
  /**
   * Optional element to render as the top-level component e.g. 'div', 'span', CustomComponent, etc.  Defaults to 'section'.
   */
  element?: React.ElementType;
  /**
   * The gap between the rows in the grid.  Defaults to 'md'.
   */
  columnGap?: SpacingTokens;
  /**
   * The gap between the columns in the grid.  Defaults to 'lg'.
   */
  rowGap?: SpacingTokens;
}

/**
 * ## Overview
 *
 * A wrapper component for adding a 12-column grid layout.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=6226-1330&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-layouts-grid--overview)
 */

type GridComponent = <T extends HTMLElement = HTMLElement>(
  props: GridProps<T> & { ref?: React.Ref<T> },
) => React.ReactElement | null;

const GridInner = <T extends HTMLElement = HTMLElement>(
  {
    children,
    className,
    element = 'section',
    columnGap = SpacingTokens.md,
    rowGap = SpacingTokens.lg,
    ...props
  }: GridProps<T>,
  ref: React.Ref<T>,
) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Grid');
  const ElementType = element;
  return (
    <ElementType
      {...commonProps}
      className={classnames(determineGridClassName(baseClassName, columnGap, rowGap), className)}
      {...props}
      ref={ref}
    >
      {children}
    </ElementType>
  );
};

const Grid = forwardRef(GridInner) as GridComponent;
// @ts-expect-error: displayName is safe to assign
Grid.displayName = 'Grid';
export default Grid;
