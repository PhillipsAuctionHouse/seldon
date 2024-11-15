import type { Meta } from '@storybook/react';

import Select, { SelectProps } from './Select';
import { SelectVariants } from './types';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

interface StoryProps extends SelectProps {
  playgroundWidth: string;
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
  showCustomIcon: {
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
  variant: {
    options: [SelectVariants.default, SelectVariants.tertiary],
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

export const Playground = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Select key={args.defaultValue} {...args} id="Input-1">
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
  showCustomIcon: false,
  disabled: false,
  invalid: false,
  invalidText: 'Error message',
  labelText: 'Label text',
  readOnly: false,
  size: 'md',
  variant: SelectVariants.default,
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
};

Playground.argTypes = argTypes;

export const Tertiary = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Select key={args.defaultValue} {...args} id="Input-1" value="show-lot" hideLabel={true}>
      <option key="0" value="show-lot" hidden>
        Show Lot No.
      </option>

      {Array.from({ length: 20 }, (_, i) => (
        <option key={i}>Option {i + 1}</option>
      ))}
    </Select>
  </div>
);

Tertiary.args = {
  showCustomIcon: true,
  variant: SelectVariants.tertiary,
};

Tertiary.argTypes = {
  variant: {
    options: [SelectVariants.default, SelectVariants.tertiary],
    control: {
      type: 'select',
    },
    defaultValue: SelectVariants.tertiary,
  },
};
