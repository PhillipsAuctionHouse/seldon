import type { Meta } from '@storybook/react-vite';
import { ProgressBar, type ProgressBarProps } from './index';

const sampleLotObjects: NonNullable<ProgressBarProps['lotObjects']> = [
  {
    lotNumber: 10,
    lotTitle: 'Cool Art Workz',
    lotArtist: 'Rebecca Great Artist',
    estimate: '$2,500 - $5,000',
    type: 'upcoming',
    imageSrc: '/static/test-image-160x90.jpg',
  },
  {
    lotNumber: 22,
    lotTitle: 'Morning Light',
    lotArtist: 'Ariana Bloom',
    estimate: '$4,000 - $6,000',
    type: 'upcoming',
    imageSrc: '/static/test-image-160x90.jpg',
  },
  {
    lotNumber: 34,
    lotTitle: 'Blue Geometry',
    lotArtist: 'Theo Martin',
    estimate: '$8,000 - $12,000',
    type: 'upcoming',
    advBid: '$10,500',
    imageSrc: '/static/test-image-160x90.jpg',
  },
  {
    lotNumber: 51,
    lotTitle: 'City Reflection',
    lotArtist: 'Nadia Cole',
    estimate: '$6,000 - $9,000',
    type: 'upcoming',
    imageSrc: '/static/test-image-160x90.jpg',
  },
  {
    lotNumber: 68,
    lotTitle: 'Red Horizon',
    lotArtist: 'Miles Hart',
    estimate: '$12,000 - $18,000',
    type: 'upcoming',
    advBid: '$14,000',
    imageSrc: '/static/test-image-160x90.jpg',
  },
  {
    lotNumber: 87,
    lotTitle: 'Silent Study',
    lotArtist: 'Leah Park',
    estimate: '$3,000 - $4,500',
    type: 'upcoming',
    imageSrc: '/static/test-image-160x90.jpg',
  },
  {
    lotNumber: 108,
    lotTitle: 'Night Orchard',
    lotArtist: 'Jonas Reed',
    estimate: '$9,000 - $13,000',
    type: 'upcoming',
    advBid: '$11,250',
    imageSrc: '/static/test-image-160x90.jpg',
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
    lotObjects: {
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

/** Story id: `components-progressbar--with-markers` (stable URL for bookmarks). */
export const WithLots = (props: ProgressBarProps) => <ProgressBar {...props} />;

WithLots.args = {
  currentLot: 1,
  totalLots: 120,
  lotObjects: sampleLotObjects,
};

WithLots.parameters = {
  controls: {
    expanded: true,
    include: ['currentLot', 'totalLots', 'ariaLive', 'lotObjects', 'className'],
  },
};
