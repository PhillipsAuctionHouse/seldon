import { Meta } from '@storybook/react';
import SaleHeaderBanner, { SaleHeaderBannerProps } from './SaleHeaderBanner';
import { AuctionState } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/SaleHeaderBanner',
  component: SaleHeaderBanner,
} satisfies Meta<typeof SaleHeaderBanner>;

export default meta;
export const Playground = (props: SaleHeaderBannerProps) => <SaleHeaderBanner {...props} />;

Playground.args = {
  auctionTitle: 'Modern & Contemporary Art: Online Auction, New York',
  date: '10:00am EDT, 14 Sep 2024',
  occuranceLabel: 'Begins',
  location: 'New York',
  auctionState: AuctionState.preSale,
  imageSrcUrl:
    'https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg',
};

export const PreSale = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    date="10:00am EDT, 14 Sep 2024"
    occuranceLabel="Begins"
    location="New York"
    auctionState={AuctionState.preSale}
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
  />
);

export const OpenForBidding = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    date="10:00am EDT, 4 Sep 2024"
    occuranceLabel="Lots Begin to Close"
    location="New York"
    auctionState={AuctionState.openForBidding}
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
  />
);

export const Closed = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    date="10:00am EDT, 4 Sep 2024"
    occuranceLabel="Concluded"
    location="New York"
    auctionState={AuctionState.past}
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
  />
);
