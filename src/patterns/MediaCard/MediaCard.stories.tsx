import type { Meta, StoryObj } from '@storybook/react-vite';
import MediaCard from './MediaCard';

const meta: Meta<typeof MediaCard> = {
  title: 'Patterns/MediaCard',
  component: MediaCard,
};

export default meta;

type Story = StoryObj<typeof MediaCard>;

export const Video: Story = {
  args: {
    href: '#',
    imageSrc: 'https://placehold.co/640x360',
    eyebrow: 'Modern & Contemporary Art',
    title: 'Gallery Tour | Modern & Contemporary Art London',
    meta: 'May 2026',
    showPlayOverlay: true,
  },
};

export const Article: Story = {
  args: {
    href: '#',
    imageSrc: 'https://placehold.co/640x360',
    eyebrow: 'Editions',
    title: 'Top Lots: Editions & Works on Paper',
    meta: 'February 2026',
  },
};
