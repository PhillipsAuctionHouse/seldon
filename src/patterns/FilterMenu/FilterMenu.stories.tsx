import { Meta } from '@storybook/react';
import FilterMenu from './FilterMenu';
import { useArgs } from '@storybook/preview-api';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import { Drawer } from '../../components/Drawer';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import { Filter } from '../../components/Filter';
import { exampleAuctionLots, lotType } from './utils';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/FilterControl',
  component: FilterMenu,
} satisfies Meta<typeof FilterMenu>;

export default meta;

type FilterDimension = {
  label: string;
  active: boolean;
  disabled?: boolean | undefined;
};

type FilterType = {
  label: string;
  id: string;
  filterDimensions: FilterDimension[];
  type: 'checkbox' | 'radio';
};

type PropTypes = {
  isOpen: boolean;
  filters: FilterType[];
  onClose: () => void;
};

const FILTER_KEYS = {
  sortBy: 'sortBy',
  makers: 'makers',
  collections: 'collections',
};

const filters: FilterType[] = [
  {
    label: 'Sort By',
    id: FILTER_KEYS.sortBy,
    type: 'radio',
    filterDimensions: [
      { label: 'Lot Number', active: true },
      { label: 'A-Z Artist Maker', active: false },
      { label: 'Price Low-High', active: false },
      { label: 'Price High - Low', active: false },
    ],
  },
  {
    label: 'Artists & Makers',
    id: FILTER_KEYS.makers,
    type: 'checkbox',
    filterDimensions: [],
  },
  {
    label: 'Collections',
    id: FILTER_KEYS.collections,
    type: 'checkbox',
    filterDimensions: [],
  },
];

const buildFilters = () => {
  const builtFilters = filters;
  const makerSet = new Set<string>();
  const collectionSet = new Set<string>();
  exampleAuctionLots.forEach((lot) => {
    makerSet.add(lot.maker);
    collectionSet.add(lot.collection);
  });

  // Artists (starting off with John Doe select, disabling last lot)
  builtFilters[1].filterDimensions = Array.from(makerSet).map((maker: string, i: number) => {
    return { label: maker, active: i === 0, disabled: i === 11 };
  });
  builtFilters[2].filterDimensions = Array.from(collectionSet).map((collection: string) => {
    return { label: collection, active: false };
  });

  return builtFilters;
};

const LotsWithFilter = (props: PropTypes) => {
  const initialFilters = buildFilters();
  const [results, setResults] = useState(exampleAuctionLots);
  const [filters, setFilters] = useState(initialFilters);
  const [filterRules, setFilterRules] = useState<Map<string, Set<string>>>(new Map());

  const updateFilters = (filterId: string, checked: boolean, name: string) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === filterId) {
        const updatedFilterDimensions = filter.filterDimensions.map((dimension) => {
          if (dimension.label === name) {
            return {
              ...dimension,
              active: checked,
            };
          } else if (filterId === FILTER_KEYS.sortBy) {
            return {
              ...dimension,
              active: false,
            };
          }
          return dimension;
        });

        return {
          ...filter,
          filterDimensions: updatedFilterDimensions,
        };
      }
      return filter;
    });

    setFilters(updatedFilters);
  };

  const updateFilterRules = (filterId: string, checked: boolean, name: string) => {
    const newFilterRules = new Map(filterRules);
    const rule = newFilterRules.get(filterId) ?? new Set();

    if (checked) {
      rule.add(name);
    } else {
      rule.delete(name);
    }

    newFilterRules.set(filterId, rule);
    setFilterRules(newFilterRules);
    return newFilterRules;
  };

  useEffect(() => {
    const initialActiveFilters = initialFilters
      .map((filter) => {
        const activeDimensions = filter.filterDimensions.filter((dimension) => dimension.active);
        const initialSet = new Set();
        activeDimensions.forEach((dimension) => {
          initialSet.add(dimension.label);
        });

        return activeDimensions.length ? { key: filter.id, dimSet: initialSet } : null;
      })
      .filter((result) => result !== null);

    const initialFilterRules = new Map();
    initialActiveFilters.forEach((filter) => {
      initialFilterRules.set(filter?.key, filter?.dimSet);
    });

    setFilterRules(initialFilterRules);
    filterResults(initialFilterRules);
  }, [initialFilters]);

  const filterResults = (newFilterRules: Map<string, Set<string>>) => {
    const filterResults: lotType[] = [];
    const selectedMakers = newFilterRules.get(FILTER_KEYS.makers) ?? new Set();
    const selectedCollections = newFilterRules.get(FILTER_KEYS.collections);

    exampleAuctionLots.forEach((lot) => {
      const matchesMaker = selectedMakers === undefined || selectedMakers?.size === 0 || selectedMakers?.has(lot.maker);
      const matchesCollection =
        selectedCollections === undefined ||
        selectedCollections?.size === 0 ||
        selectedCollections?.has(lot.collection);

      if (matchesMaker && matchesCollection) {
        filterResults.push(lot);
      }
    });

    setResults(filterResults);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterId: string) => {
    const { name, checked } = e.target as HTMLInputElement;

    const newFilterRules = updateFilterRules(filterId, checked, name);
    updateFilters(filterId, checked, name);
    filterResults(newFilterRules);
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {results.map((lot: lotType) => (
          <div key={lot.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: '', margin: 15 }}>
            <img src={lot.imageSrc} height={150} width={150} />
            <div>
              <strong>{lot.lotNumber}</strong>
            </div>
            <div>
              <strong>{lot.maker}</strong>
            </div>
            <div>{lot.title}</div>
            <div>{`$${lot.price}`}</div>
          </div>
        ))}
      </div>
      <Drawer isOpen={props.isOpen} onClose={props.onClose}>
        <FilterMenu>
          {filters.map((filter: FilterType) => (
            <Filter key={filter.label} name={filter.label}>
              <FilterHeader heading={filter.label} />
              {Array.from(filter.filterDimensions).map((value: FilterDimension) => (
                <FilterInput
                  id={value.label}
                  key={value.label}
                  labelText={value.label}
                  onChange={(e) => handleFilter(e, filter.id)}
                  type={filter.type}
                  disabled={value?.disabled}
                  name={value.label}
                  checked={value.active}
                />
              ))}
            </Filter>
          ))}
        </FilterMenu>
        <Button onClick={() => props.onClose()}>{`Show ${results.length} lots`}</Button>
      </Drawer>
    </>
  );
};

export const Playground = (props: PropTypes) => {
  const [, updateArgs] = useArgs();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    // Refocus on button after close for keyboard navigation
    buttonRef.current?.focus();
    updateArgs({ ...props, isOpen: false });
  };

  const onOpen = () => {
    updateArgs({ ...props, isOpen: true });
  };

  return (
    <>
      <Button className={`modal-story__button`} onClick={onOpen} ref={buttonRef}>
        Filter
      </Button>
      <LotsWithFilter {...props} onClose={onClose} />
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  isOpen: false,
  filters,
};

Playground.argTypes = {};
