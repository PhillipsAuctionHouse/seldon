import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import Text from '../../components/Text/Text';
import { TextVariants } from '../../components/Text/types';
import { px } from '../../utils';
import { FilterDimension, FilterDropdownProps } from './types';

export const FilterDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
  (
    {
      className,
      buttonType,
      isMobileDropdown = false,
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
    const filterDimensions =
      filterIndex !== undefined ? Array.from(filters?.[filterIndex - 1]?.filterDimensions ?? []) : [];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleFilterSelection?.(e, buttonType);
    };

    return (
      <div
        className={classnames(`${px}-filter-dropdown`, className, {
          [`${px}-filter-dropdown--mobile`]: isMobileDropdown,
        })}
        ref={ref}
      >
        <FilterHeader
          heading={isSortButton ? 'Sort By' : buttonType}
          className={classnames(`${px}-filter-dropdown__header`, {
            [`${px}-filter-dropdown__header--mobile`]: isMobileDropdown,
          })}
        />

        <div
          className={classnames(`${px}-filter-dropdown__filters`, {
            [`${px}-filter-dropdown__filters--mobile`]: isMobileDropdown,
          })}
        >
          {filterDimensions.map((value: FilterDimension) => (
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
            { [`${px}-filter-dropdown__mobile-wrap`]: isMobileDropdown },
          )}
        >
          {isSortButton ? (
            <Button
              className={classnames(`${px}-filter-dropdown__button`, {
                [`${px}-filter-dropdown__button--mobile`]: isMobileDropdown,
              })}
              variant={ButtonVariants.primary}
              onClick={() => handleFilterUpdate?.(false)}
            >
              <Text
                variant={isMobileDropdown ? TextVariants.string1 : TextVariants.string3}
                className={`${px}-filter-dropdown__button-text`}
              >
                Confirm
              </Text>
            </Button>
          ) : (
            <>
              <Button
                className={classnames(
                  `${px}-filter-dropdown__buttons`,
                  { [`${px}-filter-dropdown__buttons--mobile`]: isMobileDropdown },
                  { [`${px}-filter-dropdown__buttons--left`]: isMobileDropdown },
                )}
                variant={ButtonVariants.secondary}
                onClick={() => clearFilterUpdate?.(buttonType)}
              >
                <Text variant={isMobileDropdown ? TextVariants.string2 : TextVariants.string3}>Clear all</Text>
              </Button>
              <Button
                className={classnames(
                  `${px}-filter-dropdown__buttons`,
                  { [`${px}-filter-dropdown__buttons--mobile`]: isMobileDropdown },
                  { [`${px}-filter-dropdown__buttons--right`]: isMobileDropdown },
                )}
                variant={ButtonVariants.primary}
                onClick={() => handleFilterUpdate?.(false)}
              >
                <Text
                  variant={isMobileDropdown ? TextVariants.string2 : TextVariants.string3}
                  className={`${px}-filter-dropdown__button-text`}
                >
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

FilterDropdown.displayName = 'FilterDropdown';
