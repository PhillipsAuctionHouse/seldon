import React from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The items to be displayed in the Breadcrumb. The items will be displayed left
   * to right in which they are ordered in the array (0 index being the first element)
   */
  items: BreadcrumbItemProps[];
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
const Breadcrumb = ({ className, items, ...props }: BreadcrumbProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Breadcrumb');

  return (
    <nav aria-label="Breadcrumb" className={classnames(baseClassName, className)} {...commonProps} {...props}>
      <ol>
        {items ? (
          items.map((item: BreadcrumbItemProps, index: number) => (
            <BreadcrumbItem
              href={item.href}
              label={item.label}
              isCurrent={items.length - 1 === index}
              key={item.label}
            />
          ))
        ) : (
          <></>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
