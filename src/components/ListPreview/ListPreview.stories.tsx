import { Meta } from '@storybook/react';
import ListPreview, { ListPreviewProps } from './ListPreview';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/ListPreview',
  component: ListPreview,
} satisfies Meta<typeof ListPreview>;

export default meta;
export const Playground = (props: ListPreviewProps) => <ListPreview {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};
