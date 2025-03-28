import React from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Icon } from '../Icon';

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
  element: CustomElement = 'a',
  ...props
}: BreadcrumbItemProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Breadcrumb');
  const ariaCurrent = !isCurrent ? false : 'page';
  const currentHref = !isCurrent ? href : '';

  return (
    <li
      aria-label={label}
      className={classnames(`${baseClassName}__item`, { [`${baseClassName}--truncate`]: isTruncateText })}
    >
      {isCurrent ? (
        <span className={classnames(baseClassName, className, { [`${baseClassName}--current`]: isCurrent })}>
          {label}
        </span>
      ) : (
        <CustomElement
          aria-current={ariaCurrent}
          className={classnames(baseClassName, className, {
            [`${baseClassName}--current`]: isCurrent,
          })}
          href={currentHref}
          {...commonProps}
        >
          {label}
        </CustomElement>
      )}

      {!isCurrent ? <Icon icon="ChevronNext" className={`${baseClassName}__chevron`} /> : null}
    </li>
  );
};

export default BreadcrumbItem;
