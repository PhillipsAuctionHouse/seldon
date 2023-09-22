import type { Meta } from '@storybook/react';

import Select, { SelectProps } from './Select';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

interface StoryProps extends SelectProps {
  playgroundWidth: string
}

const argTypes = {
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
  value: {
    control: {
      type: 'text',
    },
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
};

export const Playground = ({playgroundWidth, ...args}: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Select key={args.defaultValue} {...args} id="Input-1" >
      <option>Option 1</option>
      <option>Option 2</option>
      <option disabled>Option 3</option>
    </Select>
  </div>
);

Playground.args = {
  playgroundWidth: 300,
  className: 'input-test-class',
  defaultValue: 'Option 2',
  disabled: false,
  invalid: false,
  invalidText: 'Error message',
  labelText: 'Label text',
  readOnly: true,
  size: 'md',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines.',
}

Playground.argTypes = argTypes;