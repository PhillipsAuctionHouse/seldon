import {
  ComponentProps,
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import FilterHeader, { FilterHeaderProps } from './FilterHeader';
import { FilterValueProps } from './FilterValue';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import ChevronNextIcon from '../../assets/chevronNext.svg?react';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface FilterProps extends ComponentProps<'div'> {
  children: ReactNode;

  // If true, do not include bottom border. True by default, do not define if you do not wish to use separators.
  isLast?: boolean;

  // Setter for values to display in view all
  setViewAllFilter?: Dispatch<SetStateAction<ReactNode[]>>;

  // Number of values to display before truncating with view all button
  viewAllLimit?: number;

  // Whether this is a view all filter or not
  viewingAll?: boolean;
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
  ({ className, children, isLast = true, viewAllLimit = 10, viewingAll = false, setViewAllFilter, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Filter');
    const childrenArray = Children.toArray(children);

    return (
      <div
        {...commonProps}
        className={classnames(baseClassName, className, {
          [`${px}-has-separators`]: !isLast,
        })}
        {...props}
        ref={ref}
      >
        {childrenArray.map((child, index) =>
          isValidElement(child)
            ? child.type === FilterHeader
              ? cloneElement(child, { showBack: viewingAll, setViewAllFilter } as FilterHeaderProps)
              : cloneElement(child, { isHidden: !viewingAll && index > viewAllLimit } as FilterValueProps)
            : child,
        )}
        {childrenArray.length > viewAllLimit && !viewingAll ? (
          <Button
            variant={ButtonVariants.tertiary}
            onClick={() => {
              setViewAllFilter && setViewAllFilter(childrenArray);
            }}
          >
            {`View All`}
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
