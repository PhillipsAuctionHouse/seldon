import classnames from 'classnames';
import React from 'react';
import { getCommonProps } from '../../utils';
import { MainFilterDropdown } from './MainFilterDropdown';
import { SubFilterDropdown } from './SubFilterDropdown';
import { BaseFilterProps, DropdownMenuTranslation, FilterButtonType } from './types';

/**
 * Props for the FiltersInline component (main component).
 */
export interface FiltersInlineProps extends BaseFilterProps {
  /** Unique id for component testing */
  id: string;
  /** Handler for filter button click */
  handleFilterClick?: () => void;
  /** List of states for the filter buttons */
  filtersListState?: boolean[];
  /** Setter for the filter button states */
  setFiltersLabelListState?: (state: boolean[]) => void;
  /** Main filter button type (e.g., 'Filter', 'Sort') */
  mainFilterLabel: FilterButtonType;
  /** Object containing translated strings for dropdown menu actions.*/
  dropdownMenuTranslation?: DropdownMenuTranslation;
  /** Whether to hide the desktop sort button */
  hideDesktopSortButton?: boolean;
}

/**
 * ## Overview
 *
 * FiltersInline component for rendering a row of filter buttons.
 *
 * [Figma Link](https://www.figma.com/design/H1kCh6MXU8jasYbQuCbyBt/Calendar?node-id=55-487568&p=f&m=dev)
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-filters-inline--overview)
 */
const FiltersInline = React.forwardRef<HTMLDivElement, FiltersInlineProps>(
  (
    {
      id,
      className,
      filtersListState,
      setFiltersLabelListState,
      filters,
      onSelectFilter,
      onApplyFilter,
      onClickClear,
      resultsCount,
      mainFilterLabel,
      dropdownMenuTranslation,
      hideDesktopSortButton = true,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'FiltersInline');

    return (
      <div ref={ref} className={classnames(baseClassName, className)} {...commonProps} id={id}>
        <MainFilterDropdown
          key={`${id}-${mainFilterLabel}-button`}
          id={`${id}-${mainFilterLabel}-button`}
          filterButtonLabel={mainFilterLabel}
          handleClick={setFiltersLabelListState}
          filtersListState={filtersListState}
          filters={filters}
          onSelectFilter={onSelectFilter}
          onApplyFilter={onApplyFilter}
          onClickClear={onClickClear}
          resultsCount={resultsCount}
          dropdownMenuTranslation={dropdownMenuTranslation}
        />
        {filters
          ?.map((filter, index) => ({ filter, filterId: index + 1 }))
          // Render the Sort pill last in the DOM so keyboard/reading order
          // matches the visual order. Sort is listed first for the drawer, but
          // sits last (right-aligned) in the row; a stable sort keeps the other
          // pills in their original order.
          .sort(
            (a, b) =>
              (a.filter.buttonType === FilterButtonType.Sort ? 1 : 0) -
              (b.filter.buttonType === FilterButtonType.Sort ? 1 : 0),
          )
          .map(({ filter, filterId }) => (
            <SubFilterDropdown
              key={`${id}-${filter.label}-button`}
              id={`${id}-${filter.label}-button`}
              filterButtonLabel={filter.label}
              buttonType={filter.buttonType as unknown as FilterButtonType}
              handleClick={setFiltersLabelListState}
              filtersListState={filtersListState}
              filterId={filterId}
              filters={filters}
              onSelectFilter={onSelectFilter}
              onApplyFilter={onApplyFilter}
              onClickClear={onClickClear}
              resultsCount={resultsCount}
              filterButtonLabelTranslated={filter.filterButtonLabelTranslated}
              dropdownMenuTranslation={dropdownMenuTranslation}
              hideDesktopSortButton={hideDesktopSortButton}
            />
          ))}
      </div>
    );
  },
);

FiltersInline.displayName = 'FiltersInline';

export default FiltersInline;
