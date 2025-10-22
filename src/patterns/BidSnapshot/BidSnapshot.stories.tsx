import { Meta } from '@storybook/react';
import { addMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';

import BidSnapshot, { BidSnapshotProps } from './BidSnapshot';
import BidMessage from './BidMessage';
import { LotStatus } from '../../types/commonTypes';
import { BidMessageVariants, BidStatusEnum } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/BidSnapshot',
  component: BidSnapshot,
  argTypes: {
    bidStatus: { options: new Array(BidStatusEnum), control: { type: 'select' } },
    lotStatus: { options: new Array(LotStatus), control: { type: 'select' } },
    currency: { control: 'text' },
    currentBidText: { control: 'text' },
    closingText: { control: 'text' },
    lang: { options: [enUS], control: { type: 'select' } },
    saleCloseDate: { control: 'date' },
    lotCloseDate: { control: 'date' },
    numberOfBids: { control: 'number' },
    startingBid: { control: 'number' },
    startingBidText: { control: 'text' },
    showSoldLabel: { control: 'boolean' },
    soldPrice: { control: 'number' },
    soldForText: { control: 'text' },
    wonForText: { control: 'text' },
  },
} satisfies Meta<typeof BidSnapshot>;

export default meta;
export const Playground = (props: BidSnapshotProps) => {
  const { bidStatus, lotStatus, lotCloseDate, currentBid, soldPrice, soldForText, wonForText, ...rest } = props;
  const soldForLabel = !soldPrice ? 'Sold' : soldForText;
  const wonForLabel = !soldPrice ? 'Won' : wonForText;

  return (
    <BidSnapshot
      bidStatus={bidStatus}
      lotStatus={lotStatus}
      currentBid={currentBid}
      lotCloseDate={lotStatus === LotStatus.ready ? undefined : lotCloseDate}
      soldPrice={soldPrice}
      soldForText={soldForLabel}
      wonForText={wonForLabel}
      {...rest}
    >
      {bidStatus === BidStatusEnum.Winning ? <BidMessage message="With You" /> : null}
      {bidStatus === BidStatusEnum.Won ? <BidMessage message="Won bid" /> : null}
      {bidStatus === BidStatusEnum.Losing ? (
        <BidMessage variant={BidMessageVariants.negative} message="Losing Bid" />
      ) : null}
    </BidSnapshot>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  currency: '$',
  numberOfBids: 3,
  lotStatus: LotStatus.live,
  currentBid: 1000,
  lotCloseDate: addMinutes(new Date(), 20),
  saleCloseDate: addMinutes(new Date(), 40),
  lang: enUS,
  startingBid: 600,
  soldPrice: 2000,
};

Playground.argTypes = {
  bidStatus: { options: BidStatusEnum, control: { type: 'select' } },
  lotStatus: { options: LotStatus, control: { type: 'select' } },
};

export const CurrentlyWinning = (props: BidSnapshotProps) => {
  const { lotStatus, lotCloseDate, currentBid, soldPrice, ...rest } = props;

  return (
    <BidSnapshot
      bidStatus={BidStatusEnum.Winning}
      lotStatus={lotStatus}
      currentBid={currentBid}
      lotCloseDate={lotStatus === LotStatus.ready ? undefined : lotCloseDate}
      soldPrice={soldPrice}
      {...rest}
    >
      <BidMessage message="Currently Winning" />
    </BidSnapshot>
  );
};

CurrentlyWinning.args = {
  currency: '$',
  numberOfBids: 5,
  lotStatus: LotStatus.live,
  currentBid: 2500,
  lotCloseDate: addMinutes(new Date(), 15),
  saleCloseDate: addMinutes(new Date(), 30),
  lang: enUS,
  startingBid: 1000,
};

export const Outbid = (props: BidSnapshotProps) => {
  const { lotStatus, lotCloseDate, currentBid, soldPrice, ...rest } = props;

  return (
    <BidSnapshot
      bidStatus={BidStatusEnum.Losing}
      lotStatus={lotStatus}
      currentBid={currentBid}
      lotCloseDate={lotStatus === LotStatus.ready ? undefined : lotCloseDate}
      soldPrice={soldPrice}
      {...rest}
    >
      <BidMessage variant={BidMessageVariants.negative} message="You've been outbid" />
    </BidSnapshot>
  );
};

Outbid.args = {
  currency: '$',
  numberOfBids: 8,
  lotStatus: LotStatus.live,
  currentBid: 3200,
  lotCloseDate: addMinutes(new Date(), 8),
  saleCloseDate: addMinutes(new Date(), 25),
  lang: enUS,
  startingBid: 1000,
};

export const WonBid = (props: BidSnapshotProps) => {
  const { lotStatus, currentBid, soldPrice, ...rest } = props;

  return (
    <BidSnapshot
      bidStatus={BidStatusEnum.Won}
      lotStatus={lotStatus}
      currentBid={currentBid}
      soldPrice={soldPrice}
      {...rest}
    >
      <BidMessage message="You won this lot!" />
    </BidSnapshot>
  );
};

WonBid.args = {
  currency: '$',
  numberOfBids: 12,
  lotStatus: LotStatus.past,
  currentBid: 4500,
  soldPrice: 4500,
  lang: enUS,
  startingBid: 1000,
};

export const LostBid = (props: BidSnapshotProps) => {
  const { lotStatus, currentBid, soldPrice, ...rest } = props;

  return (
    <BidSnapshot
      bidStatus={BidStatusEnum.Lost}
      lotStatus={lotStatus}
      currentBid={currentBid}
      soldPrice={soldPrice}
      {...rest}
    >
      <BidMessage variant={BidMessageVariants.negative} message="Lot sold to another bidder" />
    </BidSnapshot>
  );
};

LostBid.args = {
  currency: '$',
  numberOfBids: 15,
  lotStatus: LotStatus.past,
  currentBid: 3800,
  soldPrice: 4200,
  lang: enUS,
  startingBid: 1000,
};
