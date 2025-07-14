import classnames from 'classnames';
import React from 'react';
import { getCommonProps } from '../../utils';
import { FilterButton, FilterButtonProps } from './FilterButton';
import { AuctionFilterData } from './types';

/**
 * ## Overview
 *
 * Overview of InPlaceFilters component
 *
 * [Figma Link](https://www.figma.com/design/H1kCh6MXU8jasYbQuCbyBt/Calendar?node-id=55-487568&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-in-place-filters--overview)
 */
export type AuctionFilter = {
  id: string;
  label: string;
  value: string;
};
export type AuctionFilterButton = {
  auctionCount: number;
  filterLabels?: AuctionFilter[];
};

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
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'InPlaceFilters');
    return (
      <div ref={ref} className={classnames(`${baseClassName}`, className)} {...commonProps}>
        <FilterButton
          id={`${id}-filter`}
          filterButtonLabel={filterLabel ?? ''}
          buttonType="Filter"
          auctionFilterData={auctionFilterData}
        />
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
            />
          ))}
      </div>
    );
  },
);

InPlaceFilters.displayName = 'InPlaceFilters';

export default InPlaceFilters;
