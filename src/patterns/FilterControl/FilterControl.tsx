import React, { forwardRef, useState, Children, cloneElement } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { FilterComponent, FilterProps } from '../../components/Filter/Filter';

export interface FilterControlProps<ElementType = HTMLElement> extends React.HTMLAttributes<ElementType> {
  // This is a composable component that is expecting a Filter component or an array of
  children: FilterComponent | FilterComponent[];

  //Optional element to render as the top-level component e.g. 'div', Form, CustomComponent, etc. Defaults to 'form'.
  element?: React.ElementType;
}
/**
 * ## Overview
 *
 * A container for filters that controls the state of parent and child filters
 *
 * [Figma Link](https://www.figma.com/design/OvBXAq48blO1r4qYbeBPjW/RW---Sale-Page-(PLP)?node-id=892-71019&node-type=frame&t=AsBDn4UgUEjNUnf7-0)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-filtercontrol--overview)
 */
const FilterControl = forwardRef<HTMLDivElement, FilterControlProps>(
  ({ className, children, element: Element = 'form', ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'FilterControl');

    // this state variable will be set to the filter name when view all has been clicked,
    // and null as default and when back is clicked
    const [viewAllFilter, setViewAllFilter] = useState<string | null>(null);
    const isViewAllSet = viewAllFilter?.length;

    const parsedChildren = Children.map(children, (childElement) =>
      React.isValidElement(childElement)
        ? cloneElement(childElement, {
            setViewAllFilter,
            isHidden: !isViewAllSet ? false : viewAllFilter !== childElement.props.name,
            isViewingAll: isViewAllSet,
            className: isViewAllSet && classnames(childElement.props.className, 'is-opening'),
          } as FilterProps)
        : childElement,
    );

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Element {...commonProps} {...props} className={`${baseClassName}__control`}>
          {parsedChildren}
        </Element>
      </div>
    );
  },
);

FilterControl.displayName = 'FilterControl';

export default FilterControl;
