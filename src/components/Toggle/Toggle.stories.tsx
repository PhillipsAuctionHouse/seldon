import type { Meta } from '@storybook/react';

import Input, { InputProps } from '../Input/Input';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Toggle',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

interface StoryProps extends InputProps {
  playgroundWidth: string;
}

const argTypes = {
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
  text: {
    // adding blank entry to prevent a control from rendering
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

export const CheckboxInput = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Input key={args.defaultValue?.toString()} {...args} id="Input-1" labelText="Label text 1" type="toggle" />
  </div>
);

CheckboxInput.args = {
  playgroundWidth: 300,
  className: 'input-test-class',
  placeholder: 'Placeholder text',
  inline: true,
  invalid: false,
  invalidText: 'Error message',
  disabled: false,
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
  size: 'md',
};

CheckboxInput.argTypes = argTypes;
