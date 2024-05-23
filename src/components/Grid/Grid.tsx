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
