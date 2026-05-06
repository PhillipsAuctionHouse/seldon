import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroCarousel from './HeroCarousel';

const meta: Meta<typeof HeroCarousel> = {
  title: 'Patterns/HeroCarousel',
  component: HeroCarousel,
};

export default meta;

type Story = StoryObj<typeof HeroCarousel>;

export const Playground: Story = {
  args: {
    autoplayMs: 6000,
    slides: [
      {
        key: '1',
        imageSrc: 'https://placehold.co/1440x600',
        auctionCard: {
          saleTypeLabel: 'Live Auction',
          title: 'Modernism: Editions & Works on Paper',
          location: 'New York',
          date: 'Begins 22 April',
          time: '12pm ET 2026',
          primaryCta: { label: 'Browse', href: '#' },
          secondaryCta: { label: 'Register to bid', href: '#' },
        },
      },
      {
        key: '2',
        imageSrc: 'https://placehold.co/1440x600/333',
        auctionCard: {
          saleTypeLabel: 'Online Only',
          title: 'Editions in Focus',
          primaryCta: { label: 'Explore', href: '#' },
        },
      },
      {
        key: '3',
        imageSrc: 'https://placehold.co/1440x600/666',
        href: '#',
      },
    ],
  },
};
