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
  const [filtersLabelListState, setFiltersLabelListState] = useState([false, false, false, false, false, false]);
  const initialFilters = buildFilters();
  const [results, setResults] = useState(SalesMockData);
  const [filters, setFilters] = useState(initialFilters);
  const [filterRules, setFilterRules] = useState<Map<string, Set<string>>>(new Map());

  useEffect(() => {}, [filters]);

  const updateFilters = (filterId: string, checked: boolean, name: string) => {
    console.log('updateFilters called', { filterId, checked, name });
    const updatedFilters = filters.map((filter) => {
      if (filter.id === filterId) {
        const updatedFilterDimensions = new Set(
          Array.from(filter.filterDimensions).map((dimension) => {
            console.log('dimension', dimension);
            if (dimension.label === name) {
              return {
                ...dimension,
                active: checked,
              };
            } else {
              return {
                ...dimension,
                active: false,
              };
            }
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
    // const rule = newFilterRules.get(filterId) ?? new Set<string>();
    // remove rule if it's binary so only one can be selected at a time

    const rule: Set<string> = new Set<string>();

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
  };

  const handleFilterUpdate = (filterId: string) => {
    console.log('handleFilterUpdate called', filterId);
    let filterResults = results;

    if (filterId === FILTER_KEYS.sort) {
      const sortRule = filterRules.get('Sort');
      const value = sortRule ? Array.from(sortRule)[0] : undefined;
      console.log('sortRule', sortRule, 'value', value);

      filterResults = [...results].sort((a, b) => {
        const dateA = new Date(a.date.split(', ').slice(1).join(', '));
        const dateB = new Date(b.date.split(', ').slice(1).join(', '));

        if (value === 'End Date: Descending') {
          return dateB.getTime() - dateA.getTime(); // Descending: most recent first
        } else {
          return dateA.getTime() - dateB.getTime(); // Ascending: oldest first
        }
      });
    }

    console.log('setResults called with', filterResults);
    setResults(filterResults);
  };

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
