import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import Text from '../../components/Text/Text';
import { TextVariants } from '../../components/Text/types';
import { px } from '../../utils';
import { FilterDimension, FilterDropdownMenuProps } from './types';
import { getFilterButtonLabel, getFilterDimensions, handleInputChange as handleInputChangeUtil } from './utils';

export const FilterDropdownMenuDesktop = React.forwardRef<HTMLDivElement, FilterDropdownMenuProps>(
  (
    {
      className,
      buttonType,
      filters,
      filterIndex,
      onSelectFilter,
      onClickClear,
      onApplyFilter,
      resultsCount,
      ariaLabels,
      filterButtonLabel,
      filterButtonLabelTranslated,
      dropdownMenuTranslation,
    },
    ref,
  ) => {
    const isSortButton = buttonType === 'Sort';
    const baseClassName = `${px}-filter-dropdown-menu`;

    return (
      <div
        className={classnames(baseClassName, className)}
        ref={ref}
        data-testid="filter-dropdown-desktop"
        aria-label={ariaLabels || `${buttonType} dropdown desktop`}
      >
        <FilterHeader
          heading={getFilterButtonLabel(filterButtonLabel, null, filterButtonLabelTranslated || null)}
          className={classnames(`${baseClassName}__header`)}
        />
        <div className={classnames(`${baseClassName}__filters`)}>
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
        <div className={classnames(isSortButton ? `${baseClassName}__button-wrap` : `${baseClassName}__buttons-wrap`)}>
          {isSortButton ? (
            <Button
              className={classnames(`${baseClassName}__button`)}
              variant={ButtonVariants.primary}
              onClick={() => onApplyFilter?.(false)}
            >
              <Text variant={TextVariants.string2} className={`${baseClassName}__button-text`}>
                {dropdownMenuTranslation?.confirm || 'Confirm'}
              </Text>
            </Button>
          ) : (
            <>
              <Button
                className={classnames(`${baseClassName}__buttons`)}
                variant={ButtonVariants.secondary}
                onClick={() => onClickClear?.(buttonType ?? '')}
              >
                <Text variant={TextVariants.string2}>{dropdownMenuTranslation?.clearAll || 'Clear all'}</Text>
              </Button>
              <Button
                className={classnames(`${baseClassName}__buttons`)}
                variant={ButtonVariants.primary}
                onClick={() => onApplyFilter?.(false)}
              >
                <Text variant={TextVariants.string2} className={`${baseClassName}__button-text`}>
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

FilterDropdownMenuDesktop.displayName = 'FilterDropdownMenuDesktop';
