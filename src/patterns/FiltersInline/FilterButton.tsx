import classnames from 'classnames';
import React from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { Icon } from '../../components/Icon';
import { Text } from '../../components/Text';
import { px } from '../../utils';
import { FilterButtonIconType } from './types';
import { getIcon } from './utils';

/**
 * Props for the FilterButton component.
 */
export type FilterButton = {
  /** Optional CSS class for the filter button */
  className?: string;
  /** The text label displayed on the button */
  label: string;
  /** Click handler for the button */
  onClick: () => void;
  /** Whether the button is currently selected/active */
  isSelected: boolean;
  /** Icon type to display (defaults to ChevronDown) */
  type: FilterButtonIconType;
  /** Count badge to show next to the button */
  count: number;
  /** Optional unique identifier for the button (used for test IDs) */
  id?: string;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
  /** If true, applies mobile-specific styling */
  isMobile?: boolean;
  /** Total number of filters for this button */
  totalCount: number;
};

export const FilterButton = React.forwardRef<HTMLButtonElement, FilterButton>(
  (
    { className, label, onClick, isSelected, type = 'ChevronDown', count, id, ariaLabel, isMobile, totalCount },
    ref,
  ) => (
    <Button
      ref={ref}
      className={classnames(`${px}-filter-button`, className, {
        [`${px}-filter-button--selected`]: isSelected || count > 0 || (type === 'Filter' && totalCount > 0),
        [`${px}-filter-button--filter`]: type === 'Filter',
      })}
      aria-label={ariaLabel}
      variant={ButtonVariants.secondary}
      data-testid={`${id}-filter-button`}
      data-viewport={isMobile ? 'mobile' : 'desktop'}
      onClick={onClick}
    >
      <Text data-testid={`${id}-filter-label`}>{label}</Text>
      <Icon icon={getIcon(type as FilterButtonIconType, isSelected)} height={8} width={8} className={`${px}__icon`} />
      {totalCount > 0 && type === 'Filter' && (
        <div className={`${px}-filter-button--count`} data-testid={`${id}-filter-count`}>
          {totalCount}
        </div>
      )}
    </Button>
  ),
);

FilterButton.displayName = 'FilterButton';
