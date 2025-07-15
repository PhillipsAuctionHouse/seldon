export type AuctionFilter = {
  id: string;
  label: string;
  value: string;
};

export type AuctionFilterButtonTypes = 'Filter' | 'Sort' | 'Sale' | 'Departments' | 'Month' | 'Location';

export type DropDownList = {
  id: string;
  label: string;
  value: string;
};

export type AuctionFilterButton = {
  auctionCount: number;
  filterLabels?: AuctionFilter[];
};
export type FilterDimension = {
  label: string;
  disabled?: boolean;
  active?: boolean;
};
export type FilterType = {
  label: string;
  id: string;
  type: string;
  filterDimensions: Set<FilterDimension>;
};

export interface FilterDropdownProps {
  /**
   * Base class for Filter Dropdown button component.
   */
  className?: string;
  /**
   * Button type.
   */
  buttonType: AuctionFilterButtonTypes;
  /**
   * isMobileDropdown style
   */
  isMobileDropdown?: boolean;
  /**
   * filters data
   */
  filters?: FilterType[];
  /**
   * Index of the filter in the filters list.
   */
  filterIndex?: number;
  /**
   * Handle filter changes.
   */
  handleFilterSelection?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterId: string) => void;
  /**
   * Handle filter update.
   */
  handleFilterUpdate?: (filterId: string) => void;
}
