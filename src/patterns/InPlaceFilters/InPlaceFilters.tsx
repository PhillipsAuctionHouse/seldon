import classnames from 'classnames';
import React from 'react';
import { getCommonProps } from '../../utils';
import { FilterButton, FilterButtonProps } from './FilterButton';
import { AuctionFilterButtonTypes, FilterType } from './types';

/**
 * ## Overview
 *
 * Overview of InPlaceFilters component
 *
 * [Figma Link](https://www.figma.com/design/H1kCh6MXU8jasYbQuCbyBt/Calendar?node-id=55-487568&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-in-place-filters--overview)
 */

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
   * Filter Button onClick handler.
   */
  handleFilterClick?: () => void;
  /**
   * List of states for the filter buttons.
   */
  filtersListState: boolean[];
  /**
   * Set the state of the filter buttons.
   */
  setFiltersLabelListState?: (state: boolean[]) => void;
  /**
   * filters data
   */
  filters?: FilterType[];
  /**
   * Handle filter changes
   */
  handleFilterSelection?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterId: string) => void;
  /**
   * Handle filter update
   */
  handleFilterUpdate?: (returnCountOnly: boolean) => void;
  /**
   * Clear all filter update by filter type
   */
  clearFilterUpdate?: (filterId: string) => void;
  /**
   * Results count to display
   */
  resultsCount: number;
}

const filtersButtonsList: AuctionFilterButtonTypes[] = ['Filter', 'Sort', 'Sale', 'Departments', 'Month', 'Location'];

const InPlaceFilters = React.forwardRef<HTMLDivElement, InPlaceFiltersProps>(
  (
    {
      id,
      className,
      handleFilterClick,
      filtersListState,
      setFiltersLabelListState,
      filters,
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'InPlaceFilters');
    return (
      <div ref={ref} className={classnames(`${baseClassName}`, className)} {...commonProps}>
        {filtersButtonsList.map((filterLabel, index) => (
          <FilterButton
            key={`${id}-${filterLabel}-button`}
            id={`${id}-${filterLabel}-button`}
            filterButtonLabel={filterLabel}
            buttonType={filterLabel as FilterButtonProps['buttonType']}
            handleClick={setFiltersLabelListState}
            filtersListState={filtersListState}
            index={index}
            filters={filters}
            handleFilterSelection={handleFilterSelection}
            handleFilterUpdate={handleFilterUpdate}
            clearFilterUpdate={clearFilterUpdate}
            resultsCount={resultsCount}
          />
        ))}
      </div>
    );
  },
);

InPlaceFilters.displayName = 'InPlaceFilters';

export default InPlaceFilters;
