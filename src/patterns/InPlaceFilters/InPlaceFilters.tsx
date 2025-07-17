import classnames from 'classnames';
import React from 'react';
import { getCommonProps } from '../../utils';
import { FilterButton } from './FilterButton';
import { FilterButtonProps, InPlaceFiltersProps } from './types';

/**
 * ## Overview
 *
 * InPlaceFilters component for rendering a row of filter buttons.
 *
 * [Figma Link](https://www.figma.com/design/H1kCh6MXU8jasYbQuCbyBt/Calendar?node-id=55-487568&p=f&m=dev)
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-in-place-filters--overview)
 */

const InPlaceFilters = React.forwardRef<HTMLDivElement, InPlaceFiltersProps>(
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
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'InPlaceFilters');
    return (
      <div ref={ref} className={classnames(baseClassName, className)} {...commonProps}>
        {filtersLabels.map((label, index) => (
          <FilterButton
            key={`${id}-${label}-button`}
            id={`${id}-${label}-button`}
            filterButtonLabel={label}
            buttonType={label as FilterButtonProps['buttonType']}
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
