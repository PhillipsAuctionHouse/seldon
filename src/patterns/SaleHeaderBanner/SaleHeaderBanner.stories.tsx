import { Meta } from '@storybook/react';
import SaleHeaderBanner, { SaleHeaderBannerProps } from './SaleHeaderBanner';
import { AuctionState } from './types';
import SaleHeaderBrowseAuctions from './SaleHeaderBrowseAuctions';
import { Countdown } from '../../components/Countdown';
import { addMinutes } from 'date-fns';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/SaleHeaderBanner',
  component: SaleHeaderBanner,
} satisfies Meta<typeof SaleHeaderBanner>;

export default meta;
export const Playground = (props: SaleHeaderBannerProps) => <SaleHeaderBanner {...props} />;

Playground.args = {
  auctionTitle: 'Modern & Contemporary Art: Online Auction, New York',
  occurrenceInformation: [{ occurrenceLabel: 'Begins', date: '10:00am EDT, 14 Sep 2024' }],
  location: 'New York',
  auctionState: AuctionState.preSale,
  imageSrcUrl:
    'https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg',
};

Playground.argTypes = {
  auctionState: {
    options: Object.values(AuctionState),
    control: {
      type: 'select',
    },
  },
};

export const PreSale = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
    occurrenceInformation={[{ date: '10:00am EDT, 4 Sep 2024', occurrenceLabel: 'Begins' }]}
    location="New York"
    auctionState={AuctionState.preSale}
  />
);

export const PreSaleTwoOccurrences = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
    occurrenceInformation={[
      { date: '10:00am EDT, 4 Sep 2024', occurrenceLabel: 'Session I' },
      { date: '10:00am EDT, 5 Sep 2024', occurrenceLabel: 'Session II' },
    ]}
    location="New York"
    auctionState={AuctionState.preSale}
  />
);

export const PreSaleThreeOccurrences = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
    occurrenceInformation={[
      { date: '10:00am EDT, 4 Sep 2024', occurrenceLabel: 'Session I' },
      { date: '10:00am EDT, 5 Sep 2024', occurrenceLabel: 'Session II' },
      { date: '10:00am EDT, 6 Sep 2024', occurrenceLabel: 'Session III' },
    ]}
    location="New York"
    auctionState={AuctionState.preSale}
  />
);

export const OpenForBidding = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
    occurrenceInformation={[{ date: '10:00am EDT, 4 Sep 2024', occurrenceLabel: 'Lots Begin to Close' }]}
    location="New York"
    auctionState={AuctionState.openForBidding}
  >
    <Countdown endDateTime={addMinutes(new Date(), 20)} />
  </SaleHeaderBanner>
);

export const Closed = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
    occurrenceInformation={[{ date: '4 Sep 2024', occurrenceLabel: 'Concluded' }]}
    location="New York"
    auctionState={AuctionState.past}
  >
    <SaleHeaderBrowseAuctions />
  </SaleHeaderBanner>
);
