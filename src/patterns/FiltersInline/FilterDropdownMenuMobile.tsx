import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import FilterInput from '../../components/Filter/FilterInput';
import Text from '../../components/Text/Text';
import { TextVariants } from '../../components/Text/types';
import { px } from '../../utils';
import { FilterDimension, FilterDropdownMenuProps } from './types';
import { getFilterDimensions, handleInputChange as handleInputChangeUtil } from './utils';

export const FilterDropdownMenuMobile = React.forwardRef<HTMLDivElement, FilterDropdownMenuProps>(
  (
    {
      className,
      buttonType,
      filters,
      filterIndex,
      onApplyFilter,
      onClickClear,
      onSelectFilter,
      resultsCount,
      ariaLabels,
      dropdownMenuTranslation,
    },
    ref,
  ) => {
    const isSortButton = buttonType === 'Sort';
    const baseClassName = `${px}-filter-dropdown-menu`;

    return (
      <div
        className={classnames(`${baseClassName}`, className, `${baseClassName}--mobile`)}
        ref={ref}
        data-testid="filter-dropdown-mobile"
        aria-label={ariaLabels || `${buttonType} dropdown mobile`}
      >
        <div className={classnames(`${baseClassName}__filters`, `${baseClassName}__filters--mobile`)}>
          {getFilterDimensions(filters, filterIndex).map((value: FilterDimension) => (
            <FilterInput
              id={value.label}
              key={value.label}
              labelText={value.label}
              name={value.label}
              type={isSortButton ? 'radio' : 'checkbox'}
              checked={value.active}
              disabled={value?.disabled}
              onChange={(e) => handleInputChangeUtil(e, buttonType ?? '', onSelectFilter)}
            />
          ))}
        </div>
        <div
          className={classnames(
            isSortButton ? `${baseClassName}__button-wrap` : `${baseClassName}__buttons-wrap`,
            `${baseClassName}__mobile-wrap`,
          )}
        >
          {isSortButton ? (
            <Button
              className={classnames(`${baseClassName}__button`, `${baseClassName}__button--mobile`)}
              variant={ButtonVariants.primary}
              onClick={() => onApplyFilter?.(false)}
            >
              <Text variant={TextVariants.labelLg} className={`${baseClassName}__button-text`}>
                {dropdownMenuTranslation?.confirm || 'Confirm'}
              </Text>
            </Button>
          ) : (
            <>
              <Button
                className={classnames(
                  `${baseClassName}__buttons`,
                  `${baseClassName}__buttons--mobile`,
                  `${baseClassName}__buttons--left`,
                )}
                variant={ButtonVariants.secondary}
                onClick={() => onClickClear?.(buttonType ?? '')}
              >
                <Text variant={TextVariants.labelMd}>{dropdownMenuTranslation?.clearAll || 'Clear all'}</Text>
              </Button>
              <Button
                className={classnames(
                  `${baseClassName}__buttons`,
                  `${baseClassName}__buttons--mobile`,
                  `${baseClassName}__buttons--right`,
                )}
                variant={ButtonVariants.primary}
                onClick={() => onApplyFilter?.(false)}
              >
                <Text variant={TextVariants.labelMd} className={`${baseClassName}__button-text`}>
                  {dropdownMenuTranslation?.showAuctions || `Show ${resultsCount} Auctions`}
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
