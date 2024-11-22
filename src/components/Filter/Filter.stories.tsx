import { Meta } from '@storybook/react';
import Filter from './Filter';
import FilterHeader from './FilterHeader';
import FilterInput from './FilterInput';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Filter',
  component: Filter,
} satisfies Meta<typeof Filter>;

export default meta;

type FilterDimension = { label: string; disabled?: boolean | undefined; checked: boolean };

type FilterType = {
  label: string;
  id: string;
  filterDimensions: FilterDimension[];
};

type PropTypes = {
  filter: FilterType;
  viewAllLimit: number;
  isViewingAll: boolean;
};

const filter: FilterType = {
  label: 'Artists & Makers',
  id: 'makers',
  filterDimensions: [
    { label: 'Jimmy', checked: true },
    { label: 'Bob', checked: false },
    { label: 'Alan', checked: false },
    { label: 'Nick', checked: false },
    { label: 'Joe', checked: false },
    { label: 'Fred', checked: false },
    { label: 'Rob', checked: false },
    { label: 'Roy', checked: false },
    { label: 'disabled', disabled: true, checked: false },
  ],
};

const FilterComponent = (props: PropTypes) => {
  const { filter: intialFilters, viewAllLimit, isViewingAll } = props;
  const [filter, setFilter] = useState(intialFilters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { checked, name } = e.target as HTMLInputElement;
    const updatedFilterDimensions = filter.filterDimensions.map((dimension) => {
      if (dimension.label === name) {
        return {
          ...dimension,
          checked,
        };
      }
      return dimension;
    });

    const updatedFilter = {
      ...filter,
      filterDimensions: updatedFilterDimensions,
    };

    setFilter(updatedFilter);
  };

  return (
    <Filter key={filter.label} name={filter.label} viewAllLimit={viewAllLimit} isViewingAll={isViewingAll}>
      <FilterHeader heading={filter.label} />
      {filter.filterDimensions.map((value: FilterDimension) => (
        <FilterInput
          id={value.label}
          key={value.label}
          labelText={value.label}
          onChange={handleChange}
          type="checkbox"
          disabled={value?.disabled}
          name={value.label}
          checked={value.checked}
        />
      ))}
    </Filter>
  );
};

export const Playground = (props: PropTypes) => {
  return <FilterComponent {...props} />;
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  filter,
  viewAllLimit: 10,
  isViewingAll: false,
};

Playground.argTypes = {};
