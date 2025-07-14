export type AuctionFilter = {
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

export type AuctionFilterData = {
  Filters: AuctionFilterButton;
  Sale: AuctionFilterButton;
  Departments: AuctionFilterButton;
  Month: AuctionFilterButton;
  Location: AuctionFilterButton;
};

export interface FilterDropdownProps {
  /**
   * Base class for Filter Dropdown button component.
   */
  className?: string;
  /**
   * Button type.
   */
  buttonType: 'Filter' | 'Sort' | 'Sale' | 'Departments' | 'Month' | 'Location';
  /**
   * Auction filter data for the filters.
   */
  auctionFilterData?: AuctionFilterData;
  /**
   * isMobileDropdown style
   */
  isMobileDropdown?: boolean;
}
