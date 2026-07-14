import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import FilterInput from '../../components/Filter/FilterInput';
import { px } from '../../utils';
import { FilterDimension, FilterDropdownMenuProps } from './types';
import { getFilterDimensions, handleInputChange as handleInputChangeUtil, hasActiveDimensions } from './utils';

export const FilterDropdownMenuDesktop = React.forwardRef<HTMLDivElement, FilterDropdownMenuProps>(
  (
    {
      className,
      buttonType,
      filters,
      filterIndex,
      onSelectFilter,
      onClickClear,
      onApplyFilter,
      resultsCount,
      ariaLabels,
      dropdownMenuTranslation,
    },
    ref,
  ) => {
    const isSortButton = buttonType === 'Sort';
    const baseClassName = `${px}-filter-dropdown-menu`;
    const filterDimensions = getFilterDimensions(filters, filterIndex);
    const hasActiveFilters = hasActiveDimensions(filters, buttonType, filterIndex);

    return (
      <div
        className={classnames(baseClassName, className)}
        ref={ref}
        data-testid="filter-dropdown-desktop"
        aria-label={ariaLabels || `${buttonType} dropdown desktop`}
      >
        <div className={classnames(`${baseClassName}__filters`)}>
          {filterDimensions.map((value: FilterDimension) => (
            <FilterInput
              id={value.label}
              key={value.label}
              labelText={value.label}
              name={value.label}
              type={isSortButton ? 'radio' : 'checkbox'}
              checked={value.active}
              disabled={value?.disabled}
              onChange={(e) => handleInputChangeUtil(e, buttonType ?? '', onSelectFilter, 'dropdown')}
            />
          ))}
        </div>
        {/* Sort applies on selection, so the sort dropdown renders no action buttons. */}
        {!isSortButton && (
          <div className={classnames(`${baseClassName}__buttons-wrap`)}>
            <Button
              variant={ButtonVariants.secondary}
              isDisabled={!hasActiveFilters}
              onClick={() => onClickClear?.(buttonType ?? '')}
            >
              {dropdownMenuTranslation?.clearAll || 'Clear all'}
            </Button>
            <Button variant={ButtonVariants.primary} onClick={() => onApplyFilter?.(false)}>
              <span className={`${baseClassName}__button-text`}>
                {dropdownMenuTranslation?.showAuctions || `Show ${resultsCount} Auctions`}
              </span>
            </Button>
          </div>
        )}
      </div>
    );
  },
);

FilterDropdownMenuDesktop.displayName = 'FilterDropdownMenuDesktop';
