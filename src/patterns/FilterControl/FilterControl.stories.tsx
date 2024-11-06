import { Meta } from '@storybook/react';
import FilterControl from './FilterControl';
import { useArgs } from '@storybook/preview-api';
import { useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import { Drawer } from '../../components/Drawer';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterValue from '../../components/Filter/FilterValue';
import { Filter } from '../../components/Filter';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/FilterControl',
  component: FilterControl,
} satisfies Meta<typeof FilterControl>;

export default meta;

type FilterDimension = { label: string; disabled?: boolean | undefined };

type FilterType = {
  label: string;
  filterDimensions: FilterDimension[];
  inputType: 'checkbox' | 'radio';
};

type PropTypes = {
  isOpen: boolean;
  filters: FilterType[];
  onClose: () => void;
};

const filters: FilterType[] = [
  {
    label: 'SortBy',
    inputType: 'radio',
    filterDimensions: [
      { label: 'Lot Number' },
      { label: 'A-Z Artist Maker' },
      { label: 'Price Low-High' },
      { label: 'Price High - Low' },
    ],
  },
  {
    label: 'Artists & Makers',
    inputType: 'checkbox',
    filterDimensions: [
      { label: 'Jimmy' },
      { label: 'Bob' },
      { label: 'Alan' },
      { label: 'Nick' },
      { label: 'Joe' },
      { label: 'Fred' },
      { label: 'Rob' },
      { label: 'Roy' },
      { label: 'Bill' },
      { label: 'Ted' },
      { label: 'Hidden' },
      { label: 'disabled', disabled: true },
    ],
  },
];

const LotsWithFilter = (props: PropTypes) => {
  const [results, setResults] = useState(filters[1].filterDimensions);
  const doFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    // When implementing, can add sorting functions when sortBy section present

    // Not a true filter, but this is a bare bones example how onChange can be implemented
    const rule = e.target.value;
    const newResults = filters[1].filterDimensions.filter((val) => val.label === rule);
    setResults(newResults);
  };
  return (
    <>
      <ul>
        {results.map((value: FilterDimension) => (
          <li key={value.label}>{value.label}</li>
        ))}
      </ul>
      <Drawer isOpen={props.isOpen} onClose={props.onClose}>
        <FilterControl>
          {props.filters.map((filter: FilterType, index: number) => (
            <Filter key={filter.label} isLast={filters.length == index + 1}>
              <FilterHeader label={filter.label} />
              {filter.filterDimensions.map((value: FilterDimension) => (
                <FilterValue
                  key={value.label}
                  label={value.label}
                  onChange={doFilter}
                  inputType={filter.inputType}
                  disabled={value?.disabled}
                />
              ))}
            </Filter>
          ))}
        </FilterControl>
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
