import { Meta } from '@storybook/react';
import { useState } from 'react';
import InPlaceFilters from './InPlaceFilters';
import { FilterDropdownProps } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/InPlaceFilters',
  component: InPlaceFilters,
} satisfies Meta<typeof InPlaceFilters>;

export default meta;
export const Playground = (props: FilterDropdownProps) => {
  const [filtersLabelListState, setFiltersLabelListState] = useState([false, false, false, false, false]);

  return (
    <>
      <InPlaceFilters
        {...props}
        id="in-place-filters-story"
        filtersListState={filtersLabelListState}
        setFiltersLabelListState={setFiltersLabelListState}
      />
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  id: 'in-place-filters-story',
  filterLabel: 'Filters',
  filtersLabelList: ['Sort', 'Sale', 'Departments', 'Month', 'Location'],
  auctionFilterData: {
    Filters: {
      auctionCount: 5,
    },
    Sale: {
      auctionCount: 16,
    },
    Departments: {
      auctionCount: 10,
      filterLabels: [
        { id: 1, label: 'Contemporary Art', value: 'Contemporary Art' },
        { id: 2, label: 'Design', value: 'Design' },
        { id: 3, label: 'Jewellery', value: 'Jewellery' },
        { id: 4, label: 'Watches', value: 'Watches' },
        { id: 5, label: 'Photographs', value: 'Photographs' },
      ],
    },
    Month: {
      auctionCount: 8,
      filterLabels: [
        { id: 1, label: 'January', value: 'January' },
        { id: 2, label: 'February', value: 'February' },
        { id: 3, label: 'March', value: 'March' },
        { id: 4, label: 'April', value: 'April' },
        { id: 5, label: 'May', value: 'May' },
        { id: 6, label: 'June', value: 'June' },
      ],
    },
    Location: {
      auctionCount: 12,
      filterLabels: [
        { id: 1, label: 'Geneva', value: 'Geneva' },
        { id: 2, label: 'Hong Kong', value: 'Hong Kong' },
        { id: 3, label: 'London', value: 'London' },
        { id: 4, label: 'New York', value: 'New York' },
      ],
    },
  },
};

Playground.argTypes = {};
