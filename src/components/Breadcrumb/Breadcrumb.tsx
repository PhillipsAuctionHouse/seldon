import React from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';
import { Icon } from '../Icon';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique id for component testing
   */
  id?: string;
  /**
   * The items to be displayed in the Breadcrumb. The items will be displayed left
   * to right in which they are ordered in the array (0 index being the first element)
   */
  items: BreadcrumbItemProps[];
  /**
   * Index of the item to truncate
   */
  truncateIndex?: number;
  /**
   * Custom element to render for the link
   */
  linkElement?: React.ElementType<React.ComponentProps<'a'>>;
}
/**
 * ## Overview
 *
 * Overview of Breadcrumb component
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=4530-104045&t=IK3N3sxxhS2I6uFh-0)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-breadcrumb--overview)
 */
const Breadcrumb = ({
  className,
  items = [],
  truncateIndex,
  linkElement: CustomElement = 'a',
  ...props
}: BreadcrumbProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Breadcrumb');
  const { id } = props;

  return (
    <nav aria-label="Breadcrumb" className={classnames(baseClassName, className)} {...commonProps} {...props}>
      {/* This is not visible when in desktop breakpoint */}
      <SSRMediaQuery.Media lessThan="md">
        <CustomElement
          href={items[1].href ? items[1].href : '/'}
          className={`${px}-icon-button ${px}-icon-button--primary ${baseClassName}__back-button`} // apply button styles though it's a link
          data-testid={`${id}-back-button`}
        >
          <Icon icon="ArrowPrev" />
        </CustomElement>
      </SSRMediaQuery.Media>
      {/* This is not visible when in mobile breakpoint */}
      <SSRMediaQuery.Media greaterThanOrEqual="md">
        <ol>
          {items.map((item: BreadcrumbItemProps, index: number) => (
            <BreadcrumbItem
              href={item.href}
              label={item.label}
              element={CustomElement}
              isCurrent={items.length - 1 === index}
              key={item.label}
              isTruncateText={truncateIndex === index}
            />
          ))}
        </ol>
      </SSRMediaQuery.Media>
    </nav>
  );
};

export default Breadcrumb;
