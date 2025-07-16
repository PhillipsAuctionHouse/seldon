import { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { SaleCard } from '../../components/SaleCard';
import InPlaceFilters from './InPlaceFilters';
import { FilterDropdownProps, FilterType } from './types';
import { InPlaceFiltersFilters, SalesMockData } from './utils';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/InPlaceFilters',
  component: InPlaceFilters,
} satisfies Meta<typeof InPlaceFilters>;

export default meta;

const FILTER_KEYS = {
  sort: 'Sort',
  sale: 'Sale',
  departments: 'Departments',
  month: 'Month',
  location: 'Location',
};

const filters: FilterType[] = [
  {
    label: 'Sort',
    id: FILTER_KEYS.sort,
    type: 'radio',
    filterDimensions: new Set(InPlaceFiltersFilters.Sort),
  },
  {
    label: 'Sale',
    id: FILTER_KEYS.sale,
    type: 'checkbox',
    filterDimensions: new Set(InPlaceFiltersFilters.Sale),
  },
  {
    label: 'Departments',
    id: FILTER_KEYS.departments,
    type: 'checkbox',
    filterDimensions: new Set(InPlaceFiltersFilters.Departments),
  },
  {
    label: 'Month',
    id: FILTER_KEYS.month,
    type: 'checkbox',
    filterDimensions: new Set(InPlaceFiltersFilters.Month),
  },
  {
    label: 'Location',
    id: FILTER_KEYS.location,
    type: 'checkbox',
    filterDimensions: new Set(InPlaceFiltersFilters.Location),
  },
];

const buildFilters = () => {
  const builtFilters = filters;
  return builtFilters;
};

export const Playground = (props: FilterDropdownProps) => {
  const [filtersLabelListState, setFiltersLabelListState] = useState(Array(6).fill(false));
  const initialFilters = buildFilters();
  const [results, setResults] = useState(SalesMockData);
  const [filters, setFilters] = useState(initialFilters);
  const [filterRules, setFilterRules] = useState<Map<string, Set<string>>>(new Map());
  const [resultsCount, setResultsCount] = useState(SalesMockData.length);

  const updateFilters = (filterId: string, checked: boolean, name: string) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === filterId) {
        const updatedFilterDimensions = new Set(
          Array.from(filter.filterDimensions).map((dimension) => {
            if (dimension.label === name) {
              return {
                ...dimension,
                active: checked,
              };
            } else if (filterId === FILTER_KEYS.sort) {
              return {
                ...dimension,
                active: false,
              };
            }
            return dimension;
          }),
        );

        return {
          ...filter,
          filterDimensions: updatedFilterDimensions,
        };
      }
      return filter;
    });
    console.log('updatedFilters', updatedFilters);
    setFilters(updatedFilters);
  };

  const updateFilterRules = (filterId: string, checked: boolean, name: string) => {
    const newFilterRules = new Map(filterRules);
    let rule: Set<string> | undefined;

    if (filterId === FILTER_KEYS.sort) {
      rule = new Set<string>();
    } else {
      rule = newFilterRules.get(filterId);
      if (!rule) {
        rule = new Set<string>();
      }
    }

    if (checked) {
      rule.add(name);
    } else {
      rule.delete(name);
    }

    newFilterRules.set(filterId, rule);
    setFilterRules(newFilterRules);

    return newFilterRules;
  };

  const handleFilterSelection = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterId: string) => {
    const { name, checked } = e.target as HTMLInputElement;
    console.log('handleFilter called', { filterId, name, checked });

    const newFilterRules = updateFilterRules(filterId, checked, name);
    console.log('filterRules after update', newFilterRules);

    updateFilters(filterId, checked, name);

    const count = handleFilterUpdate(true, newFilterRules) ?? 0;
    console.log('handleFilterSelection count', count);
    setResultsCount(count);
  };

  const handleFilterUpdate = (returnCountOnly?: boolean, rules = filterRules) => {
    let filterResults = SalesMockData;

    // sort filters
    const sortRule = rules.get('Sort');
    const sortValue = sortRule ? Array.from(sortRule)[0] : undefined;
    filterResults = [...SalesMockData].sort((a, b) => {
      const dateA = new Date(a.date.split(', ').slice(1).join(', '));
      const dateB = new Date(b.date.split(', ').slice(1).join(', '));
      if (sortValue === 'End Date: Descending') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });

    // sale filters
    const saleRule = rules.get(FILTER_KEYS.sale);
    const saleValue = saleRule ? Array.from(saleRule) : [];
    if (saleValue.length > 0) {
      filterResults = [...filterResults].filter((sale) => saleValue.includes(sale.auctionType));
    }

    // departments filters
    const departmentsRule = rules.get(FILTER_KEYS.departments);
    const departmentsValue = departmentsRule ? Array.from(departmentsRule) : [];
    if (departmentsValue.length > 0) {
      filterResults = [...filterResults].filter((sale) => departmentsValue.includes(sale.department));
    }

    // month filters
    const monthRule = rules.get(FILTER_KEYS.month);
    const monthValue = monthRule ? Array.from(monthRule) : [];
    if (monthValue.length > 0) {
      filterResults = [...filterResults].filter((sale) => {
        const saleMonth = new Date(sale.date.split(', ').slice(1).join(', ')).toLocaleString('default', {
          month: 'long',
        });
        return monthValue.includes(saleMonth);
      });
    }

    // location filters
    const locationRule = rules.get(FILTER_KEYS.location);
    const locationValue = locationRule ? Array.from(locationRule) : [];
    if (locationValue.length > 0) {
      filterResults = [...filterResults].filter((sale) => locationValue.includes(sale.location));
    }

    if (returnCountOnly) {
      return filterResults.length;
    } else {
      setResults(filterResults);
      setFiltersLabelListState(Array(6).fill(false));
    }
  };

  const clearFilterUpdate = (filterId: string) => {
    console.log('clearAllFilterUpdate called', filterId);

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

    setResultsCount(handleFilterUpdate(true) ?? 0);
  };

  useEffect(() => {
    console.log('resultsCount', resultsCount);
  }, [resultsCount]);

  return (
    <>
      <InPlaceFilters
        {...props}
        id="in-place-filters-story"
        filtersListState={filtersLabelListState}
        setFiltersLabelListState={setFiltersLabelListState}
        handleFilterSelection={handleFilterSelection}
        filters={filters}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={resultsCount}
      />
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}
      >
        {results.map((sale, index: number) => (
          <div key={`sale-card-container-${index}`} style={{ background: '#fafafa' }}>
            <SaleCard
              id={`sale-card-${index}`}
              imageSrc="https://picsum.photos/160/90"
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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  id: 'in-place-filters-story',
  filters: filters,
};

Playground.argTypes = {};
