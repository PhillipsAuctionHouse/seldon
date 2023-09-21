import type { Meta, StoryObj } from '@storybook/react';

import Input, { InputProps } from './Input';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

interface StoryProps extends InputProps {
  playgroundWidth: string
}

export const Playground = (args: StoryProps) => (
  <div style={{ width: args.playgroundWidth, margin: '1rem' }}>
    <Input key={args.defaultValue} {...args} id="Input-1" />
  </div>
);

Playground.args = {
  playgroundWidth: 300,
  className: 'input-test-class',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText: 'Error message',
  disabled: false,
  defaultValue: 'My values',
  labelText: 'Label text',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines.',
  size: 'md',
};

Playground.argTypes = {
  className: {
    control: {
      type: 'text',
    },
  },
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
  placeholder: {
    control: {
      type: 'text',
    },
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
  type: {
    control: {
      type: 'text',
    },
  },
  value: {
    control: {
      type: 'text',
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
