import { Meta } from '@storybook/react';
import TextArea, { TextAreaProps } from './TextArea';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/TextArea',
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
export const Playground = (props: TextAreaProps) => <TextArea {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
  labelText: 'Description (Optional)',
  rows: 4,
  isSkeletonLoading: false,
  name: 'description',
  maxLength: 500,
};

Playground.argTypes = {
  labelText: {
    control: {
      type: 'text',
    },
  },
  rows: {
    control: {
      type: 'number',
    },
  },
  isSkeletonLoading: {
    control: {
      type: 'boolean',
    },
  },
  maxLength: {
    control: {
      type: 'number',
    },
  },
  name: {
    control: {
      type: 'string',
    },
  },
};
