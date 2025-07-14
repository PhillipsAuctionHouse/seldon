import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { FilterInput } from '../../components/Filter';
import FilterHeader from '../../components/Filter/FilterHeader';
import { Text, TextVariants } from '../../components/Text';
import { px } from '../../utils';
import { FilterDropdownProps } from './types';

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

export const FilterDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
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
