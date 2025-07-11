import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import React from 'react';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { FilterInput } from '../../components/Filter';
import FilterHeader from '../../components/Filter/FilterHeader';
import { Icon } from '../../components/Icon';
import { Text, TextVariants } from '../../components/Text';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';
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
   * Auction filter data for the filters.
   */
  auctionFilterData?: AuctionFilterData;
  /**
   * isMobileDropdown style
   */
  isMobileDropdown?: boolean;
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
  ({ className, buttonType, auctionFilterData, isMobileDropdown = false }, ref) => {
    const dropdownContent = (() => {
      const filterDropdownClass = classnames(`${px}-filter-dropdown__filters`, {
        [`${px}-filter-dropdown__filters--mobile`]: isMobileDropdown,
      });
      switch (buttonType) {
        case 'Sort':
          return (
            <>
              <div className={filterDropdownClass}>
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
              <div
                className={classnames(`${px}-filter-dropdown__button-wrap`, {
                  [`${px}-filter-dropdown__mobile-wrap`]: isMobileDropdown,
                })}
              >
                <Button
                  className={classnames(`${px}-filter-dropdown__button`, {
                    [`${px}-filter-dropdown__button--mobile`]: isMobileDropdown,
                  })}
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
            </>
          );
        case 'Sale':
          return (
            <>
              <div className={filterDropdownClass}>
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
              <div
                className={classnames(`${px}-filter-dropdown__buttons-wrap`, {
                  [`${px}-filter-dropdown__mobile-wrap`]: isMobileDropdown,
                })}
              >
                <Button
                  className={classnames(
                    `${px}-filter-dropdown__buttons`,
                    {
                      [`${px}-filter-dropdown__buttons--mobile`]: isMobileDropdown,
                    },
                    {
                      [`${px}-filter-dropdown__buttons--left`]: isMobileDropdown,
                    },
                  )}
                  variant={ButtonVariants.secondary}
                  onClick={() => {
                    // Handle sort btn click
                  }}
                >
                  <Text variant={TextVariants.string2}>Clear all</Text>
                </Button>
                <Button
                  className={classnames(
                    `${px}-filter-dropdown__buttons`,
                    {
                      [`${px}-filter-dropdown__buttons--mobile`]: isMobileDropdown,
                    },
                    {
                      [`${px}-filter-dropdown__buttons--right`]: isMobileDropdown,
                    },
                  )}
                  variant={ButtonVariants.primary}
                  onClick={() => {
                    // Handle sort btn click
                  }}
                >
                  <Text variant={TextVariants.string2} className={`${px}-filter-dropdown__button-text`}>
                    Show {auctionFilterData?.[buttonType]?.auctionCount} Auctions
                  </Text>
                </Button>
              </div>
            </>
          );
        case 'Departments':
        case 'Month':
        case 'Location':
          return (
            <>
              <div className={filterDropdownClass}>
                {auctionFilterData?.[buttonType]?.filterLabels &&
                  auctionFilterData?.[buttonType]?.filterLabels.map((value) => (
                    <FilterInput
                      id={value.label}
                      key={value.label}
                      labelText={value.label}
                      name={value.label}
                      type="checkbox"
                    />
                  ))}
              </div>
              <div
                className={classnames(`${px}-filter-dropdown__buttons-wrap`, {
                  [`${px}-filter-dropdown__mobile-wrap`]: isMobileDropdown,
                })}
              >
                <Button
                  className={classnames(
                    `${px}-filter-dropdown__buttons`,
                    {
                      [`${px}-filter-dropdown__buttons--mobile`]: isMobileDropdown,
                    },
                    {
                      [`${px}-filter-dropdown__buttons--left`]: isMobileDropdown,
                    },
                  )}
                  variant={ButtonVariants.secondary}
                  onClick={() => {
                    // Handle sort btn click
                  }}
                >
                  <Text variant={TextVariants.string2}>Clear all</Text>
                </Button>
                <Button
                  className={classnames(
                    `${px}-filter-dropdown__buttons`,
                    {
                      [`${px}-filter-dropdown__buttons--mobile`]: isMobileDropdown,
                    },
                    {
                      [`${px}-filter-dropdown__buttons--right`]: isMobileDropdown,
                    },
                  )}
                  variant={ButtonVariants.primary}
                  onClick={() => {
                    // Handle sort btn click
                  }}
                >
                  <Text variant={TextVariants.string2} className={`${px}-filter-dropdown__button-text`}>
                    Show {auctionFilterData?.[buttonType]?.auctionCount} Auctions
                  </Text>
                </Button>
              </div>
            </>
          );
        default:
          return <></>;
      }
    })();

    return (
      <div
        className={classnames(`${px}-filter-dropdown`, className, {
          [`${px}-filter-dropdown--mobile`]: isMobileDropdown,
        })}
        ref={ref}
      >
        <FilterHeader
          heading={buttonType}
          className={classnames(`${px}-filter-dropdown__header`, {
            [`${px}-filter-dropdown__header--mobile`]: isMobileDropdown,
          })}
        />
        {dropdownContent}
      </div>
    );
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
   * Auction filter data for the filters.
   */
  auctionFilterData?: AuctionFilterData;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ id, className, filterButtonLabel, buttonType, handleClick, filtersListState, index, auctionFilterData }, ref) => {
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

    return (
      <>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <Popover.Root key={`${id}-${filterButtonLabel}-button`}>
            <Popover.Trigger asChild>{filterButtonElement}</Popover.Trigger>
            <Popover.Portal>
              {buttonType !== 'Filter' && (
                <Popover.Content
                  avoidCollisions={true}
                  collisionPadding={10}
                  sideOffset={5}
                  align="start"
                  alignOffset={5}
                >
                  <FilterDropdown buttonType={buttonType} auctionFilterData={auctionFilterData} />
                </Popover.Content>
              )}
            </Popover.Portal>
          </Popover.Root>
        </SSRMediaQuery.Media>
        <SSRMediaQuery.Media lessThan="md">
          <>
            {filterButtonElement}
            <BottomSheet isOpen={isButtonSelected} onClose={() => handleButtonClick()}>
              {buttonType !== 'Filter' && (
                <FilterDropdown buttonType={buttonType} auctionFilterData={auctionFilterData} isMobileDropdown />
              )}
            </BottomSheet>
          </>
        </SSRMediaQuery.Media>
      </>
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
export type AuctionFilter = {
  id: string;
  label: string;
  value: string;
};
export type AuctionFilterButton = {
  auctionCount: number;
  filterLabels?: AuctionFilter[];
};
export type AuctionFilterData = {
  Filters: AuctionFilterButton;
  Sale: AuctionFilterButton;
  Departments: AuctionFilterButton;
  Month: AuctionFilterButton;
  Location: AuctionFilterButton;
};

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
  filterLabel?: string;
  /**
   * Filter Button onClick handler.
   */
  handleFilterClick?: () => void;
  /**
   * List of labels for the filter buttons.
   */
  filtersLabelList?: string[];
  /**
   * List of states for the filter buttons.
   */
  filtersListState: boolean[];
  /**
   * Set the state of the filter buttons.
   */
  setFiltersLabelListState?: (state: boolean[]) => void;
  /**
   * Auction filter data for the filters.
   */
  auctionFilterData?: AuctionFilterData;
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
      auctionFilterData,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'InPlaceFilters');
    return (
      <div ref={ref} className={classnames(`${baseClassName}`, className)} {...commonProps}>
        <FilterButton
          id={`${id}-filter`}
          filterButtonLabel={filterLabel ?? ''}
          buttonType="Filter"
          auctionFilterData={auctionFilterData}
        />
        {filtersLabelList &&
          filtersLabelList.length > 0 &&
          filtersLabelList.map((filterLabel, index) => (
            <FilterButton
              key={`${id}-${filterLabel}-button`}
              id={`${id}-${filterLabel}-button`}
              filterButtonLabel={filterLabel}
              buttonType={filterLabel as FilterButtonProps['buttonType']}
              handleClick={setFiltersLabelListState}
              filtersListState={filtersListState}
              index={index}
              auctionFilterData={auctionFilterData}
            />
          ))}
      </div>
    );
  },
);

InPlaceFilters.displayName = 'InPlaceFilters';

export default InPlaceFilters;
