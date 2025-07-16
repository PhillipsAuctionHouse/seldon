import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import Drawer from '../../components/Drawer/Drawer';
import Filter from '../../components/Filter/Filter';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import { Icon } from '../../components/Icon';
import { Text, TextVariants } from '../../components/Text';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';
import { px } from '../../utils';
import FilterMenu from '../FilterMenu/FilterMenu';
import { FilterDropdown } from './FilterDropdown';
import { AuctionFilterButtonTypes, FilterDimension, FilterType } from './types';

export interface FilterButtonProps {
  /**
   * Unique id for component testing
   */
  id: string;
  /**
   * Base class for Filter button component.
   */
  className?: string;
  /**
   * Individual Filter button label.
   */
  filterButtonLabel: string;

  /**
   * Filter Button type.
   */
  buttonType: AuctionFilterButtonTypes;
  /**
   * Filter button onClick handler.
   */
  handleClick?: (state: boolean[]) => void;
  /**
   * List of states for the filter buttons.
   */
  filtersListState?: boolean[];
  /**
   * Index of the filter button in the filtersListState.
   */
  index?: number;
  /**
   * filters data
   */
  filters?: FilterType[];
  /**
   * Handle filter changes.
   */
  handleFilterSelection?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterId: string) => void;
  /**
   * Handle filter update.
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
    },
    ref,
  ) => {
    const isButtonSelected = filtersListState && typeof index === 'number' ? filtersListState[index] : false;

    const handleButtonClick = () => {
      if (filtersListState && handleClick) {
        handleClick(filtersListState.map((selected, i) => (i === index ? !selected : false)));
      }
    };

    const filterButtonElement = (
      <Button
        ref={ref}
        className={classnames(`${px}-filter-button`, className, {
          [`${px}-filter-button--selected`]: isButtonSelected,
        })}
        aria-label={filterButtonLabel}
        variant={ButtonVariants.secondary}
        data-testid={`${id}-button`}
        onClick={handleButtonClick}
      >
        <Text variant={TextVariants.string2}>{filterButtonLabel}</Text>
        <Icon
          icon={buttonType === 'Filter' ? 'Filters' : isButtonSelected ? 'ChevronUp' : 'ChevronDown'}
          height={8}
          width={8}
          className={`${px}__icon`}
        />
        {/* Filter drawer floating counter icon */}
      </Button>
    );

    return buttonType === 'Filter' && filters ? (
      <>
        {filterButtonElement}
        <Drawer isOpen={isButtonSelected} drawerOpenSide="left" onClose={() => handleButtonClick()}>
          <FilterMenu>
            {filters.map((filter: FilterType) => (
              <Filter key={filter.label} name={filter.label}>
                <FilterHeader heading={filter.label} />
                {Array.from(filter.filterDimensions).map((value: FilterDimension) => (
                  <FilterInput
                    id={value.label}
                    key={value.label}
                    labelText={value.label}
                    onChange={(e) => {
                      console.log('calling handleFilter func', e);
                      // handleFilter(e, filter.id)
                    }}
                    type={filter.type as 'checkbox' | 'radio'}
                    disabled={value?.disabled}
                    name={value.label}
                    checked={value.active}
                  />
                ))}
              </Filter>
            ))}
          </FilterMenu>

          <div className={`${px}-filter-dropdown__buttons-wrap`}>
            <Button
              className={`${px}-filter-dropdown__button`}
              variant={ButtonVariants.secondary}
              onClick={() => {
                // Handle clear all button click
              }}
            >{`Clear All`}</Button>
            <Button
              className={`${px}-filter-dropdown__button`}
              onClick={() => {
                // Handle filter button click
              }}
            >
              Show {resultsCount} lots
            </Button>
          </div>
        </Drawer>
      </>
    ) : (
      <>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <Popover.Root key={`${id}-${filterButtonLabel}-button`} open={isButtonSelected}>
            <Popover.Trigger asChild>{filterButtonElement}</Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                avoidCollisions={true}
                collisionPadding={10}
                sideOffset={5}
                align="start"
                alignOffset={5}
              >
                <FilterDropdown
                  buttonType={buttonType}
                  filters={filters}
                  filterIndex={index}
                  handleFilterSelection={handleFilterSelection}
                  handleFilterUpdate={handleFilterUpdate}
                  clearFilterUpdate={clearFilterUpdate}
                  resultsCount={resultsCount}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </SSRMediaQuery.Media>
        <SSRMediaQuery.Media lessThan="md">
          <>
            {filterButtonElement}
            <Drawer variant="bottomSheet" isOpen={isButtonSelected} onClose={() => handleButtonClick()}>
              <FilterDropdown
                buttonType={buttonType}
                isMobileDropdown
                filters={filters}
                filterIndex={index}
                handleFilterSelection={handleFilterSelection}
                handleFilterUpdate={handleFilterUpdate}
                clearFilterUpdate={clearFilterUpdate}
                resultsCount={resultsCount}
              />
            </Drawer>
          </>
        </SSRMediaQuery.Media>
      </>
    );
  },
);
FilterButton.displayName = 'FilterButton';
