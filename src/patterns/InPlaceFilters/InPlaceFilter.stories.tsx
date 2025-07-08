import { Meta } from '@storybook/react';
import InPlaceFilters from './InPlaceFilters';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/InPlaceFilters',
  component: InPlaceFilters,
} satisfies Meta<typeof InPlaceFilters>;

export default meta;
export const Playground = (props: any) => {
  return (
    <>
      <InPlaceFilters {...props} />
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  id: 'in-place-filters-story',
  filterLabel: 'Filters',
  filtersLabelList: ['Sort', 'Sale Type', 'Departments', 'Month', 'Location'],
};

Playground.argTypes = {};
