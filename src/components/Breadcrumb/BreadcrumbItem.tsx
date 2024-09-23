import React from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import ChevronNextIcon from '../../assets/chevronNext.svg?react';

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
  /**
   * Custom element to render for the link
   */
  element?: React.ElementType<React.ComponentProps<'a'>>;
}

const BreadcrumbItem = ({
  className,
  href,
  label,
  isCurrent = false,
  isTruncateText = false,
  truncateLength = 30,
  element: CustomElement = 'a',
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
      <CustomElement
        aria-current={ariaCurrent}
        className={classnames(baseClassName, className, { [`${baseClassName}--current`]: isCurrent })}
        href={currentHref}
        {...commonProps}
      >
        {isTruncateText ? getTruncatedLabel() : label}
      </CustomElement>
      {!isCurrent ? <ChevronNextIcon /> : null}
    </li>
  );
};

export default BreadcrumbItem;
