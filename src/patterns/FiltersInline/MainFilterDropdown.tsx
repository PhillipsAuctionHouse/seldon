import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import Drawer from '../../components/Drawer/Drawer';
import Filter from '../../components/Filter/Filter';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import { px } from '../../utils';
import FilterMenu from '../FilterMenu/FilterMenu';
import { FilterButton } from './FilterButton';
import { FilterButtonIconType, type FilterDimension, type FilterDropdownProps, type FilterType } from './types';
import { countActiveFilters, getFilterButtonClickHandler, resetAllFilters } from './utils';
export const MainFilterDropdown = React.forwardRef<HTMLButtonElement, FilterDropdownProps>(
  (
    {
      className,
      filterButtonLabel,
      handleClick,
      filtersListState,
      filters,
      onSelectFilter,
      onApplyFilter,
      onClickClear,
      resultsCount,
      dropdownMenuTranslation,
      ariaLabels = {},
      id,
    },
    ref,
  ) => {
    const isButtonSelected = filtersListState?.[0] ?? false;
    const { totalCount, filterCount } = countActiveFilters(filters, filterButtonLabel);

    return (
      <>
        <FilterButton
          ref={ref}
          className={className}
          isSelected={isButtonSelected}
          count={filterCount}
          label={filterButtonLabel}
          totalCount={totalCount}
          id={id}
          ariaLabel={ariaLabels.button || `${filterButtonLabel} button`}
          onClick={getFilterButtonClickHandler(filtersListState, handleClick, 0)}
          isMobile={false}
          type={FilterButtonIconType.Filter}
        />
        <Drawer
          isOpen={isButtonSelected}
          drawerOpenSide="left"
          onClose={() => resetAllFilters(filtersListState, handleClick)}
          className={`${px}-filter-drawer`}
          aria-label={ariaLabels.drawer || 'Filter drawer'}
          paddingLevel={0}
        >
          <FilterMenu className={`${px}-filter-drawer-menu`}>
            {filters?.map((filter: FilterType) => (
              <Filter key={filter.id} name={filter.label}>
                <FilterHeader heading={filter.label} />
                {Array.from(filter.filterDimensions).map((value: FilterDimension) => (
                  <FilterInput
                    id={value.label}
                    key={value.label}
                    labelText={value.label}
                    onChange={(e) => onSelectFilter?.(e, filter.buttonType)}
                    type={filter.type as 'checkbox' | 'radio'}
                    disabled={value?.disabled}
                    name={value.label}
                    checked={value.active}
                  />
                ))}
              </Filter>
            ))}
          </FilterMenu>
          <div
            className={classnames(
              `${px}-filter-dropdown-menu__buttons-wrap`,
              `${px}-filter-dropdown-menu__buttons-wrap--drawer`,
            )}
          >
            <Button
              className={`${px}-filter-dropdown-menu__button`}
              variant={ButtonVariants.secondary}
              onClick={() => onClickClear?.('all')}
            >
              {dropdownMenuTranslation?.clearAll || 'Clear all'}
            </Button>
            <Button className={`${px}-filter-dropdown-menu__button`} onClick={() => onApplyFilter?.(false)}>
              {dropdownMenuTranslation?.showAuctions || `Show ${resultsCount} Auctions`}
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
);

MainFilterDropdown.displayName = 'MainFilterDropdown';
