import { Meta } from '@storybook/react';
import Filter from './Filter';
import FilterHeader from './FilterHeader';
import FilterValue from './FilterValue';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Filter',
  component: Filter,
} satisfies Meta<typeof Filter>;

export default meta;

type FilterDimension = { label: string; disabled?: boolean | undefined; active: boolean };

type FilterType = {
  label: string;
  id: string;
  filterDimensions: FilterDimension[];
};

type PropTypes = {
  filter: FilterType;
  viewAllLimit: number;
  isLast: boolean;
  isViewingAll: boolean;
};

const filter: FilterType = {
  label: 'Artists & Makers',
  id: 'makers',
  filterDimensions: [
    { label: 'Jimmy', active: true },
    { label: 'Bob', active: false },
    { label: 'Alan', active: false },
    { label: 'Nick', active: false },
    { label: 'Joe', active: false },
    { label: 'Fred', active: false },
    { label: 'Rob', active: false },
    { label: 'Roy', active: false },
    { label: 'disabled', disabled: false, active: false },
  ],
};

const FilterComponent = (props: PropTypes) => {
  const { filter: intialFilters, viewAllLimit, isLast, isViewingAll } = props;
  const [filter, setFilter] = useState(intialFilters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { checked, name } = e.target as HTMLInputElement;
    const updatedFilterDimensions = filter.filterDimensions.map((dimension) => {
      if (dimension.label === name) {
        return {
          ...dimension,
          active: checked,
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
    <Filter
      key={filter.label}
      name={filter.label}
      isLast={isLast}
      viewAllLimit={viewAllLimit}
      isViewingAll={isViewingAll}
    >
      <FilterHeader heading={filter.label} />
      {filter.filterDimensions.map((value: FilterDimension) => (
        <FilterValue
          key={value.label}
          inputType="checkbox"
          inputProps={{
            onChange: handleChange,
            id: value.label,
            labelText: value.label,
            disabled: value?.disabled,
            name: value.label,
            checked: value.active,
          }}
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
  isLast: true,
  isViewingAll: false,
};

Playground.argTypes = {};
