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
    },
    ref,
  ) => {
    const isButtonSelected = filtersListState && typeof index === 'number' ? filtersListState[index] : false;

    const handleFilterButtonClick = () => {
      if (filtersListState && handleClick) {
        handleClick(filtersListState.map((selected, i) => (i === index ? !selected : false)));
      }
    };

    const { totalCount, filterCount } = countActiveFilters(filters, buttonType);
    const buttonLabel = `${filterButtonLabel === 'Sort' ? 'Sort By' : filterButtonLabel}${filterCount > 0 ? ` (${filterCount})` : ''}`;

    const renderButton = () => (
      <Button
        ref={ref}
        className={classnames(`${px}-filter-button`, className, {
          [`${px}-filter-button--selected`]:
            isButtonSelected || filterCount > 0 || (buttonType === 'Filter' && totalCount > 0),
        })}
        aria-label={filterButtonLabel}
        variant={ButtonVariants.secondary}
        data-testid={`${id}-button`}
        onClick={handleFilterButtonClick}
      >
        <Text variant={TextVariants.string2}>{buttonLabel}</Text>
        <Icon
          icon={buttonType === 'Filter' ? 'Filters' : isButtonSelected ? 'ChevronUp' : 'ChevronDown'}
          height={8}
          width={8}
          className={`${px}__icon`}
        />
        {totalCount > 0 && buttonType === 'Filter' && <div className={`${px}-filter-button--count`}>{totalCount}</div>}
      </Button>
    );

    // Drawer Filter button for mobile and desktop
    if (buttonType === 'Filter' && filters) {
      return (
        <>
          {renderButton()}
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
        </>
      );
    }

    // Popover Filter buttons for desktop, Drawer for mobile
    return (
      <>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <Popover.Root
            key={`${id}-${filterButtonLabel}-button`}
            open={isButtonSelected}
            onOpenChange={handleFilterButtonClick}
          >
            <Popover.Trigger asChild>{renderButton()}</Popover.Trigger>
            <Popover.Portal>
              <Popover.Content avoidCollisions collisionPadding={10} sideOffset={5} align="start" alignOffset={5}>
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
            {renderButton()}
            <Drawer variant="bottomSheet" isOpen={isButtonSelected} onClose={handleFilterButtonClick}>
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
