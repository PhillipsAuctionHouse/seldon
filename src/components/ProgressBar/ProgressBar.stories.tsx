import type { Meta } from '@storybook/react-vite';
import { ProgressBar, type ProgressBarProps } from './index';

const sampleLotMarkers: NonNullable<ProgressBarProps['lotMarkers']> = [
  {
    lotNumber: 10,
    lotTitle: 'Cool Art Workz',
    lotArtist: 'Rebecca Great Artist',
    estimate: '$2,500 - $5,000',
    type: 'upcoming',
    advBid: '$4,500',
  },
  {
    lotNumber: 22,
    lotTitle: 'Morning Light',
    lotArtist: 'Ariana Bloom',
    estimate: '$4,000 - $6,000',
    type: 'upcoming',
  },
  {
    lotNumber: 34,
    lotTitle: 'Blue Geometry',
    lotArtist: 'Theo Martin',
    estimate: '$8,000 - $12,000',
    type: 'upcoming',
    advBid: '$10,500',
  },
  {
    lotNumber: 51,
    lotTitle: 'City Reflection',
    lotArtist: 'Nadia Cole',
    estimate: '$6,000 - $9,000',
    type: 'upcoming',
  },
  {
    lotNumber: 68,
    lotTitle: 'Red Horizon',
    lotArtist: 'Miles Hart',
    estimate: '$12,000 - $18,000',
    type: 'upcoming',
    advBid: '$14,000',
  },
  {
    lotNumber: 87,
    lotTitle: 'Silent Study',
    lotArtist: 'Leah Park',
    estimate: '$3,000 - $4,500',
    type: 'upcoming',
  },
  {
    lotNumber: 108,
    lotTitle: 'Night Orchard',
    lotArtist: 'Jonas Reed',
    estimate: '$9,000 - $13,000',
    type: 'upcoming',
    advBid: '$11,250',
  },
];

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    currentLot: {
      control: { type: 'number' },
    },
    totalLots: {
      control: { type: 'number' },
    },
    lotMarkers: {
      control: 'object',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

export const Playground = (props: ProgressBarProps) => <ProgressBar {...props} />;

Playground.args = {
  currentLot: 35,
  totalLots: 120,
};

export const WithMarkers = (props: ProgressBarProps) => <ProgressBar {...props} />;

WithMarkers.args = {
  currentLot: 35,
  totalLots: 120,
  lotMarkers: sampleLotMarkers,
};

WithMarkers.parameters = {
  controls: {
    expanded: true,
    include: ['currentLot', 'totalLots', 'ariaLive', 'lotMarkers', 'className'],
  },
};