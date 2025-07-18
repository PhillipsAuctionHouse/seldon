import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { Icon } from '../../components/Icon';
import { Text, TextVariants } from '../../components/Text';
import { px } from '../../utils';

/**
 * Props for the FilterButtonDisplay component.
 */
export type FilterButtonDisplayProps = {
  /** Optional CSS class for the filter button */
  className?: string;
  /** Whether this button is currently selected */
  isButtonSelected: boolean;
  /** Number of active filters for this button */
  filterCount: number;
  /** Total number of filters for this button */
  totalCount: number;
  /** Type of filter button (e.g., 'Filter', 'Sort') */
  buttonType: string;
  /** Label for the filter button (e.g., 'Sort', 'Sale') */
  filterButtonLabel: string;
  /** Display label for the button (may include count) */
  buttonLabel: string;
  /** Unique identifier for the filter button */
  id: string;
  /** Handler for when the filter button is clicked */
  handleFilterButtonClick: () => void;
  /** Whether the dropdown is styled for mobile */
  isMobileDropdown: boolean;
  /** Aria-label for the button (for accessibility) */
  ariaLabel?: string;
};

export const FilterButtonDisplay = React.forwardRef<HTMLButtonElement, FilterButtonDisplayProps>(
  (
    {
      className,
      isButtonSelected,
      filterCount,
      totalCount,
      buttonType,
      buttonLabel,
      id,
      handleFilterButtonClick,
      isMobileDropdown,
      ariaLabel,
    },
    ref,
  ) => (
    <Button
      ref={ref}
      className={classnames(`${px}-filter-button`, className, {
        [`${px}-filter-button--selected`]:
          isButtonSelected || filterCount > 0 || (buttonType === 'Filter' && totalCount > 0),
      })}
      aria-label={ariaLabel}
      variant={ButtonVariants.secondary}
      data-testid={`${id}-${buttonType}`}
      onClick={handleFilterButtonClick}
    >
      <Text
        variant={TextVariants.string2}
        data-testid={`${id}-${buttonType}-label-${isMobileDropdown ? 'mobile' : 'desktop'}`}
      >
        {buttonLabel}
      </Text>
      <Icon
        icon={buttonType === 'Filter' ? 'Filters' : isButtonSelected ? 'ChevronUp' : 'ChevronDown'}
        height={8}
        width={8}
        className={`${px}__icon`}
      />
      {totalCount > 0 && buttonType === 'Filter' && <div className={`${px}-filter-button--count`}>{totalCount}</div>}
    </Button>
  ),
);

FilterButtonDisplay.displayName = 'FilterButtonDisplay';
