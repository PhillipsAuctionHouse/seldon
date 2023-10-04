import type { Meta } from '@storybook/react';
import * as React from 'react';

import DateRangePicker, { DateRangePickerProps } from './DateRangePicker';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;

interface StoryProps extends DateRangePickerProps {
  playgroundWidth: string
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
      type: 'boolean'
    }
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
  type: {
    control: {
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

const PickerWithRef = (props: DateRangePickerProps) => {
  const inputRef = React.useRef() as React.Ref<HTMLInputElement> | undefined;
  return <DateRangePicker ref={inputRef} key={`${props.defaultValue}`} {...props} id="DateRangePicker-1" />
}

export const DateTimeInput = ({playgroundWidth, ...args}: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <DateRangePicker  ref={React.createRef} key={`${args.defaultValue}${args.locale}`} {...args}  id="DateRangePicker-1" />
  </div>
);

DateTimeInput.args = {
  playgroundWidth: 300,
  className: 'DateRangePicker-test-class',
  defaultValue: '2017-06-01T08:30',
  disabled: false,
  invalid: false,
  invalidText: 'Error message',
  labelText: 'Label text',
  placeholder: "yyyy-mm-dd - yyyy-mm-dd",
  readOnly: false,
  size: 'md',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines.',
}

DateTimeInput.argTypes = argTypes;

