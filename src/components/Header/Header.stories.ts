import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import Logo from '../../assets/PhillipsLogo.svg';

const meta = {
  title: 'Components/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs

  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    logo: Logo,
    logoText: 'Phillips Auctioneers',
  },
};
