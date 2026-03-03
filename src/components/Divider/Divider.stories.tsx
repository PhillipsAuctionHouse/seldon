import { Meta } from '@storybook/react-vite';
import Divider, { DividerProps } from './Divider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
export const Playground = (props: DividerProps) => <Divider {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {};

Playground.argTypes = {};
