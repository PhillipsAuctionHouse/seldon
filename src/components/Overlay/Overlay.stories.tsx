import { Meta } from '@storybook/react';
import Overlay, { OverlayProps } from './Overlay';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Overlay',
  component: Overlay,
} satisfies Meta<typeof Overlay>;

export default meta;
export const Playground = (props: OverlayProps) => <Overlay {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};
