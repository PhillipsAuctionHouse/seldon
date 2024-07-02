import React from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import chevronNext from '../../assets/chevronNext.svg';

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Hypertext reference to navigate to breadcrumb item
   */
  href?: string;
  /**
   * Whether the user is on the current item page or not
   */
  isCurrent?: boolean;
  /**
   * Label to display in the breadcrumb
   */
  label?: string;
}

const BreadcrumbItem = ({ className, href, label, isCurrent = false, ...props }: BreadcrumbItemProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Breadcrumb');
  const extraClass = !isCurrent ? 'previous' : 'current';
  const ariaCurrent = !isCurrent ? false : 'page';
  const currentHref = !isCurrent ? href : '';

  return (
    <li>
      <a
        aria-current={ariaCurrent}
        className={classnames(baseClassName, className, extraClass)}
        href={currentHref}
        {...commonProps}
      >
        {label}
      </a>
      {!isCurrent && <img className={classnames(baseClassName, className, 'chevron')} src={chevronNext} />}
    </li>
  );
};

export default BreadcrumbItem;
