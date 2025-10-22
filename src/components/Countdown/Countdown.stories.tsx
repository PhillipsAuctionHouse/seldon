import { Meta } from '@storybook/react';
import Countdown, { CountdownProps } from './Countdown';
import { addDays, addHours, addMinutes, addSeconds } from 'date-fns';
import { CountdownVariants } from './types';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Countdown',
  component: Countdown,
} satisfies Meta<typeof Countdown>;

export default meta;

const daysDate = addDays(new Date(), 3);
const hoursDate = addHours(new Date(), 5);
const minutesDate = addMinutes(new Date(), 3);
const secondsDate = addSeconds(new Date(), 10);
const closingDate = addMinutes(addSeconds(new Date(), 10), 3);

export const Playground = (props: CountdownProps) => {
  const [endDateTime, setEndDateTime] = useState(props.endDateTime ?? minutesDate);

  const resetToThreeMinutesFromNow = () => {
    setEndDateTime(addMinutes(new Date(), 3));
  };

  return (
    <div>
      <Countdown {...props} endDateTime={endDateTime} />
      <button onClick={resetToThreeMinutesFromNow}>Reset to 3 minutes from now</button>
    </div>
  );
};

Playground.argTypes = {
  locale: {
    type: 'select',
    options: ['en', 'zh'],
  },
  variant: {
    type: 'select',
    options: Object.values(CountdownVariants),
  },
  endDateTime: {
    control: 'date',
  },
};

export const Days = (props: CountdownProps) => <Countdown {...props} endDateTime={daysDate} />;

export const Hours = (props: CountdownProps) => <Countdown {...props} endDateTime={hoursDate} />;

export const Minutes = (props: CountdownProps) => <Countdown {...props} endDateTime={minutesDate} />;

export const Seconds = (props: CountdownProps) => <Countdown {...props} endDateTime={secondsDate} />;

export const Compact = (props: CountdownProps) => (
  <Countdown {...props} endDateTime={minutesDate} variant={CountdownVariants.compact} />
);

export const ClosingCountdown = (props: CountdownProps) => <Countdown {...props} endDateTime={closingDate} />;

ClosingCountdown.argTypes = {
  variant: {
    type: 'select',
    options: Object.values(CountdownVariants),
  },
};

// Disable Chromatic snapshots only for the most timing-volatile stories
Minutes.parameters = { chromatic: { disableSnapshot: true } };
Seconds.parameters = { chromatic: { disableSnapshot: true } };
ClosingCountdown.parameters = { chromatic: { disableSnapshot: true } };
