import type { Meta } from '@storybook/react-vite';

import Card, { type CardRootProps } from './Card';
import { Icon } from '../Icon';
import { CardImageDisplay, CardVariants } from './types';

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
  imageDisplay: {
    options: Object.values(CardImageDisplay),
    control: {
      type: 'select',
    },
  },
  variant: {
    options: Object.values(CardVariants),
    control: {
      type: 'select',
    },
  },
};

export const ArticleCard = (props: CardRootProps) => (
  <Card.Root {...props}>
    <Card.Image alt="Article card image" src="/static/test-image-160x90.jpg" />
    <Card.Content>
      <Card.Eyebrow>Editorial</Card.Eyebrow>
      <Card.Title>How Collectors Are Rethinking Contemporary Design</Card.Title>
      <Card.Meta>
        <Card.MetaItem>May 27, 2025</Card.MetaItem>
      </Card.Meta>
    </Card.Content>
  </Card.Root>
);

ArticleCard.args = {
  id: 'article-card',
};

export const MediaCard = (props: CardRootProps) => (
  <Card.Root {...props}>
    <div style={{ position: 'relative', width: '100%' }}>
      <Card.Image alt="Media card image" src="/static/test-image-160x90.jpg" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '999px',
            color: 'white',
            display: 'inline-flex',
            height: '3rem',
            justifyContent: 'center',
            width: '3rem',
          }}
        >
          <Icon icon="Play" color="currentColor" height={20} width={20} />
        </div>
      </div>
    </div>
    <Card.Content>
      <Card.Eyebrow>Modern & Contemporary Art</Card.Eyebrow>
      <Card.Title>
        <a href="/?path=/docs/components-card--overview">Gallery Tour: Modern & Contemporary Art London</a>
      </Card.Title>
      <Card.Description>
        From Scandinavian masterworks led by Vilhelm Hammershoi to signature works by Andy Warhol, Banksy, and El
        Anatsui, this season&apos;s Modern & Contemporary Art auctions bring together celebrated voices of the 20th and
        21st centuries.
      </Card.Description>
    </Card.Content>
  </Card.Root>
);

MediaCard.args = {
  id: 'media-card',
  variant: CardVariants.stacked,
};
