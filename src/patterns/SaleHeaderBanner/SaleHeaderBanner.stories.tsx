import { Meta } from '@storybook/react';
import SaleHeaderBanner, { SaleHeaderBannerProps } from './SaleHeaderBanner';
import { AuctionStatus } from '../../types/commonTypes';
import SaleHeaderBrowseAuctions from './SaleHeaderBrowseAuctions';
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
  auctionState: AuctionStatus.ready,
  imageSrcUrl:
    'https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg',
  headerLabel: 'Live Auction',
};

Playground.argTypes = {
  auctionState: {
    options: Object.values(AuctionStatus),
    control: {
      type: 'select',
    },
  },
  currentDateTime: {
    control: {
      type: 'date',
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
    headerLabel="Online Auction"
    auctionState={AuctionStatus.ready}
    showTimer
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
    headerLabel="Online Auction"
    auctionState={AuctionStatus.ready}
    showTimer
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
    headerLabel="Online Auction"
    location="New York"
    auctionState={AuctionStatus.ready}
    showTimer
  />
);

export const OpenForBidding = (props: SaleHeaderBannerProps & { currentDateTime?: Date }) => (
  <SaleHeaderBanner
    {...props}
    auctionEndTime={props.auctionEndTime ? new Date(props.auctionEndTime) : addMinutes(new Date(), 10)}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
    occurrenceInformation={[{ date: '10:00am EDT, 4 Sep 2024', occurrenceLabel: 'Lots Begin to Close' }]}
    location="New York"
    headerLabel="Online Auction"
    countdownTimerLabel="Lots Will Close In"
    countdownFormatDuration={(duration) => duration.replace('minutes', 'mins')}
    auctionState={AuctionStatus.live}
    showTimer
    getCurrentDateTime={props.currentDateTime ? () => props.currentDateTime || new Date() : undefined}
  />
);

OpenForBidding.argTypes = {
  currentDateTime: {
    control: {
      type: 'date',
    },
  },
  auctionEndTime: {
    control: {
      type: 'date',
    },
  },
};

export const Closed = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    imageSrcUrl="https://assets.phillips.com/image/upload/t_Website_AuctionPageHero/v1726172550/auctions/NY090324/NY090324.jpg"
    occurrenceInformation={[{ date: '4 Sep 2024', occurrenceLabel: 'Concluded' }]}
    location="New York"
    headerLabel="Online Auction"
    auctionState={AuctionStatus.past}
    showTimer
    footerElement={<div>Banner footer</div>}
  >
    <SaleHeaderBrowseAuctions />
  </SaleHeaderBanner>
);

export const MissingImage = (props: SaleHeaderBannerProps) => (
  <SaleHeaderBanner
    {...props}
    auctionTitle="Modern & Contemporary Art: Online Auction, New York"
    imageSrcUrl=""
    occurrenceInformation={[{ date: '4 Sep 2024', occurrenceLabel: 'Concluded' }]}
    location="New York"
    headerLabel="Online Auction"
    auctionState={AuctionStatus.past}
    showTimer
  >
    <SaleHeaderBrowseAuctions />
  </SaleHeaderBanner>
);
