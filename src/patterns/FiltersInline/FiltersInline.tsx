import classnames from 'classnames';
import React from 'react';
import { getCommonProps } from '../../utils';
import { MainFilterDropdown, SubFilterDropdown } from './FilterButton';
import { FilterButtonType, FiltersInlineProps } from './types';

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
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount,
      filtersLabels,
      ariaLabels,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'FiltersInline');

    return (
      <div ref={ref} className={classnames(baseClassName, className)} {...commonProps} id={id}>
        {filtersLabels?.map((label, index) =>
          index === 0 ? (
            <MainFilterDropdown
              key={`${id}-${label}-button`}
              id={`${id}-${label}-button`}
              filterButtonLabel={label}
              filterId={index}
              buttonType={label as FilterButtonType}
              handleClick={setFiltersLabelListState}
              filtersListState={filtersListState}
              filters={filters}
              handleFilterSelection={handleFilterSelection}
              handleFilterUpdate={handleFilterUpdate}
              clearFilterUpdate={clearFilterUpdate}
              resultsCount={resultsCount}
              ariaLabels={ariaLabels}
            />
          ) : (
            <SubFilterDropdown
              key={`${id}-${label}-button`}
              id={`${id}-${label}-button`}
              filterButtonLabel={label}
              buttonType={label as FilterButtonType}
              handleClick={setFiltersLabelListState}
              filtersListState={filtersListState}
              filterId={index}
              filters={filters}
              handleFilterSelection={handleFilterSelection}
              handleFilterUpdate={handleFilterUpdate}
              clearFilterUpdate={clearFilterUpdate}
              resultsCount={resultsCount}
              ariaLabels={ariaLabels}
            />
          ),
        )}
      </div>
    );
  },
);

FiltersInline.displayName = 'FiltersInline';

export default FiltersInline;
