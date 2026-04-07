import type { Meta } from '@storybook/react-vite';

import Card, { type CardRootProps } from './Card';
import { CardVariants } from './types';

const sampleVideoSource =
  'https://players.brightcove.net/6415663453001/default_default/index.html?videoId=6355671347112';

const meta = {
  title: 'Components/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

export const Playground = (props: CardRootProps) => (
  <Card.Root {...props}>
    <Card.Image alt="Card image" src="/static/test-image-160x90.jpg" />
    <Card.Content>
      <Card.Eyebrow>Modern & Contemporary Art</Card.Eyebrow>
      <Card.Title>Gallery Tour: Modern & Contemporary Art London</Card.Title>
      <Card.Badge>Happening Now</Card.Badge>
      <Card.Description>
        From Scandinavian masterworks led by Vilhelm Hammershoi to signature works by Andy Warhol, Banksy, and El
        Anatsui, this season&apos;s Modern & Contemporary Art auctions bring together celebrated voices of the 20th and
        21st centuries.
      </Card.Description>
      <Card.Meta>
        <Card.MetaItem>New York</Card.MetaItem>
        <Card.MetaItem>2 PM EST, May 27, 2025</Card.MetaItem>
      </Card.Meta>
    </Card.Content>
  </Card.Root>
);

Playground.args = {
  id: 'playground',
};

Playground.argTypes = {
  element: {
    control: false,
  },
  variant: {
    options: Object.values(CardVariants),
    control: {
      type: 'select',
    },
  },
};

export const ArticleCard = (props: CardRootProps) => (
  <Card.Root {...props} id="article-card-date">
    <Card.Image alt="Article card image" src="/static/test-image-160x90.jpg" />
    <Card.Content>
      <Card.Eyebrow>Modern & Contemporary Art</Card.Eyebrow>
      <Card.Title>Perpetual Picks: Two Sides of A. Lange & Söhne</Card.Title>
      <Card.Meta>
        <Card.MetaItem>May 27, 2025</Card.MetaItem>
      </Card.Meta>
    </Card.Content>
  </Card.Root>
);

ArticleCard.args = {
  id: 'article-card',
};

export const ArticleCardWithCta = (props: CardRootProps) => (
  <Card.Root {...props} id="article-card-cta">
    <Card.Image alt="Article card image with CTA" src="/static/test-image-160x90.jpg" />
    <Card.Content>
      <Card.Eyebrow>Modern & Contemporary Art</Card.Eyebrow>
      <Card.Title>Perpetual Picks: Two Sides of A. Lange & Söhne</Card.Title>
      <Card.Cta href="/?path=/docs/components-card--article-card-with-cta">Read more</Card.Cta>
    </Card.Content>
  </Card.Root>
);

ArticleCardWithCta.storyName = 'Article card with CTA';

ArticleCardWithCta.args = {
  id: 'article-card-cta',
};

export const MediaCard = (props: CardRootProps) => (
  <Card.Root {...props}>
    <Card.Video iframeTitle="Featured auction video" videoSource={sampleVideoSource} />
    <Card.Content>
      <Card.Eyebrow>Modern & Contemporary Art</Card.Eyebrow>
      <Card.Title>
        <a href="/?path=/docs/components-card--overview">Gallery Tour: Modern & Contemporary Art London</a>
      </Card.Title>
      <Card.Description>
        Watch highlights from this season&apos;s auctions—led by signature works from Vilhelm Hammershoi, Andy Warhol,
        Banksy, and El Anatsui—and explore voices of the 20th and 21st centuries.
      </Card.Description>
    </Card.Content>
  </Card.Root>
);

MediaCard.args = {
  id: 'media-card',
  variant: CardVariants.stacked,
};
