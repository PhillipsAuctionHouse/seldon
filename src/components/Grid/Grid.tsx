import classnames from 'classnames';

import { px } from '../../utils';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional element to render in place of a button e.g. 'div', 'span', CustomComponent, etc
   */
  element?: React.ElementType<GridProps>;
  /**
   * Optional boolean to dictate if the grid has left and right margins
   */
  hasMargins?: boolean;
}

export function Grid({
  children,
  className,
  element: Element = 'section',
  hasMargins = true,
  id,
  ...props
}: GridProps) {
  return (
    <Element
      data-testid={id ? `grid-container-${id}` : `grid-container`}
      id={id}
      className={classnames(`${px}-grid__container`, className, {
        [`${px}-grid__container--has-margins`]: hasMargins,
      })}
      {...props}
    >
      {children}
    </Element>
  );
}

export default Grid;
