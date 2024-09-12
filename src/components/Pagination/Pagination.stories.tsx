import type { Meta } from '@storybook/react';
import { useState } from 'react';

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

const lotOptions = ['Lot 1', 'Lot 2', 'Lot 3', 'Lot 4', 'Lot 5'];

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
};

export const Playground = ({ playgroundWidth, onChange, ...args }: StoryProps) => {
  // Parent component is in charge of the state management
  const [value, setValue] = useState<string>(lotOptions[0]);

  return (
    <div style={{ width: playgroundWidth, margin: '1rem' }}>
      <Pagination
        {...args}
        id="Pagination-1"
        options={lotOptions}
        value={value}
        onChange={(value) => {
          setValue(value);
          onChange(value);
        }}
      ></Pagination>
    </div>
  );
};

Playground.args = {
  playgroundWidth: 200,
  className: 'pagination-test-class',
  isDisabled: false,
  onChange: (selectedValue: string) => {
    console.log('selected value >', selectedValue);
  },
};

Playground.argTypes = argTypes;
