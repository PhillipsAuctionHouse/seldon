import { AuctionFilterButton } from './InPlaceFilters';

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
  buttonType: 'Sort' | 'Sale' | 'Departments' | 'Month' | 'Location';
  /**
   * Auction filter data for the filters.
   */
  auctionFilterData?: AuctionFilterData;
  /**
   * isMobileDropdown style
   */
  isMobileDropdown?: boolean;
}
