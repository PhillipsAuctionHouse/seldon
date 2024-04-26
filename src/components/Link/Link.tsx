import classnames from 'classnames';

import { px } from '../../utils';
import { HTMLAttributes } from 'react';

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * The text of the link
   */
  children: React.ReactNode;
  /**
   * URL to navigate to when clicked
   */
  href: string;
  /**
   * Can be used to render alternative link components like the prefetching `Link` from `@remix-run/react`;
   * @param props
   * @returns JSX.Element
   */
  renderLink?: (props: LinkProps) => JSX.Element;
}

const Link = ({ children, id, className, renderLink, ...props }: LinkProps) => {
  const classNames = classnames(`${px}-link`, className);
  return renderLink ? (
    renderLink({ children, id, className: classNames, ...props })
  ) : (
    <a data-testid={id ? `link-${id}` : `link`} id={id} className={classNames} {...props}>
      {children}
    </a>
  );
};

export default Link;
