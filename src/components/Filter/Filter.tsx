import {
  ComponentProps,
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import FilterHeader, { FilterHeaderProps } from './FilterHeader';
import { FilterInputProps } from './FilterInput';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import ChevronNextIcon from '../../assets/chevronNext.svg?react';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface FilterProps extends ComponentProps<'div'> {
  children: ReactNode;

  name: string;

  // If true, do not include bottom border. True by default, do not define if you do not wish to use separators or rendering alone.
  isLast?: boolean;

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
      isLast = true,
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

    // this allows the component to be composable, while still passing down props from parent to child
    // taking the children composed in the filter and constructing custom props based on state
    const parsedFilterChildren = childrenArray.map((child, index) =>
      isValidElement(child)
        ? child.type === FilterHeader
          ? cloneElement(child, headerProps as FilterHeaderProps)
          : cloneElement(child, { hidden: !isViewingAll && index > viewAllLimit } as FilterInputProps)
        : child,
    );

    return (
      <div
        {...commonProps}
        className={classnames(baseClassName, className, {
          [`${px}-has-separators`]: !isLast && !isViewingAll,
          [`${px}-filter--hidden`]: isHidden,
          'is-closing': isClosing,
        })}
        {...props}
        ref={ref}
      >
        <fieldset name={name} className={`${baseClassName}__fieldset`}>
          {parsedFilterChildren}
        </fieldset>
        {childrenArray.length > viewAllLimit && !isViewingAll ? (
          <Button
            variant={ButtonVariants.tertiary}
            onClick={() => {
              setViewAllFilter?.(name);
            }}
          >
            {viewAllLabel}
            <ChevronNextIcon className={`${baseClassName}__chevron`} />
          </Button>
        ) : null}
      </div>
    );
  },
);

Filter.displayName = 'Filter';

export type FilterComponent = ReturnType<typeof Filter>;

export default Filter;
