import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { FilterInput } from '../../components/Filter';
import FilterHeader from '../../components/Filter/FilterHeader';
import { Icon } from '../../components/Icon';
import { Text, TextVariants } from '../../components/Text';
import { getCommonProps, px } from '../../utils';

export type DropDownList = {
  id: string;
  label: string;
  value: string;
};

export interface FilterDropdownProps {
  /**
   * Base class for Filter Dropdown button component.
   */
  className?: string;
  /**
   * Button type.
   */
  buttonType: 'Sort' | 'Sale' | 'Departments' | 'Month' | 'Location';
  /**
   * Number of auctions to display in the Sale filter dropdown.
   */
  auctionCount?: number;
}

const sortDropDownList = [
  {
    id: 'sort-by-date-ascending',
    label: 'End Date: Ascending',
    value: 'Ascending',
  },
  {
    id: 'sort-by-date-descending',
    label: 'End Date: Descending',
    value: 'Descending',
  },
];
const saleDropDownList = [
  {
    id: 'sale-type-online',
    label: 'Online Auction',
    value: 'Online',
  },
  {
    id: 'sale-type-live',
    label: 'Live Auction',
    value: 'Live',
  },
];

const FilterDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({ className, buttonType, auctionCount }, ref) => {
    switch (buttonType) {
      case 'Sort':
        return (
          <div className={classnames(`${px}-filter-dropdown`, className)} ref={ref}>
            <FilterHeader heading="Sort By" className={`${px}-filter-dropdown__header`} />
            <div className={`${px}-filter-dropdown__filters`}>
              {sortDropDownList.map((value) => (
                <FilterInput
                  id={value.label}
                  key={value.label}
                  labelText={value.label}
                  name={value.label}
                  type="radio"
                />
              ))}
            </div>
            <Button
              className={`${px}-filter-dropdown__button`}
              variant={ButtonVariants.primary}
              onClick={() => {
                // Handle sort btn click
              }}
            >
              <Text variant={TextVariants.string2} className={`${px}-filter-dropdown__button-text`}>
                Confirm
              </Text>
            </Button>
          </div>
        );
      case 'Sale':
        return (
          <div className={classnames(`${px}-filter-dropdown`, className)} ref={ref}>
            <FilterHeader heading="Sale Type" className={`${px}-filter-dropdown__header`} />
            <div className={`${px}-filter-dropdown__filters`}>
              {saleDropDownList.map((value) => (
                <FilterInput
                  id={value.label}
                  key={value.label}
                  labelText={value.label}
                  name={value.label}
                  type="checkbox"
                />
              ))}
            </div>
            <div className={`${px}-filter-dropdown__buttons`}>
              <Button
                variant={ButtonVariants.secondary}
                onClick={() => {
                  // Handle sort btn click
                }}
              >
                <Text variant={TextVariants.string2}>Clear all</Text>
              </Button>
              <Button
                variant={ButtonVariants.primary}
                onClick={() => {
                  // Handle sort btn click
                }}
              >
                <Text variant={TextVariants.string2} className={`${px}-filter-dropdown__button-text`}>
                  Show {auctionCount} Auctions
                </Text>
              </Button>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  },
);

FilterDropdown.displayName = 'FilterDropdown';

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
   * Button type.
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
   * Number of auctions to display in the Sale filter dropdown.
   */
  auctionCount?: number;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ id, className, filterButtonLabel, buttonType, handleClick, filtersListState, index, auctionCount }, ref) => {
    const isButtonSelected = filtersListState && typeof index === 'number' ? filtersListState[index] : false;
    return (
      <Popover.Root key={`${id}-${filterButtonLabel}-button`}>
        <Popover.Trigger asChild>
          <Button
            ref={ref}
            className={classnames(`${px}-filter-button`, className, {
              [`${px}-filter-button--selected`]: isButtonSelected,
            })}
            aria-label={filterButtonLabel}
            variant={ButtonVariants.secondary}
            data-testid={`${id}-button`}
            onClick={() => {
              if (filtersListState && handleClick) {
                handleClick(filtersListState.map((selected, i) => (i === index ? !selected : false)));
              }
            }}
          >
            <Text variant={TextVariants.string2}>{filterButtonLabel}</Text>
            <Icon
              icon={buttonType === 'Filter' ? 'Filters' : isButtonSelected ? 'ChevronUp' : 'ChevronDown'}
              height={8}
              width={8}
              className={`${px}__icon`}
            />
            {/* Filter floating counter */}
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          {buttonType !== 'Filter' && (
            <Popover.Content avoidCollisions={true} collisionPadding={10} sideOffset={5} align="start" alignOffset={5}>
              <FilterDropdown buttonType={buttonType} auctionCount={auctionCount} />
            </Popover.Content>
          )}
        </Popover.Portal>
      </Popover.Root>
    );
  },
);
FilterButton.displayName = 'FilterButton';
/**
 * ## Overview
 *
 * Overview of InPlaceFilters component
 *
 * [Figma Link](https://www.figma.com/design/H1kCh6MXU8jasYbQuCbyBt/Calendar?node-id=55-487568&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-in-place-filters--overview)
 */

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
  filterLabel: string;
  /**
   * Filter Button onClick handler.
   */
  handleFilterClick?: () => void;
  /**
   * List of labels for the filter buttons.
   */
  filtersLabelList: string[];
  /**
   * List of states for the filter buttons.
   */
  filtersListState: boolean[];
  /**
   * Set the state of the filter buttons.
   */
  setFiltersLabelListState?: (state: boolean[]) => void;
  /**
   * Number of auctions to display in the Sale filter dropdown.
   */
  auctionCount?: number;
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
      auctionCount,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'InPlaceFilters');

    return (
      <div ref={ref} className={classnames(`${baseClassName}`, className)} {...commonProps}>
        <FilterButton id={`${id}-filter`} filterButtonLabel={filterLabel} buttonType="Filter" />
        {filtersLabelList.length > 0 &&
          filtersLabelList.map((filterLabel, index) => (
            <FilterButton
              key={`${id}-${filterLabel}-button`}
              id={`${id}-${filterLabel}-button`}
              filterButtonLabel={filterLabel}
              buttonType={filterLabel as FilterButtonProps['buttonType']}
              handleClick={setFiltersLabelListState}
              filtersListState={filtersListState}
              index={index}
              auctionCount={auctionCount}
            />
          ))}
      </div>
    );
  },
);

InPlaceFilters.displayName = 'InPlaceFilters';

export default InPlaceFilters;
