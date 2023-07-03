import type { Meta, StoryObj } from '@storybook/react';

import HeroBanner from './HeroBanner';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/HeroBanner',
  component: HeroBanner,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground: Story = {
  args: {
    region: "New York",
    date: "15 NOV 2023",
    headerText: "20th Century & Contemporary Art",
    subHeadText: "Day Sales — Morning Session",
    association: "In Association with BACS & RUSSO",
    backgroundImage: "https://assets.phillips.com/image/upload/t_Website_DepartmentHero/v1685035132/website/department/hero-12.jpg"
  },
};
