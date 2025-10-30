import { Meta } from '@storybook/react';
import { useState } from 'react';
import { SaleCard } from '../SaleCard';
import FiltersInline from './FiltersInline';
import { FilterButtonType, FilterDropdownMenuProps, FilterType } from './types';
import { FiltersInlineFilters, SalesMockData } from './utils';

/**
 * Storybook: https://storybook.js.org/docs/react/writing-stories/introduction
 */
const meta = {
  title: 'Patterns/FiltersInline',
  component: FiltersInline,
} satisfies Meta<typeof FiltersInline>;

export default meta;

const FILTER_KEYS = {
  sort: 'Sort',
  sale: 'Sale',
  departments: 'Departments',
  location: 'Location',
  month: 'Month',
};

const filters: FilterType[] = [
  {
    label: 'Sort By Date',
    id: FILTER_KEYS.sort,
    type: 'radio',
    filterDimensions: new Set(FiltersInlineFilters.Sort),
    buttonType: FilterButtonType.Sort,
  },
  {
    label: 'Auction type',
    id: FILTER_KEYS.sale,
    type: 'checkbox',
    filterDimensions: new Set(FiltersInlineFilters.Sale),
    buttonType: FilterButtonType.Sale,
  },
  {
    label: 'Departments',
    id: FILTER_KEYS.departments,
    type: 'checkbox',
    filterDimensions: new Set(FiltersInlineFilters.Departments),
    buttonType: FilterButtonType.Departments,
  },
  {
    label: 'Location',
    id: FILTER_KEYS.location,
    type: 'checkbox',
    filterDimensions: new Set(FiltersInlineFilters.Location),
    buttonType: FilterButtonType.Location,
  },
  {
    label: 'Month',
    id: FILTER_KEYS.month,
    type: 'checkbox',
    filterDimensions: new Set(FiltersInlineFilters.Month),
    buttonType: FilterButtonType.Month,
  },
];

const buildFilters = () => filters;

export const Playground = (props: FilterDropdownMenuProps) => {
  const [filtersLabelListState, setFiltersLabelListState] = useState(Array(6).fill(false));
  const initialFilters = buildFilters();
  const [results, setResults] = useState(SalesMockData);
  const [filters, setFilters] = useState(initialFilters);
  const [filterRules, setFilterRules] = useState<Map<string, Set<string>>>(new Map());
  const [resultsCount, setResultsCount] = useState(SalesMockData.length);

  // Update filter dimensions' state
  const updateFilters = (filterId: string, checked: boolean, name: string) => {
    setFilters((filters) =>
      filters.map((filter) => {
        if (filter.id === filterId) {
          const updatedFilterDimensions = new Set(
            Array.from(filter.filterDimensions).map((dimension) => {
              if (dimension.label === name) {
                return { ...dimension, active: checked };
              } else if (filterId === FILTER_KEYS.sort) {
                return { ...dimension, active: false };
              }
              return dimension;
            }),
          );
          return { ...filter, filterDimensions: updatedFilterDimensions };
        }
        return filter;
      }),
    );
  };

  // Update filter rules
  const updateFilterRules = (filterId: string, checked: boolean, name: string) => {
    const newFilterRules = new Map(filterRules);
    let rule: Set<string> | undefined;

    if (filterId === FILTER_KEYS.sort) {
      rule = new Set<string>();
    } else {
      rule = newFilterRules.get(filterId) || new Set<string>();
    }

    checked ? rule.add(name) : rule.delete(name);
    newFilterRules.set(filterId, rule);
    setFilterRules(newFilterRules);
    return newFilterRules;
  };

  // Handle filter selection (checkbox/radio)
  const handleFilterSelection = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterId: string) => {
    const { name, checked } = e.target as HTMLInputElement;
    const newFilterRules = updateFilterRules(filterId, checked, name);
    updateFilters(filterId, checked, name);
    setResultsCount(handleFilterUpdate(true, newFilterRules) ?? 0);
  };

  // Apply filters and sorting or return count
  const handleFilterUpdate = (returnCountOnly?: boolean, rules = filterRules) => {
    let filterResults = SalesMockData;

    // Sort
    const sortRule = rules.get(FILTER_KEYS.sort);
    const sortValue = sortRule ? Array.from(sortRule)[0] : undefined;
    filterResults = [...SalesMockData].sort((a, b) => {
      const dateA = new Date(a.date.split(', ').slice(1).join(', '));
      const dateB = new Date(b.date.split(', ').slice(1).join(', '));
      if (sortValue === 'End Date: Descending') {
        return dateB.getTime() - dateA.getTime();
      }
      return dateA.getTime() - dateB.getTime();
    });

    // Sale filter
    const saleValue = Array.from(rules.get(FILTER_KEYS.sale) ?? []);
    if (saleValue.length > 0) {
      filterResults = filterResults.filter((sale) => saleValue.includes(sale.auctionType));
    }

    // Departments filter
    const departmentsValue = Array.from(rules.get(FILTER_KEYS.departments) ?? []);
    if (departmentsValue.length > 0) {
      filterResults = filterResults.filter((sale) => departmentsValue.includes(sale.department));
    }

    // Month filter
    const monthValue = Array.from(rules.get(FILTER_KEYS.month) ?? []);
    if (monthValue.length > 0) {
      filterResults = filterResults.filter((sale) => {
        const saleMonth = new Date(sale.date.split(', ').slice(1).join(', ')).toLocaleString('default', {
          month: 'long',
        });
        return monthValue.includes(saleMonth);
      });
    }

    // Location filter
    const locationValue = Array.from(rules.get(FILTER_KEYS.location) ?? []);
    if (locationValue.length > 0) {
      filterResults = filterResults.filter((sale) => locationValue.includes(sale.location));
    }

    if (returnCountOnly) {
      return filterResults.length;
    } else {
      setResults(filterResults);
      setFiltersLabelListState(Array(6).fill(false));
    }
  };

  // Clear all filters or a specific filter
  const clearFilterUpdate = (filterId: string) => {
    if (filterId === 'all') {
      const newFilterRules = new Map();
      newFilterRules.set(FILTER_KEYS.sort, new Set([FiltersInlineFilters.Sort[0].label]));
      setFilterRules(newFilterRules);
      setFilters(initialFilters);
      setResultsCount(handleFilterUpdate(true, newFilterRules) ?? 0);
    } else {
      const newFilterRules = new Map(filterRules);
      newFilterRules.delete(filterId);
      setFilterRules(newFilterRules);
      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === filterId
            ? {
                ...filter,
                filterDimensions: new Set(
                  Array.from(filter.filterDimensions).map((dimension) => ({
                    ...dimension,
                    active: false,
                  })),
                ),
              }
            : filter,
        ),
      );
      setResultsCount(handleFilterUpdate(true, newFilterRules) ?? 0);
    }
  };

  return (
    <>
      <FiltersInline
        {...props}
        id="filters-inline-story"
        filtersListState={filtersLabelListState}
        setFiltersLabelListState={setFiltersLabelListState}
        onSelectFilter={handleFilterSelection}
        filters={filters}
        onApplyFilter={handleFilterUpdate}
        onClickClear={clearFilterUpdate}
        resultsCount={resultsCount}
        mainFilterLabel={FilterButtonType.Filter}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-sm)',
          marginTop: 'var(--spacing-md)',
        }}
      >
        {results.map((sale, index: number) => (
          <div key={`sale-card-container-${index}`} style={{ background: '#fafafa' }}>
            <SaleCard
              id={`sale-card-${index}`}
              imageSrc="https://via.placeholder.com/400"
              auctionType={sale.auctionType}
              titleText={sale.titleText}
              date={sale.date}
              location={sale.location}
            />
          </div>
        ))}
      </div>
    </>
  );
};

// See: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  id: 'in-place-filters-story',
  filters: filters,
};

Playground.argTypes = {};
