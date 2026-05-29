import type { Meta } from '@storybook/react-vite';

import { SeldonImage } from '../SeldonImage';
import Banner, { type BannerRootProps } from './Banner';
import { BannerMediaSize, BannerVariants } from './types';

const sampleImage =
  'https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  argTypes: {
    variant: {
      options: Object.values(BannerVariants),
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;

export const Playground = (props: BannerRootProps) => (
  <Banner.Root {...props}>
    <Banner.Media>
      <SeldonImage aspectRatio="16/9" src={sampleImage} alt="Modern & Contemporary Art auction" objectFit="cover" />
    </Banner.Media>
    <Banner.Content>
      <Banner.Eyebrow>Modern & Contemporary Art</Banner.Eyebrow>
      <Banner.Title>Gallery Tour: Modern & Contemporary Art London</Banner.Title>
      <Banner.Description>
        From Scandinavian masterworks led by Vilhelm Hammershoi to signature works by Andy Warhol, Banksy, and El
        Anatsui, this season&apos;s auctions bring together celebrated voices of the 20th and 21st centuries.
      </Banner.Description>
      <Banner.Cta>Read more</Banner.Cta>
    </Banner.Content>
  </Banner.Root>
);

Playground.args = {
  id: 'playground',
};

Playground.argTypes = {
  variant: {
    options: Object.values(BannerVariants),
    control: { type: 'select' },
  },
};

export const Inline = (props: BannerRootProps) => (
  <Banner.Root {...props} variant={BannerVariants.inline}>
    <Banner.Media size={BannerMediaSize.third}>
      <SeldonImage aspectRatio="16/9" src={sampleImage} alt="Auction banner" objectFit="cover" />
    </Banner.Media>
    <Banner.Content>
      <Banner.Eyebrow>Department</Banner.Eyebrow>
      <Banner.Title>Banner with inline borders</Banner.Title>
      <Banner.Description>
        Supporting copy uses body medium with supporting color. This text is intentionally long to demonstrate the
        line-clamp behavior in stacked (3 lines) and side-by-side (2 lines) layouts.
      </Banner.Description>
      <Banner.Cta>Call to action</Banner.Cta>
    </Banner.Content>
  </Banner.Root>
);

Inline.args = { id: 'inline' };

export const ImageHalf = (props: BannerRootProps) => (
  <Banner.Root {...props}>
    <Banner.Media size={BannerMediaSize.half}>
      <SeldonImage aspectRatio="16/9" src={sampleImage} alt="Auction banner half width" objectFit="cover" />
    </Banner.Media>
    <Banner.Content>
      <Banner.Eyebrow>Label</Banner.Eyebrow>
      <Banner.Title>Half-width media column</Banner.Title>
      <Banner.Cta>Action</Banner.Cta>
    </Banner.Content>
  </Banner.Root>
);

ImageHalf.storyName = 'Image half width';
ImageHalf.args = { id: 'image-half' };

export const ImageThird = (props: BannerRootProps) => (
  <Banner.Root {...props}>
    <Banner.Media size={BannerMediaSize.third}>
      <SeldonImage aspectRatio="16/9" src={sampleImage} alt="Auction banner third width" objectFit="cover" />
    </Banner.Media>
    <Banner.Content>
      <Banner.Eyebrow>Label</Banner.Eyebrow>
      <Banner.Title>Third-width media column</Banner.Title>
      <Banner.Cta>Action</Banner.Cta>
    </Banner.Content>
  </Banner.Root>
);

ImageThird.storyName = 'Image third width';
ImageThird.args = { id: 'image-third' };

export const ImageOnRight = (props: BannerRootProps) => (
  <Banner.Root {...props}>
    <Banner.Content>
      <Banner.Eyebrow>Label</Banner.Eyebrow>
      <Banner.Title>Image column on the right</Banner.Title>
      <Banner.Cta>Action</Banner.Cta>
    </Banner.Content>
    <Banner.Media size={BannerMediaSize.half}>
      <SeldonImage aspectRatio="16/9" src={sampleImage} alt="Auction banner image right" objectFit="cover" />
    </Banner.Media>
  </Banner.Root>
);

ImageOnRight.storyName = 'Image on right';
ImageOnRight.args = { id: 'image-right' };
