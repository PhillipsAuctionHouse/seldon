import type { Meta, StoryObj } from '@storybook/react';

import HeroBanner, { HeroBannerProps } from './HeroBanner';
import { HeroBannerVariants } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/HeroBanner',
  component: HeroBanner,
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground: Story = {
  args: {
    prehead: 'New York',
    date: '15 NOV 2023',
    headerText: '20th Century & Contemporary Art',
    subHeadText: 'Day Sales — Morning Session',
    association: 'In Association with BACS & RUSSO',
    background:
      'linear-gradient(rgba(0, 0, 0, 50%), rgba(0, 0, 0, 50%)), url(https://assets.phillips.com/image/upload/t_Website_DepartmentHero/v1685035132/website/department/hero-12.jpg)',
  },
};

export const SimpleHeroBanner = (props: HeroBannerProps) => (
  <HeroBanner
    {...props}
    background="url(https://phillips.vo.llnwd.net/v1/web_prod/images/banners/about-us.jpg)"
    headerText="About Us"
  />
);

export const TextHeroBanner = (props: HeroBannerProps) => (
  <HeroBanner
    {...props}
    headerText="Text Banner"
    description="This is the description to be used with the Text variant of the Hero Banner. This is not used in the default variant of the Hero Banner."
    variant={HeroBannerVariants.TEXT}
  />
);
