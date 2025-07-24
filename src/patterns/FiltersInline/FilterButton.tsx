import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import Drawer from '../../components/Drawer/Drawer';
import Filter from '../../components/Filter/Filter';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';
import { px } from '../../utils';
import FilterMenu from '../FilterMenu/FilterMenu';
import { FilterButtonDisplay } from './FilterButtonDisplay';
import { FilterDropdownMenuDesktop, FilterDropdownMenuMobile } from './FilterDropdownMenu';
import type { FilterButtonIconType, FilterDimension, FilterDropdownProps, FilterType } from './types';
import { countActiveFilters, getFilterButtonClickHandler } from './utils';

export const MainFilterDropdown = React.forwardRef<HTMLButtonElement, FilterDropdownProps>(
  (
    {
      filterId = 0,
      className,
      filterButtonLabel,
      buttonType,
      handleClick,
      filtersListState,
      filters,
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount,
      ariaLabels = {},
      id,
    },
    ref,
  ) => {
    const isButtonSelected = filtersListState?.[filterId] ?? false;
    const { totalCount, filterCount } = countActiveFilters(filters, buttonType);

    return (
      <>
        <FilterButtonDisplay
          ref={ref}
          className={className}
          isSelected={isButtonSelected}
          count={filterCount}
          label={
            `${filterButtonLabel === 'Sort' ? 'Sort By' : filterButtonLabel}` +
            (filterCount > 0 ? ` (${filterCount})` : '')
          }
          totalCount={totalCount}
          id={id}
          ariaLabel={ariaLabels.button || `${filterButtonLabel} button`}
          onClick={getFilterButtonClickHandler(filtersListState, handleClick, filterId)}
          isMobile={false}
          type={buttonType as unknown as FilterButtonIconType}
        />
        <Drawer
          isOpen={isButtonSelected}
          drawerOpenSide="left"
          onClose={() => {
            if (filtersListState && handleClick) {
              handleClick(filtersListState.map(() => false));
            }
          }}
          className={`${px}-filter-drawer`}
          aria-label={ariaLabels.drawer || 'Filter drawer'}
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
                    onChange={(e) => handleFilterSelection?.(e, filter.label)}
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
            className={classnames(`${px}-filter-dropdown__buttons-wrap`, `${px}-filter-dropdown__buttons-wrap--drawer`)}
          >
            <Button
              className={`${px}-filter-dropdown__button`}
              variant={ButtonVariants.secondary}
              onClick={() => clearFilterUpdate?.('all')}
            >
              Clear All
            </Button>
            <Button className={`${px}-filter-dropdown__button`} onClick={() => handleFilterUpdate?.(false)}>
              Show {resultsCount} lots
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
);

MainFilterDropdown.displayName = 'MainFilterDropdown';

export const SubFilterDropdown = React.forwardRef<HTMLButtonElement, FilterDropdownProps>(
  (
    {
      filterId = 0,
      className,
      filterButtonLabel,
      buttonType,
      handleClick,
      filtersListState,
      filters,
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount,
      ariaLabels = {},
      id,
    },
    ref,
  ) => {
    const isButtonSelected = filtersListState?.[filterId] ?? false;
    const { totalCount, filterCount } = countActiveFilters(filters, buttonType);
    const buttonLabel =
      `${filterButtonLabel === 'Sort' ? 'Sort By' : filterButtonLabel}` + (filterCount > 0 ? ` (${filterCount})` : '');

    return (
      <>
        <SSRMediaQuery.Media lessThan="md">
          <FilterButtonDisplay
            ref={ref}
            className={className}
            isSelected={isButtonSelected}
            count={filterCount}
            label={buttonLabel}
            id={id}
            totalCount={totalCount}
            ariaLabel={ariaLabels.button || `${filterButtonLabel} button`}
            onClick={getFilterButtonClickHandler(filtersListState, handleClick, filterId)}
            isMobile={true}
            type={buttonType as unknown as FilterButtonIconType}
          />
          <Drawer
            drawerOpenSide="bottom"
            isOpen={isButtonSelected}
            onClose={getFilterButtonClickHandler(filtersListState, handleClick, filterId)}
            aria-label={ariaLabels.drawer || `${filterButtonLabel} drawer`}
            className={`${px}-filter-drawer-mobile`}
            bottomContentLabel={`${buttonLabel} Filter`}
          >
            <FilterDropdownMenuMobile
              buttonType={buttonType}
              filters={filters}
              filterIndex={filterId}
              handleFilterSelection={handleFilterSelection}
              handleFilterUpdate={handleFilterUpdate}
              clearFilterUpdate={clearFilterUpdate}
              resultsCount={resultsCount}
              ariaLabels={ariaLabels}
            />
          </Drawer>
        </SSRMediaQuery.Media>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <Popover.Root
            key={`${id}-${filterButtonLabel}-button`}
            open={isButtonSelected}
            onOpenChange={getFilterButtonClickHandler(filtersListState, handleClick, filterId)}
          >
            <Popover.Trigger asChild>
              <FilterButtonDisplay
                ref={ref}
                className={className}
                isSelected={isButtonSelected}
                count={filterCount}
                label={buttonLabel}
                totalCount={totalCount}
                id={id}
                ariaLabel={ariaLabels.button || `${filterButtonLabel} button`}
                onClick={getFilterButtonClickHandler(filtersListState, handleClick, filterId)}
                isMobile={false}
                type={buttonType as unknown as FilterButtonIconType}
              />
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                avoidCollisions
                collisionPadding={10}
                sideOffset={5}
                align="start"
                alignOffset={5}
                aria-label={ariaLabels.popover || `${filterButtonLabel} dropdown`}
              >
                <FilterDropdownMenuDesktop
                  buttonType={buttonType}
                  filters={filters}
                  filterIndex={filterId}
                  handleFilterSelection={handleFilterSelection}
                  handleFilterUpdate={handleFilterUpdate}
                  clearFilterUpdate={clearFilterUpdate}
                  resultsCount={resultsCount}
                  ariaLabels={ariaLabels}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </SSRMediaQuery.Media>
      </>
    );
  },
);

SubFilterDropdown.displayName = 'SubFilterDropdown';
