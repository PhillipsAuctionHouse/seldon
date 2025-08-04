import React, { forwardRef, useState, Children, cloneElement, ReactNode } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import Filter, { FilterProps } from '../../components/Filter/Filter';

export interface FilterMenuProps<ElementType = HTMLFormElement> extends React.HTMLAttributes<ElementType> {
  /**
   * Typically would be a Filter component
   * */
  children: ReactNode;

  /**
   * Optional element to render as the top-level component e.g. 'div', Form, CustomComponent, etc. Defaults to 'form'.
   */
  element?: React.ElementType;
}
/**
 * ## Overview
 *
 * A container for filters that controls the state of parent and child filters
 *
 * [Figma Link](https://www.figma.com/design/OvBXAq48blO1r4qYbeBPjW/RW---Sale-Page-(PLP)?node-id=892-71019&node-type=frame&t=AsBDn4UgUEjNUnf7-0)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-filtermenu--overview)
 */
const FilterMenu = forwardRef<HTMLFormElement, FilterMenuProps>(
  ({ className, children, element: Element = 'form', ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'FilterMenu');

    // The viewAllFilter is the name of the filter that is currently being viewed in the "View All" submenu
    const [viewAllFilter, setViewAllFilter] = useState<string | null>(null);
    const isViewAllSet = viewAllFilter?.length;

    const parsedChildren = Children.map(children, (childElement) =>
      React.isValidElement(childElement) && childElement.type === Filter
        ? cloneElement(childElement, {
            setViewAllFilter,
            hidden: !isViewAllSet ? false : viewAllFilter !== childElement.props.name,
            isViewingAll: isViewAllSet,
            className: isViewAllSet && classnames(childElement.props.className, 'is-opening'),
          } as FilterProps)
        : childElement,
    );

    return (
      <Element {...commonProps} {...props} className={classnames(baseClassName, className)} ref={ref}>
        {parsedChildren}
      </Element>
    );
  },
);

FilterMenu.displayName = 'FilterMenu';

export default FilterMenu;
