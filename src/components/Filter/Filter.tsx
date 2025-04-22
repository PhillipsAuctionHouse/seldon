import {
  ComponentProps,
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { findChildrenExcludingTypes, findChildrenOfType, getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import FilterHeader from './FilterHeader';
import { FilterInputProps } from './FilterInput';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';

export interface FilterProps extends ComponentProps<'div'> {
  /** Logical name of this filter */
  name: string;

  // Setter for values to display in view all
  setViewAllFilter?: Dispatch<SetStateAction<string>>;

  // Number of values to display before truncating with view all button
  viewAllLimit?: number;

  // Whether this is a view all filter or not
  isViewingAll?: boolean;

  // Whether this filter is being hidden. Use when sibling is in view all state.
  isHidden?: boolean;
  /**
   *  translatable string for view all button
   */
  viewAllLabel?: string;
}
/**
 * ## Overview
 *
 * Component to display filtering dimensions
 *
 * [Figma Link](https://www.figma.com/design/OvBXAq48blO1r4qYbeBPjW/RW---Sale-Page-(PLP)?node-id=892-71019&node-type=frame&t=AsBDn4UgUEjNUnf7-0)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-filter--overview)
 */
const Filter = forwardRef<HTMLDivElement, FilterProps>(
  (
    {
      className,
      children,
      name,
      viewAllLimit = 10,
      isViewingAll = false,
      isHidden = false,
      setViewAllFilter,
      viewAllLabel = 'View All',
      ...props
    },
    ref,
  ) => {
    // filter "child" (view all state) is closing or not
    const [isClosing, setIsClosing] = useState(false);

    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Filter');
    const childrenArray = Children.toArray(children);

    const headerProps = { isViewingAll, setViewAllFilter, setIsClosing };

    const parsedFilterHeader = findChildrenOfType(childrenArray, FilterHeader)?.[0];
    const filterHeader = isValidElement(parsedFilterHeader) ? cloneElement(parsedFilterHeader, headerProps) : null;

    // this allows the component to be composable, while still passing down props from parent to child
    // taking the children composed in the filter and constructing custom props based on state
    const parsedFilterChildren = findChildrenExcludingTypes(childrenArray, [FilterHeader])?.map((child, index) =>
      isValidElement(child)
        ? cloneElement(child, { hidden: !isViewingAll && index + 1 > viewAllLimit } as FilterInputProps)
        : child,
    );

    return (
      <div
        {...commonProps}
        className={classnames(baseClassName, className, {
          [`${px}-filter--hidden`]: isHidden,
          'is-closing': isClosing,
        })}
        {...props}
        ref={ref}
      >
        <fieldset name={name} className={`${baseClassName}__fieldset`}>
          {filterHeader}
          <div className={`${baseClassName}__filters`}>{parsedFilterChildren}</div>
        </fieldset>
        {childrenArray.length > viewAllLimit && !isViewingAll ? (
          <Button
            className={`${baseClassName}__view-all`}
            variant={ButtonVariants.tertiary}
            onClick={() => {
              setViewAllFilter?.(name);
            }}
          >
            {viewAllLabel}
            <Icon icon="ChevronNext" className={`${baseClassName}__chevron`} />
          </Button>
        ) : null}
      </div>
    );
  },
);

Filter.displayName = 'Filter';

export type FilterComponent = ReturnType<typeof Filter>;

export default Filter;
