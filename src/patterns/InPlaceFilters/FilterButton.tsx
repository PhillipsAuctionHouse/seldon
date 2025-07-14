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
import { AuctionFilterData, FilterDimension, FilterType } from './types';

export type DropDownList = {
  id: string;
  label: string;
  value: string;
};

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
  buttonType: 'Filter' | 'Sort' | 'Sale' | 'Departments' | 'Month' | 'Location';
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
   * Auction filter data for the filters.
   */
  auctionFilterData?: AuctionFilterData;
  /**
   * filters data
   */
  filters?: FilterType[];
}

export const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  (
    { id, className, filterButtonLabel, buttonType, handleClick, filtersListState, index, auctionFilterData, filters },
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

          <Button
            onClick={() => {
              // Handle filter button click
            }}
          >{`Show ${0} lots`}</Button>
        </Drawer>
      </>
    ) : (
      <>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <Popover.Root key={`${id}-${filterButtonLabel}-button`}>
            <Popover.Trigger asChild>{filterButtonElement}</Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                avoidCollisions={true}
                collisionPadding={10}
                sideOffset={5}
                align="start"
                alignOffset={5}
              >
                <FilterDropdown buttonType={buttonType} auctionFilterData={auctionFilterData} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </SSRMediaQuery.Media>
        <SSRMediaQuery.Media lessThan="md">
          <>
            {filterButtonElement}
            <Drawer variant="bottomSheet" isOpen={isButtonSelected} onClose={() => handleButtonClick()}>
              <FilterDropdown buttonType={buttonType} auctionFilterData={auctionFilterData} isMobileDropdown />
            </Drawer>
          </>
        </SSRMediaQuery.Media>
      </>
    );
  },
);
FilterButton.displayName = 'FilterButton';
