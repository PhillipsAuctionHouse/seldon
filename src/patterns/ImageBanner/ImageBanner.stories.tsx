import type { Meta, StoryObj } from '@storybook/react-vite';
import ImageBanner from './ImageBanner';

const meta: Meta<typeof ImageBanner> = {
  title: 'Patterns/ImageBanner',
  component: ImageBanner,
};

export default meta;

type Story = StoryObj<typeof ImageBanner>;

export const Dropshop: Story = {
  args: {
    href: '#',
    wordmark: 'DROPSHOP',
    tagline: 'Exclusive Drops\nBy Creators. For Collectors.',
    buttonLabel: 'Discover',
    theme: 'gradient-gray',
  },
};

export const WithImage: Story = {
  args: {
    href: '#',
    imageSrc: 'https://placehold.co/1344x255',
    wordmark: 'EDITORIAL',
    buttonLabel: 'Read more',
    theme: 'image',
  },
};
