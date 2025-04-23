import { Meta } from '@storybook/react';
import AddToCalendar, { AddToCalendarProps } from './AddToCalendar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/AddToCalendar',
  component: AddToCalendar,
} satisfies Meta<typeof AddToCalendar>;

export default meta;
export const Playground = (props: AddToCalendarProps) => <AddToCalendar {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  event: {
    title: 'Jewels & More: Online Auction',
    description: 'Jewels & More: Online Auction.',
    start: new Date('2025-01-27T15:13:02.59+00:00'),
    end: new Date('2025-06-18T18:15:02.59+00:00'),
    location: 'New York',
    timezone: 'America/New_York',
  },
};

Playground.argTypes = {};
