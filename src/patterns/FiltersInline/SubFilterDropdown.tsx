import * as Popover from '@radix-ui/react-popover';
import React from 'react';
import Drawer from '../../components/Drawer/Drawer';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';
import { px } from '../../utils';
import { FilterButton } from './FilterButton';
import { FilterDropdownMenuDesktop } from './FilterDropdownMenuDesktop';
import { FilterDropdownMenuMobile } from './FilterDropdownMenuMobile';
import { FilterButtonType, type FilterButtonIconType, type FilterDropdownProps } from './types';
import { countActiveFilters, getFilterButtonClickHandler, getFilterButtonLabel } from './utils';
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
      onSelectFilter,
      onApplyFilter,
      onClickClear,
      resultsCount,
      filterButtonLabelTranslated,
      dropdownMenuTranslation,
      ariaLabels = {},
      hideDesktopSortButton,
      id,
    },
    ref,
  ) => {
    const isButtonSelected = filtersListState?.[filterId] ?? false;
    const { totalCount, filterCount } = countActiveFilters(filters, buttonType);
    const buttonLabel = getFilterButtonLabel(filterButtonLabel, filterCount, filterButtonLabelTranslated || null);

    if (hideDesktopSortButton && buttonType === FilterButtonType.Sort) {
      return null;
    }

    return (
      <>
        <SSRMediaQuery.Media lessThan="md">
          <FilterButton
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
              onSelectFilter={onSelectFilter}
              onApplyFilter={onApplyFilter}
              onClickClear={onClickClear}
              resultsCount={resultsCount}
              ariaLabels={ariaLabels?.ariaLabel}
              filterButtonLabel={filterButtonLabel}
              filterButtonLabelTranslated={filterButtonLabelTranslated}
              dropdownMenuTranslation={dropdownMenuTranslation}
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
              <FilterButton
                ref={ref}
                className={className}
                isSelected={isButtonSelected}
                count={filterCount}
                label={buttonLabel}
                totalCount={totalCount}
                id={id}
                ariaLabel={ariaLabels.ariaLabel || `${filterButtonLabel} button`}
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
                aria-label={ariaLabels.ariaLabel || `${filterButtonLabel} dropdown`}
              >
                <FilterDropdownMenuDesktop
                  buttonType={buttonType}
                  filters={filters}
                  filterIndex={filterId}
                  onSelectFilter={onSelectFilter}
                  onApplyFilter={onApplyFilter}
                  onClickClear={onClickClear}
                  resultsCount={resultsCount}
                  ariaLabels={ariaLabels?.ariaLabel}
                  filterButtonLabel={filterButtonLabel}
                  filterButtonLabelTranslated={filterButtonLabelTranslated}
                  dropdownMenuTranslation={dropdownMenuTranslation}
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
