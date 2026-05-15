import type { Meta, StoryObj } from '@storybook/react-vite';
import AuctionCard from './AuctionCard';

const meta: Meta<typeof AuctionCard> = {
  title: 'Patterns/AuctionCard',
  component: AuctionCard,
};

export default meta;

type Story = StoryObj<typeof AuctionCard>;

export const Playground: Story = {
  args: {
    saleTypeLabel: 'Live Auction',
    title: 'Modernism: Editions & Works on Paper',
    location: 'New York',
    date: 'Begins 22 April',
    time: '12pm ET 2026',
    primaryCta: { label: 'Browse', href: '#' },
    secondaryCta: { label: 'Register to bid', href: '#' },
    background: 'translucent',
  },
};

export const Opaque: Story = {
  args: {
    ...Playground.args,
    background: 'opaque',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Modernism: Editions & Works on Paper',
  },
};
