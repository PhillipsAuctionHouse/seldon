import type { Meta } from '@storybook/react';
import { useState } from 'react';

import Pagination, { PaginationOptionValue, PaginationProps } from './Pagination';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

interface StoryProps extends PaginationProps {
  playgroundWidth: string;
}

const lotOptions = Array.from({ length: 20 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));

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
  const [value, setValue] = useState<PaginationOptionValue>(lotOptions[0].value ?? lotOptions[0]);

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

export const StringOptionsPlayground = ({ playgroundWidth, onChange, ...args }: StoryProps) => {
  const stringOptions = ['Lot 1', 'Lot 2', 'Lot 3', 'Lot 4', 'Lot 5'];
  const [value, setValue] = useState<string>(stringOptions[0]);

  return (
    <div style={{ width: playgroundWidth, margin: '1rem' }}>
      <Pagination
        {...args}
        id="Pagination-2"
        options={stringOptions}
        value={value}
        onChange={(value) => {
          setValue(value.toString());
          onChange(value);
        }}
      ></Pagination>
    </div>
  );
};

StringOptionsPlayground.args = {
  playgroundWidth: 200,
  className: 'pagination-test-class',
  isDisabled: false,
  onChange: (selectedValue: string) => {
    console.log('selected value >', selectedValue);
  },
};

StringOptionsPlayground.argTypes = argTypes;

export const AsyncPlayground = ({ playgroundWidth, onChange, ...args }: StoryProps) => {
  const stringOptions = ['Lot 1', 'Lot 2', 'Lot 3', 'Lot 4', 'Lot 5'];
  const [value, setValue] = useState<string>(stringOptions[0]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleChange = async (value: string) => {
    setIsDisabled(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setValue(value);
    setIsDisabled(false);
    onChange(value);
  };

  return (
    <div style={{ width: playgroundWidth, margin: '1rem' }}>
      <Pagination
        {...args}
        id="Pagination-3"
        options={stringOptions}
        value={value}
        isDisabled={isDisabled}
        onChange={(value) => handleChange(value.toString())}
      />
    </div>
  );
};

AsyncPlayground.args = {
  playgroundWidth: 200,
  className: 'pagination-test-class',
  isDisabled: false,
  onChange: (selectedValue: string) => {
    console.log('selected value >', selectedValue);
  },
};

AsyncPlayground.argTypes = argTypes;

Playground.args = {
  playgroundWidth: 200,
  className: 'pagination-test-class',
  isDisabled: false,
  onChange: (selectedValue: string) => {
    console.log('selected value >', selectedValue);
  },
};

Playground.argTypes = argTypes;
