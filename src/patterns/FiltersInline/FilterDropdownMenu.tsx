import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import Text from '../../components/Text/Text';
import { TextVariants } from '../../components/Text/types';
import { px } from '../../utils';
import './_filterDropdown.scss';
import { FilterDimension } from './types';
import { getFilterDimensions } from './utils';

export interface FilterDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional custom class name for the dropdown container */
  className?: string;
  /** The type of filter button (e.g. 'Sort', 'Departments', etc.) */
  buttonType: string;
  /** Array of filter objects, each with a set of filter dimensions */
  filters?: { filterDimensions: Set<FilterDimension> }[];
  /** Index of the filter to display (typically corresponds to the selected filter) */
  filterIndex?: number;
  /** Handler for when a filter input is changed */
  handleFilterSelection?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterType: string) => void;
  /** Handler for when the filter is confirmed or updated */
  handleFilterUpdate?: (returnCountOnly?: boolean) => void;
  /** Handler for clearing the filter (by type) */
  clearFilterUpdate?: (filterType: string) => void;
  /** Number of results to display in the dropdown action button */
  resultsCount?: number;
  /** Optional aria-labels for accessibility, for mobile and desktop variants */
  ariaLabels?: {
    dropdownMobile?: string;
    dropdownDesktop?: string;
  };
}

// Desktop version
const FilterDropdownMenuDesktop = React.forwardRef<HTMLDivElement, FilterDropdownMenuProps>(
  (
    {
      className,
      buttonType,
      filters,
      filterIndex,
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount,
      ariaLabels,
    },
    ref,
  ) => {
    const isSortButton = buttonType === 'Sort';
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleFilterSelection?.(e, buttonType);
    };

    return (
      <div
        className={classnames(`${px}-filter-dropdown`, className)}
        ref={ref}
        data-testid="filter-dropdown-desktop"
        aria-label={ariaLabels?.dropdownDesktop || `${buttonType} dropdown desktop`}
      >
        <FilterHeader
          heading={isSortButton ? 'Sort By' : buttonType}
          className={classnames(`${px}-filter-dropdown__header`)}
        />
        <div className={classnames(`${px}-filter-dropdown__filters`)}>
          {getFilterDimensions(filters, filterIndex).map((value: FilterDimension) => (
            <FilterInput
              id={value.label}
              key={value.label}
              labelText={value.label}
              name={value.label}
              type={isSortButton ? 'radio' : 'checkbox'}
              checked={value.active}
              disabled={value?.disabled}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div
          className={classnames(
            isSortButton ? `${px}-filter-dropdown__button-wrap` : `${px}-filter-dropdown__buttons-wrap`,
          )}
        >
          {isSortButton ? (
            <Button
              className={classnames(`${px}-filter-dropdown__button`)}
              variant={ButtonVariants.primary}
              onClick={() => handleFilterUpdate?.(false)}
            >
              <Text variant={TextVariants.string3} className={`${px}-filter-dropdown__button-text`}>
                Confirm
              </Text>
            </Button>
          ) : (
            <>
              <Button
                className={classnames(`${px}-filter-dropdown__buttons`)}
                variant={ButtonVariants.secondary}
                onClick={() => clearFilterUpdate?.(buttonType)}
              >
                <Text variant={TextVariants.string3}>Clear all</Text>
              </Button>
              <Button
                className={classnames(`${px}-filter-dropdown__buttons`)}
                variant={ButtonVariants.primary}
                onClick={() => handleFilterUpdate?.(false)}
              >
                <Text variant={TextVariants.string3} className={`${px}-filter-dropdown__button-text`}>
                  Show {resultsCount} Auctions
                </Text>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  },
);

FilterDropdownMenuDesktop.displayName = 'FilterDropdownMenuDesktop';

// Mobile version
const FilterDropdownMenuMobile = React.forwardRef<HTMLDivElement, FilterDropdownMenuProps>(
  (
    {
      className,
      buttonType,
      filters,
      filterIndex,
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount,
      ariaLabels,
    },
    ref,
  ) => {
    const isSortButton = buttonType === 'Sort';
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleFilterSelection?.(e, buttonType);
    };

    return (
      <div
        className={classnames(`${px}-filter-dropdown`, className, `${px}-filter-dropdown--mobile`)}
        ref={ref}
        data-testid="filter-dropdown-mobile"
        aria-label={ariaLabels?.dropdownMobile || `${buttonType} dropdown mobile`}
      >
        <FilterHeader
          heading={isSortButton ? 'Sort By' : buttonType}
          className={classnames(`${px}-filter-dropdown__header`, `${px}-filter-dropdown__header--mobile`)}
        />
        <div className={classnames(`${px}-filter-dropdown__filters`, `${px}-filter-dropdown__filters--mobile`)}>
          {getFilterDimensions(filters, filterIndex).map((value: FilterDimension) => (
            <FilterInput
              id={value.label}
              key={value.label}
              labelText={value.label}
              name={value.label}
              type={isSortButton ? 'radio' : 'checkbox'}
              checked={value.active}
              disabled={value?.disabled}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div
          className={classnames(
            isSortButton ? `${px}-filter-dropdown__button-wrap` : `${px}-filter-dropdown__buttons-wrap`,
            `${px}-filter-dropdown__mobile-wrap`,
          )}
        >
          {isSortButton ? (
            <Button
              className={classnames(`${px}-filter-dropdown__button`, `${px}-filter-dropdown__button--mobile`)}
              variant={ButtonVariants.primary}
              onClick={() => handleFilterUpdate?.(false)}
            >
              <Text variant={TextVariants.string1} className={`${px}-filter-dropdown__button-text`}>
                Confirm
              </Text>
            </Button>
          ) : (
            <>
              <Button
                className={classnames(
                  `${px}-filter-dropdown__buttons`,
                  `${px}-filter-dropdown__buttons--mobile`,
                  `${px}-filter-dropdown__buttons--left`,
                )}
                variant={ButtonVariants.secondary}
                onClick={() => clearFilterUpdate?.(buttonType)}
              >
                <Text variant={TextVariants.string2}>Clear all</Text>
              </Button>
              <Button
                className={classnames(
                  `${px}-filter-dropdown__buttons`,
                  `${px}-filter-dropdown__buttons--mobile`,
                  `${px}-filter-dropdown__buttons--right`,
                )}
                variant={ButtonVariants.primary}
                onClick={() => handleFilterUpdate?.(false)}
              >
                <Text variant={TextVariants.string2} className={`${px}-filter-dropdown__button-text`}>
                  Show {resultsCount} Auctions
                </Text>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  },
);

FilterDropdownMenuMobile.displayName = 'FilterDropdownMenuMobile';

const FilterDropdownMenuContent = React.forwardRef<HTMLDivElement, FilterDropdownMenuProps>(
  (
    {
      className,
      buttonType,
      filters,
      filterIndex,
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount,
    },
    ref,
  ) => {
    const isSortButton = buttonType === 'Sort';
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleFilterSelection?.(e, buttonType);
    };

    return (
      <div className={classnames(`${px}-filter-dropdown`, className)} ref={ref}>
        <FilterHeader
          heading={isSortButton ? 'Sort By' : buttonType}
          className={classnames(`${px}-filter-dropdown__header`)}
        />
        <div className={classnames(`${px}-filter-dropdown__filters`)}>
          {getFilterDimensions(filters, filterIndex).map((value: FilterDimension) => (
            <FilterInput
              id={value.label}
              key={value.label}
              labelText={value.label}
              name={value.label}
              type={isSortButton ? 'radio' : 'checkbox'}
              checked={value.active}
              disabled={value?.disabled}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div
          className={classnames(
            isSortButton ? `${px}-filter-dropdown__button-wrap` : `${px}-filter-dropdown__buttons-wrap`,
          )}
        >
          {isSortButton ? (
            <Button
              className={classnames(`${px}-filter-dropdown__button`)}
              variant={ButtonVariants.primary}
              onClick={() => handleFilterUpdate?.(false)}
            >
              <Text variant={TextVariants.string3} className={`${px}-filter-dropdown__button-text`}>
                Confirm
              </Text>
            </Button>
          ) : (
            <>
              <Button
                className={classnames(`${px}-filter-dropdown__buttons`)}
                variant={ButtonVariants.secondary}
                onClick={() => clearFilterUpdate?.(buttonType)}
              >
                <Text variant={TextVariants.string3}>Clear all</Text>
              </Button>
              <Button
                className={classnames(`${px}-filter-dropdown__buttons`)}
                variant={ButtonVariants.primary}
                onClick={() => handleFilterUpdate?.(false)}
              >
                <Text variant={TextVariants.string3} className={`${px}-filter-dropdown__button-text`}>
                  Show {resultsCount} Auctions
                </Text>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  },
);

FilterDropdownMenuContent.displayName = 'FilterDropdownMenuContent';

// Main export: automatically chooses desktop or mobile version, but uses the same markup/styles
export const FilterDropdownMenu = React.forwardRef<HTMLDivElement, FilterDropdownMenuProps>((props, ref) => (
  <FilterDropdownMenuContent {...props} ref={ref} />
));

FilterDropdownMenu.displayName = 'FilterDropdownMenu';
