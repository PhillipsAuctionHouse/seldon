import type { Meta } from '@storybook/react';
import ViewingDetails, { ViewingDetailsProps } from './ViewingDetails';

const meta = {
  title: 'Patterns/ViewingDetails',
  component: ViewingDetails,
} satisfies Meta<typeof ViewingDetails>;

export default meta;

const args = {
  id: 'ViewingDetailsId',
  title: 'Viewing Details',
  label: 'Viewings',
  sessionTimesLabel: 'Session Times',
  sessionTimes: [
    {
      sessionLabel: 'Session I, lots 1-103',
      sessionTime: 'Saturday, 10 May, 2025, 2pm',
    },
    {
      sessionLabel: 'Session II, lots 104-199',
      sessionTime: 'Saturday, 11 May, 2025, 3pm',
    },
  ],
  viewingTimes: [
    '7-11 May, 2025',
    'Wednesday - Friday, 10:00AM - 7PM',
    'Saturday, 09:00AM - 10:00PM',
    'Sunday, 09:00AM - 1:00PM',
  ],
  location: '30 Berkeley Square, London, United Kingdom, W1J 6EX',
  mapLink: 'https://www.google.com/maps/place/30+Berkeley+Square,+London,+United+Kingdom/@51.509865,-0.14189,17z',
};

export const Playground = (props: ViewingDetailsProps) => (
  <ViewingDetails key={`${props.id}`} {...props} style={{ border: `1px solid grey` }} />
);

Playground.args = {
  ...args,
};
