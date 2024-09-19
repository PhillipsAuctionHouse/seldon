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
  /**
   * truncate text boolean
   * */
  isTruncateText?: boolean;

  /**
   * Length to which the text should be truncated
   * */
  truncateLength?: number;
}

const BreadcrumbItem = ({
  className,
  href,
  label,
  isCurrent = false,
  isTruncateText = false,
  truncateLength = 10,
  ...props
}: BreadcrumbItemProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Breadcrumb');
  const ariaCurrent = !isCurrent ? false : 'page';
  const currentHref = !isCurrent ? href : '';

  const getTruncatedLabel = () => {
    return label && label.length > truncateLength ? `${label.slice(0, truncateLength)}...` : label;
  };

  return (
    <li>
      <a
        aria-current={ariaCurrent}
        className={classnames(baseClassName, className, { [`${baseClassName}--current`]: isCurrent })}
        href={currentHref}
        {...commonProps}
      >
        {isTruncateText ? getTruncatedLabel() : label}
      </a>
      {!isCurrent ? <img className={classnames(baseClassName, className, 'chevron')} src={chevronNext} /> : null}
    </li>
  );
};

export default BreadcrumbItem;
