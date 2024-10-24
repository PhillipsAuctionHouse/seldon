import { Meta } from '@storybook/react';
import Countdown, { CountdownProps } from './Countdown';
import { addDays, addHours, addMinutes } from 'date-fns';
import { CountdownVariants } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Countdown',
  component: Countdown,
} satisfies Meta<typeof Countdown>;

export default meta;

const daysDate = addDays(new Date(), 3);
const hoursDate = addHours(new Date(), 5);
const minutesDate = addMinutes(new Date(), 20);

export const Playground = (props: CountdownProps) => <Countdown {...props} endDateTime={minutesDate} />;

Playground.argTypes = {
  locale: {
    type: 'select',
    options: ['en', 'zh'],
  },
};

export const Days = (props: CountdownProps) => <Countdown {...props} endDateTime={daysDate} />;

export const Hours = (props: CountdownProps) => <Countdown {...props} endDateTime={hoursDate} />;

export const Minutes = (props: CountdownProps) => <Countdown {...props} endDateTime={minutesDate} />;

export const Compact = (props: CountdownProps) => (
  <Countdown {...props} endDateTime={minutesDate} variant={CountdownVariants.compact} />
);
