import classnames from 'classnames';

import { px } from '../../utils';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional element to render as the top-level component e.g. 'div', 'span', CustomComponent, etc.  Defaults to 'section'.
   */
  element?: React.ElementType<GridProps>;
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

export function Grid({ children, className, element: Element = 'section', id, ...props }: GridProps) {
  return (
    <Element
      data-testid={id ? `grid-container-${id}` : `grid-container`}
      id={id}
      className={classnames(`${px}-grid__container`, className)}
      {...props}
    >
      {children}
    </Element>
  );
}

export default Grid;
