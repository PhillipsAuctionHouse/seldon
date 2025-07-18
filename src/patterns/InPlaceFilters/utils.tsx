import { AuctionFilterButtonTypes, FilterDimension, FilterType } from './types';

export const FilterButtons: AuctionFilterButtonTypes[] = ['Filter', 'Sort', 'Sale', 'Departments', 'Month', 'Location'];

export const InPlaceFiltersFilters = {
  Sort: [
    {
      id: 'sort-by-date-ascending',
      label: 'End Date: Ascending',
      active: true,
    },
    {
      id: 'sort-by-date-descending',
      label: 'End Date: Descending',
      active: false,
    },
  ],
  Sale: [
    {
      id: 'sale-type-online',
      label: 'Online Auction',
      active: false,
    },
    {
      id: 'sale-type-live',
      label: 'Live Auction',
      active: false,
    },
  ],
  Departments: [
    { id: 'contemporary-art', label: 'Contemporary Art', value: 'Contemporary Art', active: false },
    { id: 'design', label: 'Design', value: 'Design', active: false },
    { id: 'jewellery', label: 'Jewellery', value: 'Jewellery', active: false },
    { id: 'watches', label: 'Watches', value: 'Watches', active: false },
    { id: 'photographs', label: 'Photographs', value: 'Photographs', active: false },
  ],
  Month: [
    { id: 'january', label: 'January', value: 'January', active: false },
    { id: 'february', label: 'February', value: 'February', active: false },
    { id: 'march', label: 'March', value: 'March', active: false },
    { id: 'april', label: 'April', value: 'April', active: false },
    { id: 'may', label: 'May', value: 'May', active: false },
    { id: 'june', label: 'June', value: 'June', active: false, disabled: true },
  ],
  Location: [
    { id: 'geneva', label: 'Geneva', value: 'Geneva', active: false },
    { id: 'hong-kong', label: 'Hong Kong', value: 'Hong Kong', active: false },
    { id: 'london', label: 'London', value: 'London', active: false },
    { id: 'new-york', label: 'New York', value: 'New York', active: false },
  ],
};

export const SalesMockData = [
  {
    auctionType: 'Live Auction',
    titleText: 'New York Contemporary Art Sale',
    date: '1 PM EST, January 1, 2025',
    location: 'New York',
    department: 'Contemporary Art',
  },
  {
    auctionType: 'Live Auction',
    titleText: 'London Design Sale',
    date: '2 PM EST, February 2, 2025',
    location: 'London',
    department: 'Design',
  },
  {
    auctionType: 'Online Auction',
    titleText: 'Hong Kong Jewellery Sale',
    date: '3 PM EST, March 3, 2025',
    location: 'Hong Kong',
    department: 'Jewellery',
  },
  {
    auctionType: 'Online Auction',
    titleText: 'Geneva Watches Sale',
    date: '4 PM EST, April 4, 2025',
    location: 'Geneva',
    department: 'Watches',
  },
  {
    auctionType: 'Live Auction',
    titleText: 'New York Photographs Sale',
    date: '5 PM EST, May 5, 2025',
    location: 'New York',
    department: 'Photographs',
  },
];

export const countActiveFilters = (
  filters?: FilterType[],
  buttonType?: string,
): { totalCount: number; filterCount: number } => {
  if (!filters) return { totalCount: 0, filterCount: 0 };

  const totalCount = filters
    .filter((filter) => filter.id !== 'Sort')
    .reduce(
      (total, filter) => total + Array.from(filter.filterDimensions).filter((dimension) => dimension.active).length,
      0,
    );

  const filterCount =
    buttonType === 'Sort'
      ? 0
      : (() => {
          const filterDimensions = filters.find((filter) => filter.id === buttonType)?.filterDimensions;
          return filterDimensions ? Array.from(filterDimensions).filter((dimension) => dimension.active).length : 0;
        })();

  return { totalCount, filterCount };
};

// Helper function to get filter dimensions safely
export const getFilterDimensions = (
  filters: { filterDimensions: Set<FilterDimension> }[] | undefined,
  filterIndex: number | undefined,
): FilterDimension[] => {
  if (
    filters &&
    typeof filterIndex === 'number' &&
    filters[filterIndex - 1] &&
    filters[filterIndex - 1].filterDimensions
  ) {
    return Array.from(filters[filterIndex - 1].filterDimensions);
  }
  return [];
};
