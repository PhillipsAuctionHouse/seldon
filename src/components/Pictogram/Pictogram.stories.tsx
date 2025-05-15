import { Meta } from '@storybook/react';
import Pictogram, { PictogramProps } from './Pictogram';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Pictogram',
  component: Pictogram,
} satisfies Meta<typeof Pictogram>;

export default meta;
export const Playground = (props: PictogramProps) => <Pictogram {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};
