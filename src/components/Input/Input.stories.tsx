import type { Meta } from '@storybook/react';
import Input, { InputProps } from './Input';
import { useState } from 'react';
import Button from '../Button/Button';
import { Text, TextVariants } from '../Text';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Input',
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
  inputAdornment: {
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

export const DateTimeInput = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Input key={args.defaultValue?.toString()} {...args} id="Input-1" />
  </div>
);

DateTimeInput.args = {
  playgroundWidth: 300,
  className: 'input-test-class',
  defaultValue: '2017-06-01T08:30',
  disabled: false,
  invalid: false,
  invalidText: 'Error message',
  labelText: 'Label text',
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
  size: 'md',
  type: 'datetime-local',
};

export const RadioInput = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Input
      key={args.defaultValue?.toString()}
      {...args}
      id="Input-1"
      labelText="Label text 1"
      defaultChecked={true}
      name="radios"
    />
    <Input key={args.defaultValue?.toString()} {...args} id="Input-2" labelText="Label text 2" name="radios" />
  </div>
);

RadioInput.args = {
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
  type: 'radio',
};

export const CheckboxInput = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Input key={args.defaultValue?.toString()} {...args} id="Input-1" labelText="Label text 1" defaultChecked checked />
    <Input key={args.defaultValue?.toString()} {...args} id="Input-2" labelText="Label text 2" checked />
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
  type: 'checkbox',
};

CheckboxInput.argTypes = argTypes;

export const RangeInput = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Input key={args.defaultValue?.toString()} {...args} id="Input-1" />
  </div>
);

RangeInput.args = {
  playgroundWidth: 300,
  className: 'input-test-class',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText: 'Error message',
  disabled: false,
  defaultValue: 'My values',
  labelText: 'Label text',
  min: 300,
  max: 800,
  size: 'md',
  step: 50,
  type: 'range',
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
};

RangeInput.argTypes = argTypes;

export const ControlledInput = ({ playgroundWidth, ...args }: StoryProps) => {
  const [value, setValue] = useState(args.defaultValue);
  return (
    <div style={{ width: playgroundWidth, margin: '1rem' }}>
      <Input
        key={args.defaultValue as string}
        {...args}
        id="Input-1"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    </div>
  );
};

ControlledInput.args = {
  playgroundWidth: 300,
  className: 'input-test-class',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText: 'Error message',
  disabled: false,
  defaultValue: 'My values',
  labelText: 'Label text',
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
  size: 'md',
};

ControlledInput.argTypes = argTypes;

export const CustomLabel = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Input
      key={args.defaultValue as string}
      {...args}
      id="Input-1"
      labelText={
        <div>
          <p>
            Test Label <span style={{ fontVariationSettings: 'normal' }}>(Test Span)</span>
          </p>
        </div>
      }
    />
  </div>
);

CustomLabel.args = {
  showIcon: true,
};

CustomLabel.argTypes = {};

export const InputWithAdornment = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Input key={args.defaultValue as string} {...args} id="Input-1" />
  </div>
);

InputWithAdornment.args = {
  labelText: 'Input with Adornment',
  playgroundWidth: 300,
  size: 'md',
  inputAdornment: '$',
};

InputWithAdornment.argTypes = argTypes;

export const Playground = ({ playgroundWidth, ...args }: StoryProps) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries: string[] = [];
    for (const entry of formData.entries()) {
      entries.push(`${entry[0]}: ${entry[1]}`);
    }
    alert(`Form submitted ${entries.join('\n')}`);
  };

  return (
    <div style={{ width: playgroundWidth, margin: '1rem' }}>
      <Text variant={TextVariants.heading2} isSkeletonLoading={loading}>
        Form Inputs
      </Text>
      <form onSubmit={handleSubmit}>
        <Input {...args} labelText="Text Input" id="Input-1" name="stringInput" isSkeletonLoading={loading} />
        <Input
          type="checkbox"
          {...args}
          labelText="Checkbox Input"
          id="Input-2"
          name="checkboxInput"
          isSkeletonLoading={loading}
        />
        <Input
          type="radio"
          {...args}
          id="Input-3"
          labelText="Radio Input"
          name="radioInput"
          isSkeletonLoading={loading}
        />
        <Input
          type="toggle"
          {...args}
          id="Input-4"
          labelText="Toggle Input"
          name="toggleInput"
          isSkeletonLoading={loading}
        />
        <Text variant={TextVariants.body1} isSkeletonLoading={loading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nibh ac turpis molestie ultricies. Morbi
          placerat rhoncus elit, sed malesuada ante rutrum et.
        </Text>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1rem' }}>
          <Button type="submit" isSkeletonLoading={loading}>
            Submit
          </Button>
          <Button onClick={() => setLoading((prev) => !prev)}>Loading</Button>
        </div>
      </form>
    </div>
  );
};

Playground.args = {
  playgroundWidth: 300,
  className: 'input-test-class',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText: 'Error message',
  disabled: false,
  labelText: 'Label text',
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
  size: 'md',
};

Playground.argTypes = argTypes;
