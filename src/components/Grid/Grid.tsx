import classnames from 'classnames';

import { getCommonProps, SpacingTokens } from '../../utils';
import { determineGridClassName } from './utils';

export interface GridProps<ElementType = HTMLElement> extends React.HTMLAttributes<ElementType> {
  /**
   * A Grid must have children
   */
  children: React.ReactNode;
  /**
   * Optional element to render as the top-level component e.g. 'div', 'span', CustomComponent, etc.  Defaults to 'section'.
   */
  element?: React.ElementType<GridProps<ElementType>>;
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

export function Grid({
  children,
  className,
  element: Element = 'section',
  columnGap = SpacingTokens.md,
  rowGap = SpacingTokens.lg,
  ...props
}: GridProps) {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Grid');
  return (
    <Element
      {...commonProps}
      className={classnames(determineGridClassName(baseClassName, columnGap, rowGap), className)}
      {...props}
    >
      {children}
    </Element>
  );
}

export default Grid;
