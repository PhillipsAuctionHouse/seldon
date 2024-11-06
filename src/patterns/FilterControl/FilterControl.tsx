import React, { ComponentProps, forwardRef, useState, Children, cloneElement, ReactNode } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import Filter, { FilterComponent, FilterProps } from '../../components/Filter/Filter';

export interface FilterControlProps extends ComponentProps<'div'> {
  // This is a composable component that is expecting a Filter component or an array of
  children: FilterComponent | FilterComponent[];
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
const FilterControl = forwardRef<HTMLDivElement, FilterControlProps>(({ className, children, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'FilterControl');
  const [viewAllFilter, setViewAllFilter] = useState<ReactNode[]>([]);

  return (
    <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
      {viewAllFilter.length ? (
        <Filter
          viewingAll={true}
          setViewAllFilter={setViewAllFilter}
          className={classnames({ 'is-open': viewAllFilter.length })}
        >
          {viewAllFilter}
        </Filter>
      ) : (
        Children.map(children, (childElement) =>
          React.isValidElement(childElement)
            ? cloneElement(childElement, {
                setViewAllFilter,
                className: classnames(childElement.props.className, 'is-open'),
              } as FilterProps)
            : childElement,
        )
      )}
    </div>
  );
});

FilterControl.displayName = 'FilterControl';

export default FilterControl;
