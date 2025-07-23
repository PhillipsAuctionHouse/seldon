export enum FilterButtonType {
  Filter = 'Filter',
  Sort = 'Sort',
  Sale = 'Sale',
  Departments = 'Departments',
  Month = 'Month',
  Location = 'Location',
}

export enum FilterButtonIconType {
  Filter = 'Filter',
  Sort = 'Sort',
  ChevronUp = 'ChevronUp',
  ChevronDown = 'ChevronDown',
}

/**
 * Represents a single filter option (e.g., for a dropdown or button group)
 */
export type AuctionFilter = {
  /** Unique identifier for the filter option */
  id: string;
  /** Display label for the filter option */
  label: string;
};

/**
 * Represents a filter button with a count and optional labels
 */
export type AuctionFilterButton = {
  /** Number of items matching this filter */
  auctionCount: number;
  /** Optional list of filter labels for this button */
  filterLabels?: AuctionFilter[];
};

/**
 * Represents a single dimension/option within a filter (e.g., a checkbox or radio option)
 */
export type FilterDimension = {
  /** Display label for the filter dimension */
  label: string;
  /** Whether this dimension is disabled */
  disabled?: boolean;
  /** Whether this dimension is currently active/selected */
  active?: boolean;
};

/**
 * Represents a filter group (e.g., "Sale", "Department") with its options
 */
export type FilterType = {
  /** Display label for the filter group */
  label: string;
  /** Unique identifier for the filter group */
  id: string;
  /** Type of filter (e.g., 'checkbox', 'radio') */
  type: string;
  /** Set of filter dimensions/options for this filter group */
  filterDimensions: Set<FilterDimension>;
};

/** Handler for when a filter input changes (checkbox, radio, or select) */
type FilterChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterId: string) => void;

/** Handler for when filters are updated (e.g., after selection) */
type FilterUpdateHandler = (returnCountOnly?: boolean) => void;

/** Handler for clearing a filter group by its id */
type ClearFilterHandler = (filterId: string) => void;

/**
 * Common props shared by all filter-related components
 */
interface BaseFilterProps {
  /** Optional CSS class for the component */
  className?: string;
  /** Array of filter groups to display */
  filters?: FilterType[];
  /** Handler for filter selection changes */
  handleFilterSelection?: FilterChangeHandler;
  /** Handler for updating filters/results */
  handleFilterUpdate?: FilterUpdateHandler;
  /** Handler for clearing a filter group */
  clearFilterUpdate?: ClearFilterHandler;
  /** Number of results to display */
  resultsCount?: number;
}

/**
 * Optional aria-labels for accessibility on various filter button elements.
 */
export interface FilterButtonAriaLabels {
  /** Aria-label for the filter button itself */
  button?: string;
  /** Aria-label for the drawer (mobile or filter drawer) */
  drawer?: string;
  /** Aria-label for the popover (desktop dropdown) */
  popover?: string;
  /** Aria-label for the dropdown mobile container */
  dropdownMobile?: string;
  /** Aria-label for the dropdown desktop container */
  dropdownDesktop?: string;
}

/**
 * Props for the FiltersInline component (main component)
 */
export interface FiltersInlineProps extends BaseFilterProps {
  /** Unique id for component testing */
  id: string;
  /** Handler for filter button click */
  handleFilterClick?: () => void;
  /** List of states for the filter buttons */
  filtersListState?: boolean[];
  /** Setter for the filter button states */
  setFiltersLabelListState?: (state: boolean[]) => void;
  /** List of filter labels to display as buttons */
  filtersLabels?: FilterButtonType[];
  /** Optional aria-labels for accessibility on various filter button elements. */
  ariaLabels?: FilterButtonAriaLabels;
}

/**
 * Props for an individual filter button
 */
export interface FilterDropdownProps extends BaseFilterProps {
  /** Unique id for component testing */
  id: string;
  /** Unique id for this filter, used instead of index */
  filterId?: number;
  /** Label for the filter button */
  filterButtonLabel: string;
  /** Type of filter button (e.g., 'Filter', 'Sort') */
  buttonType: FilterButtonType;
  /** Handler for filter button click */
  handleClick?: (state: boolean[]) => void;
  /** List of states for the filter buttons */
  filtersListState?: boolean[];
  /** Index of the filter button in the filtersListState */
  index?: number;
  /** Optional aria-labels for accessibility on various filter button elements. */
  ariaLabels?: FilterButtonAriaLabels;
}
