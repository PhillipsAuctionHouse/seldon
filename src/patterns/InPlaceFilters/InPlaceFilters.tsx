import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { Icon } from '../../components/Icon';
import { getCommonProps, px } from '../../utils';

export interface InPlaceFiltersProps {
  /**
   * Unique id for component testing
   */
  id: string;
  /**
   * Base class for TagsList component.
   */
  className?: string;
  /**
   * Filter button label.
   */
  filterLabel: string;
  /**
   * Filter Button onClick handler.
   */
  handleFilterClick?: () => void;
  /**
   * List of labels for the filter buttons.
   */
  filtersLabelList: string[];
  /**
   * List of states for the filter buttons.
   */
  filtersListState: boolean[];
  /**
   * Set the state of the filter buttons.
   */
  setFiltersLabelListState?: (state: boolean[]) => void;
}

export interface FilterButtonProps {
  /**
   * Unique id for component testing
   */
  id: string;
  /**
   * Base class for Filter button component.
   */
  className?: string;
  /**
   * Individual Filter button label.
   */
  filterButtonLabel: string;
  /**
   * Button selected state.
   */
  isButtonSelected?: boolean;

  /**
   * Button type.
   */
  buttonType: 'Filter' | 'Sort' | 'Sale Type' | 'Departments' | 'Month' | 'Location';
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ id, className, filterButtonLabel, isButtonSelected = false, buttonType }, ref) => {
    return (
      <>
        <Popover.Root key={`${id}-${filterButtonLabel}-button`}>
          <Popover.Trigger asChild>
            <Button
              ref={ref}
              className={classnames(`${px}-filter-button`, className, {
                [`${px}-filter-button--selected`]: isButtonSelected,
              })}
              aria-label={filterButtonLabel}
              variant={ButtonVariants.tertiary}
              data-testid={`${id}-button`}
            >
              {filterButtonLabel && <div className={`${px}__label`}>{filterButtonLabel}</div>}
              <Icon
                icon={buttonType === 'Filter' ? 'Filters' : isButtonSelected ? 'ChevronUp' : 'ChevronDown'}
                height={8}
                width={8}
                className={`${px}__icon`}
              />
              {/* floating counter */}
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content avoidCollisions={true} collisionPadding={10} sideOffset={5} align="start" alignOffset={5}>
              TEST TEST
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </>
    );
  },
);
FilterButton.displayName = 'FilterButton';
/**
 * ## Overview
 *
 * Overview of InPlaceFilters component
 *
 * [Figma Link](https://www.figma.com/design/H1kCh6MXU8jasYbQuCbyBt/Calendar?node-id=55-487568&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-in-place-filters--overview)
 */
const InPlaceFilters = React.forwardRef<HTMLDivElement, InPlaceFiltersProps>(
  (
    {
      id,
      className,
      filterLabel,
      filtersLabelList,
      handleFilterClick,
      filtersListState,
      setFiltersLabelListState,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'InPlaceFilters');

    return (
      <div ref={ref} className={classnames(`${baseClassName}`, className)} {...commonProps}>
        <FilterButton id={`${id}-filter`} filterButtonLabel={filterLabel} buttonType="Filter" />
        {filtersLabelList.length > 0 &&
          filtersLabelList.map((filterLabel) => (
            <FilterButton
              key={`${id}-${filterLabel}-button`}
              id={`${id}-${filterLabel}-button`}
              filterButtonLabel={filterLabel}
              buttonType={filterLabel as FilterButtonProps['buttonType']}
            />
          ))}
      </div>
    );
  },
);

InPlaceFilters.displayName = 'InPlaceFilters';

export default InPlaceFilters;
