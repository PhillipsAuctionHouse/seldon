import classnames from 'classnames';
import React from 'react';
import { getCommonProps } from '../../utils';
import { FilterButton, FilterButtonProps } from './FilterButton';
import { AuctionFilterData, FilterType } from './types';

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
   * Filter button label.
   */
  filterLabel?: string;
  /**
   * Filter Button onClick handler.
   */
  handleFilterClick?: () => void;
  /**
   * List of labels for the filter buttons.
   */
  filtersLabelList?: string[];
  /**
   * List of states for the filter buttons.
   */
  filtersListState: boolean[];
  /**
   * Set the state of the filter buttons.
   */
  setFiltersLabelListState?: (state: boolean[]) => void;
  /**
   * Auction filter data for the filters.
   */
  auctionFilterData?: AuctionFilterData;
  /**
   * filters data
   */
  filters?: FilterType[];
}

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
      auctionFilterData,
      filters,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'InPlaceFilters');
    return (
      <div ref={ref} className={classnames(`${baseClassName}`, className)} {...commonProps}>
        {filtersLabelList &&
          filtersLabelList.length > 0 &&
          filtersLabelList.map((filterLabel, index) => (
            <FilterButton
              key={`${id}-${filterLabel}-button`}
              id={`${id}-${filterLabel}-button`}
              filterButtonLabel={filterLabel}
              buttonType={filterLabel as FilterButtonProps['buttonType']}
              handleClick={setFiltersLabelListState}
              filtersListState={filtersListState}
              index={index}
              auctionFilterData={auctionFilterData}
              filters={filters}
            />
          ))}
      </div>
    );
  },
);

InPlaceFilters.displayName = 'InPlaceFilters';

export default InPlaceFilters;
