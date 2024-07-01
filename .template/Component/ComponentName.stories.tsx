import { Meta } from '@storybook/react';
import ComponentName, { ComponentNameProps } from './ComponentName';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
} satisfies Meta<typeof ComponentName>;

export default meta;
export const Playground = (props: ComponentNameProps) => <ComponentName {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};
