import { Meta } from '@storybook/react';
import Filter from './Filter';
import FilterHeader from './FilterHeader';
import FilterValue from './FilterValue';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Filter',
  component: Filter,
} satisfies Meta<typeof Filter>;

export default meta;

type FilterDimension = { label: string; disabled?: boolean | undefined };

type FilterType = {
  label: string;
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
  filterDimensions: [
    { label: 'Jimmy' },
    { label: 'Bob' },
    { label: 'Alan' },
    { label: 'Nick' },
    { label: 'Joe' },
    { label: 'Fred' },
    { label: 'Rob' },
    { label: 'Roy' },
    { label: 'disabled', disabled: true },
  ],
};

export const Playground = (props: PropTypes) => {
  const { filter, viewAllLimit, isLast, isViewingAll } = props;
  return (
    <Filter key={filter.label} isLast={isLast} viewAllLimit={viewAllLimit} viewingAll={isViewingAll}>
      <FilterHeader label={filter.label} />
      {filter.filterDimensions.map((value: FilterDimension) => (
        <FilterValue
          key={value.label}
          label={value.label}
          onChange={(e) => {
            e;
          }}
          inputType="checkbox"
          disabled={value?.disabled}
        />
      ))}
    </Filter>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  filter,
  viewAllLimit: 10,
  isLast: true,
  isViewingAll: false,
};

Playground.argTypes = {};
