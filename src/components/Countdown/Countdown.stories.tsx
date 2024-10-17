import { Meta } from '@storybook/react';
import Countdown, { CountdownProps } from './Countdown';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Countdown',
  component: Countdown,
} satisfies Meta<typeof Countdown>;

export default meta;
export const Playground = (props: CountdownProps) => <Countdown {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};

const daysDate = new Date();
const hoursDate = new Date();
const minutesDate = new Date();

const addDays = new Date(daysDate.setDate(daysDate.getDate() + 3)).toISOString();
const addHours = new Date(hoursDate.setHours(hoursDate.getHours() + 5)).toISOString();
const addMinutes = new Date(minutesDate.setMinutes(minutesDate.getMinutes() + 20)).toISOString();

export const Days = (props: CountdownProps) => <Countdown {...props} endDate={addDays} />;

export const Hours = (props: CountdownProps) => <Countdown {...props} endDate={addHours} />;

export const Minutes = (props: CountdownProps) => <Countdown {...props} endDate={addMinutes} />;
