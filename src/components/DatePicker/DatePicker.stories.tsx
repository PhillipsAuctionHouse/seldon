import type { Meta } from '@storybook/react-vite';
import * as React from 'react';

import DatePicker, { DatePickerProps } from './DatePicker';
import { Instance } from 'flatpickr/dist/types/instance';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;

interface StoryProps extends DatePickerProps {
  playgroundWidth: string;
}

const argTypes = {
  allowInput: {
    control: {
      type: 'boolean',
    },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  defaultValue: {
    control: {
      type: 'array',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  enableTime: {
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
  locale: {
    options: ['ru', 'zh', 'en'],
    control: {
      type: 'select',
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
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
  type: {
    options: ['single', 'range'],
    control: {
      type: 'select',
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

const PickerWithRef = (props: DatePickerProps) => {
  const inputRef = React.useRef() as React.Ref<HTMLInputElement> | undefined;

  const handleOnChange = (dates: Date[], dateStr: string, Instance: Instance) => {
    if (props && typeof props.onChange === 'function') {
      props.onChange(dates, dateStr, Instance);
    }
  };
  return (
    <DatePicker ref={inputRef} key={`${props.defaultValue}`} {...props} id="DatePicker-1" onChange={handleOnChange} />
  );
};

export const WithDefaultDates = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <PickerWithRef key={`${args.defaultValue}`} {...args} id="DatePicker-1" />
  </div>
);

WithDefaultDates.args = {
  playgroundWidth: 300,
  className: 'DatePicker-test-class',
  defaultValue: [new Date('2023-06-01T08:30'), new Date('2023-06-05T08:30')],
  disabled: false,
  invalid: false,
  invalidText: 'Error message',
  labelText: 'Label text',
  placeholder: 'yyyy-mm-dd - yyyy-mm-dd',
  readOnly: false,
  size: 'md',
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
};

WithDefaultDates.argTypes = argTypes;

export const WithTimePicker = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <DatePicker key={`${args.defaultValue}${args.locale}`} {...args} id="DatePicker-1" />
  </div>
);

WithTimePicker.args = {
  playgroundWidth: 300,
  className: 'DatePicker-test-class',
  defaultValue: undefined,
  disabled: false,
  enableTime: true,
  invalid: false,
  invalidText: 'Error message',
  labelText: 'Label text',
  placeholder: 'yyyy-mm-dd - yyyy-mm-dd',
  readOnly: false,
  size: 'md',
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
};

WithTimePicker.argTypes = argTypes;

export const Playground = ({ playgroundWidth, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <DatePicker key={`${args.defaultValue}${args.locale}`} {...args} id="DatePicker-1" />
  </div>
);

Playground.args = {
  playgroundWidth: 300,
  className: 'DatePicker-test-class',
  defaultValue: undefined,
  allowInput: true,
  disabled: false,
  invalid: false,
  invalidText: 'Error message',
  labelText: 'Label text',
  placeholder: 'yyyy-mm-dd - yyyy-mm-dd',
  readOnly: false,
  size: 'md',
  warn: false,
  warnText: 'Warning message that is really long can wrap to more lines.',
};

Playground.argTypes = argTypes;
