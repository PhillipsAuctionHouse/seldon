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
import { FilterDropdown } from './FilterDropdown';
import { FilterButtonProps, FilterDimension, FilterType } from './types';
import { countActiveFilters } from './utils';

export const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  (
    {
      id,
      className,
      filterButtonLabel,
      buttonType,
      handleClick,
      filtersListState,
      index,
      filters,
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount,
      ariaLabels = {},
    },
    ref,
  ) => {
    const isButtonSelected = filtersListState?.[index ?? -1] ?? false;

    const handleFilterButtonClick = () => {
      if (filtersListState && handleClick) {
        handleClick(filtersListState.map((selected, i) => (i === index ? !selected : false)));
      }
    };

    const { totalCount, filterCount } = countActiveFilters(filters, buttonType);
    const buttonLabel =
      `${filterButtonLabel === 'Sort' ? 'Sort By' : filterButtonLabel}` + (filterCount > 0 ? ` (${filterCount})` : '');

    // Main Filter button (shows all filters in a Drawer)
    if (buttonType === 'Filter' && filters) {
      return (
        <>
          <FilterButtonDisplay
            ref={ref}
            className={className}
            isButtonSelected={isButtonSelected}
            filterCount={filterCount}
            totalCount={totalCount}
            buttonType={buttonType}
            filterButtonLabel={filterButtonLabel}
            buttonLabel={buttonLabel}
            id={id}
            handleFilterButtonClick={handleFilterButtonClick}
            isMobileDropdown={false}
            ariaLabel={ariaLabels.button || 'Filter button'}
          />
          <Drawer
            isOpen={isButtonSelected}
            drawerOpenSide="left"
            onClose={handleFilterButtonClick}
            className={`${px}-filter-drawer`}
            aria-label={ariaLabels.drawer || 'Filter drawer'}
          >
            <Drawer
              isOpen={isButtonSelected}
              drawerOpenSide="left"
              onClose={handleFilterButtonClick}
              className={`${px}-filter-drawer`}
            >
              <FilterMenu className={`${px}-filter-drawer-menu`}>
                {filters.map((filter: FilterType) => (
                  <Filter key={filter.label} name={filter.label}>
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
                className={classnames(
                  `${px}-filter-dropdown__buttons-wrap`,
                  `${px}-filter-dropdown__buttons-wrap--drawer`,
                )}
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
          </Drawer>
        </>
      );
    }

    // Other filter buttons: Popover for desktop, Drawer for mobile
    return (
      <>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <Popover.Root
            key={`${id}-${filterButtonLabel}-button`}
            open={isButtonSelected}
            onOpenChange={handleFilterButtonClick}
          >
            <Popover.Trigger asChild>
              <FilterButtonDisplay
                ref={ref}
                className={className}
                isButtonSelected={isButtonSelected}
                filterCount={filterCount}
                totalCount={totalCount}
                buttonType={buttonType}
                filterButtonLabel={filterButtonLabel}
                buttonLabel={buttonLabel}
                id={id}
                handleFilterButtonClick={handleFilterButtonClick}
                isMobileDropdown={false}
                ariaLabel={ariaLabels.button || `${filterButtonLabel} button`}
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
                <FilterDropdown
                  buttonType={buttonType}
                  filters={filters}
                  filterIndex={index}
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
        <SSRMediaQuery.Media lessThan="md">
          <>
            <FilterButtonDisplay
              ref={ref}
              className={className}
              isButtonSelected={isButtonSelected}
              filterCount={filterCount}
              totalCount={totalCount}
              buttonType={buttonType}
              filterButtonLabel={filterButtonLabel}
              buttonLabel={buttonLabel}
              id={id}
              handleFilterButtonClick={handleFilterButtonClick}
              isMobileDropdown={true}
              ariaLabel={ariaLabels.button || `${filterButtonLabel} button`}
            />
            <Drawer
              variant="bottomSheet"
              isOpen={isButtonSelected}
              onClose={handleFilterButtonClick}
              aria-label={ariaLabels.drawer || `${filterButtonLabel} drawer`}
            >
              <FilterDropdown
                buttonType={buttonType}
                isMobileDropdown
                filters={filters}
                filterIndex={index}
                handleFilterSelection={handleFilterSelection}
                handleFilterUpdate={handleFilterUpdate}
                clearFilterUpdate={clearFilterUpdate}
                resultsCount={resultsCount}
                ariaLabels={ariaLabels}
              />
            </Drawer>
          </>
        </SSRMediaQuery.Media>
      </>
    );
  },
);

FilterButton.displayName = 'FilterButton';
