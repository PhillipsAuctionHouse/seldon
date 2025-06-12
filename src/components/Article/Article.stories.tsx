import { Meta } from '@storybook/react';
import Article, { ArticleProps } from './Article';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Article',
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
export const Playground = (props: ArticleProps) => <Article {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  imageSrc: 'https://www.pamelaayuso.com/wp-content/uploads/2021/01/1711212B-2BPicasso2BBull2B1.jpg',
  label: 'FEATURE ARTICLE | EDITIONS',
  header: 'SPECIALIST PICKS, WRAPPED IN A BOW',
  description:
    "It's the season for gifting worldwide, so our global specialists share their picks from our upcoming Editions, Photographs and Design auction in Hong Kong.",
  linkLabel: 'Read Now',
  linkHref: '/',
};

Playground.argTypes = {};

export const ExitGateCard = (props: ArticleProps) => (
  <div style={{ maxWidth: '1392px' }}>
    <Article {...props} />
  </div>
);

ExitGateCard.args = {
  imageSrc: 'https://picsum.photos/704/268',
  label: 'CONSIGN TODAY',
  header: 'Sell with us',
  description: 'We are inviting consignments for our upcoming auctions.',
  linkLabel: 'Enquire now',
  linkHref: '/',
  variant: 'exitGateCard',
};

ExitGateCard.argTypes = {};
