import { Meta } from '@storybook/react';
import { addMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';

import BidSnapshot, { BidSnapshotProps } from './BidSnapshot';
import BidMessage from './BidMessage';
import { AuctionStatus } from '../../types/commonTypes';
import { BidStatusEnum } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/BidSnapshot',
  component: BidSnapshot,
  argTypes: {
    auctionStatus: { options: ['READY', 'LIVE', 'PAST'], control: { type: 'select' } },
  },
} satisfies Meta<typeof BidSnapshot>;

export default meta;
export const Playground = (props: BidSnapshotProps) => {
  const { bidStatus, auctionStatus, lotCloseDate, currentBid, ...rest } = props;
  const isHighBid = bidStatus === BidStatusEnum.Winning || bidStatus === BidStatusEnum.Won;
  return (
    <BidSnapshot
      bidStatus={bidStatus}
      auctionStatus={auctionStatus}
      currentBid={currentBid}
      lotCloseDate={auctionStatus === AuctionStatus.ready ? undefined : lotCloseDate}
      {...rest}
    >
      {isHighBid && auctionStatus === AuctionStatus.live ? (
        <BidMessage message="With You" />
      ) : isHighBid && auctionStatus === AuctionStatus.past ? (
        <BidMessage message="Winning Bid not including Buyer Premium" />
      ) : null}
    </BidSnapshot>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  bidStatus: BidStatusEnum.Winning,
  currency: '$',
  numberOfBids: 3,
  auctionStatus: AuctionStatus.live,
  currentBid: 1000,
  lotCloseDate: addMinutes(new Date(), 20),
  lang: enUS,
  startingBid: 600,
};

Playground.argTypes = { bidStatus: { options: BidStatusEnum, control: { type: 'select' } } };
