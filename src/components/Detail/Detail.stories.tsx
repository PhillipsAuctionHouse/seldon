import { Meta } from '@storybook/react';
import Detail, { DetailProps } from './Detail';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Detail',
  component: Detail,
} satisfies Meta<typeof Detail>;

export default meta;
export const Playground = (props: DetailProps) => <Detail {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  label: 'Label',
  value: 'Value',
};

Playground.argTypes = {};
