/**
 * Enum for the main filter button types.
 * Used to distinguish between different filter categories.
 */
export enum FilterButtonType {
  Filter = 'Filters', // Drawer filter
  Sort = 'Sort', // Sort filter
  Sale = 'Sale', // Sale filter
  Departments = 'Departments', // Departments filter
  Location = 'Location', // Location filter
  Month = 'Month', // Month filter
  Year = 'Year', // Year filter
  Empty = '', // Empty state for no filter label
}

/**
 * Enum for the icon types used in filter buttons.
 */
export enum FilterButtonIconType {
  Filter = 'Filter', // Filter icon
  Sort = 'Sort', // Sort icon
  ChevronUp = 'ChevronUp', // Chevron up icon
  ChevronDown = 'ChevronDown', // Chevron down icon
}

/**
 * Represents a single filter option (e.g., for a dropdown or button group).
 */
export type AuctionFilter = {
  /** Unique identifier for the filter option */
  id: string;
  /** Display label for the filter option */
  label: string;
};

/**
 * Represents a filter button with a count and optional labels.
 */
export type AuctionFilterButton = {
  /** Number of items matching this filter */
  auctionCount: number;
  /** Optional list of filter labels for this button */
  filterLabels?: AuctionFilter[];
};

/**
 * Represents a single dimension/option within a filter (e.g., a checkbox or radio option).
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
 * Represents a filter group (e.g., "Sale", "Department") with its options.
 */
export type FilterType = {
  /** Display label for the filter group */
  label: string;
  /** Unique identifier for the filter group */
  id: string;
  /** Type of filter (e.g., 'checkbox', 'radio') */
  type: 'checkbox' | 'radio';
  /** Set of filter dimensions/options for this filter group */
  filterDimensions: Set<FilterDimension>;
  /** FilterType for the filter */
  buttonType: FilterButtonType;
  /** Translated label for the filter button */
  filterButtonLabelTranslated?: string;
};

/**
 * Handler for when a filter input changes (checkbox, radio, or select).
 */
export type FilterChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  filterId: string,
) => void;

/**
 * Handler for when filters are updated (e.g., after selection).
 */
export type FilterUpdateHandler = (returnCountOnly?: boolean) => void;

/**
 * Handler for clearing a filter group by its id.
 */
export type ClearFilterHandler = (filterId: string) => void;

/**
 * Common props shared by all filter-related components.
 */
export interface BaseFilterProps {
  /** Optional CSS class for the component */
  className?: string;
  /** Array of filter groups to display */
  filters?: FilterType[];
  /** Handler for filter selection changes */
  onSelectFilter?: FilterChangeHandler;
  /** Handler for updating filters/results */
  onApplyFilter?: FilterUpdateHandler;
  /** Handler for clearing a filter group */
  onClickClear?: ClearFilterHandler;
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
  /** Aria-label for filter button */
  ariaLabel?: string;
}

/**
 * Props for an individual filter button.
 */
export interface FilterDropdownProps extends BaseFilterProps {
  /** Unique id for component testing */
  id: string;
  /** Unique id for this filter, used instead of index */
  filterId?: number;
  /** Label for the filter button */
  filterButtonLabel: string;
  /** Type of filter button (e.g., 'Filter', 'Sort') */
  buttonType?: FilterButtonType;
  /** Handler for filter button click */
  handleClick?: (state: boolean[]) => void;
  /** List of states for the filter buttons */
  filtersListState?: boolean[];
  /** Index of the filter button in the filtersListState */
  index?: number;
  /** Optional aria-labels for accessibility on various filter button elements. */
  ariaLabels?: FilterButtonAriaLabels;
  /** Translated label for the filter button */
  filterButtonLabelTranslated?: string;
  /** Object containing translated strings for dropdown menu actions.*/
  dropdownMenuTranslation?: DropdownMenuTranslation;
  /** Whether to hide the desktop sort button */
  hideDesktopSortButton?: boolean;
}

/**
 * Object containing translated strings for dropdown menu actions.
 * - confirm: Label for the confirm/apply button.
 * - clearAll: Label for the "Clear all" button.
 * - showAuctions: Label for the button showing the number of auctions/results.
 */
export type DropdownMenuTranslation = {
  confirm?: string | null;
  clearAll?: string | null;
  showAuctions?: string | null;
};

/**
 * Props for the filter dropdown menu component (desktop or mobile).
 */
export interface FilterDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional custom class name for the dropdown container */
  className?: string;
  /** The type of filter button (e.g. 'Sort', 'Departments', etc.) */
  buttonType?: string;
  /** Array of filter objects, each with a set of filter dimensions */
  filters?: { filterDimensions: Set<FilterDimension> }[];
  /** Index of the filter to display (typically corresponds to the selected filter) */
  filterIndex?: number;
  /** Handler for when a filter input is changed */
  onSelectFilter?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterType: string) => void;
  /** Handler for when the filter is confirmed or updated */
  onApplyFilter?: (returnCountOnly?: boolean) => void;
  /** Handler for clearing the filter (by type) */
  onClickClear?: (filterType: string) => void;
  /** Number of results to display in the dropdown action button */
  resultsCount?: number;
  /** Optional aria-labels for accessibility, for mobile and desktop variants */
  ariaLabels?: string;
  /** Label for the filter button */
  filterButtonLabel: string;
  /** Translated label for the filter button */
  filterButtonLabelTranslated?: string;
  /** Object containing translated strings for dropdown menu actions.*/
  dropdownMenuTranslation?: DropdownMenuTranslation;
}
