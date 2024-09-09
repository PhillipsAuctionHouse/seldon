import type { Meta } from '@storybook/react';

import Pagination, { PaginationProps } from './Pagination';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

interface StoryProps extends PaginationProps {
  playgroundWidth: string;
}

const argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  playgroundWidth: {
    control: { type: 'range', min: 200, max: 300, step: 50 },
  },
  value: {
    control: {
      type: 'text',
    },
  },
};

export const Playground = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Pagination key={args.value} {...args} id="Pagination-1">
      <option>Lot 1</option>
      <option>Lot 2</option>
      <option>Lot 3</option>
      <option>Lot 4</option>
      <option>Lot 5</option>
    </Pagination>
  </div>
);

Playground.args = {
  playgroundWidth: 200,
  className: 'pagination-test-class',
  value: null,
  isDisabled: false,
  onChange: (selectedValue: string) => {
    console.log('selected value >', selectedValue);
  },
};

Playground.argTypes = argTypes;
