import { Meta } from '@storybook/react-vite';
import AddToCalendar, { AddToCalendarProps } from './AddToCalendar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/AddToCalendar',
  component: AddToCalendar,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
} satisfies Meta<typeof AddToCalendar>;

export default meta;
export const Playground = (props: AddToCalendarProps) => <AddToCalendar {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  event: {
    title: 'Modern & Contemporary Art Evening Sale',
    description: 'Modern & Contemporary Art Evening Sale',
    start: new Date('2025-08-13T17:00:00-04:00'),
    end: null,
    location: 'New York',
    timezone: 'America/New_York',
  },
};

Playground.argTypes = {};
