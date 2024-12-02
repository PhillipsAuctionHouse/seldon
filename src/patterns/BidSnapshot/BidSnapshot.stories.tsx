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
    lotStatus: { options: ['READY', 'LIVE', 'PAST'], control: { type: 'select' } },
  },
} satisfies Meta<typeof BidSnapshot>;

export default meta;
export const Playground = (props: BidSnapshotProps) => {
  const { bidStatus, lotStatus, lotCloseDate, currentBid, ...rest } = props;
  return (
    <BidSnapshot
      bidStatus={bidStatus}
      lotStatus={lotStatus}
      currentBid={currentBid}
      lotCloseDate={lotStatus === LotStatus.ready ? undefined : lotCloseDate}
      {...rest}
    >
      {bidStatus === BidStatusEnum.Winning ? <BidMessage message="With You" /> : null}
      {bidStatus === BidStatusEnum.Won ? <BidMessage message="Won bid" /> : null}
      {bidStatus === BidStatusEnum.Losing ? (
        <BidMessage variant={BidMessageVariants.negative} message="Losing Bid" />
      ) : null}
      {bidStatus === BidStatusEnum.Lost ? (
        <BidMessage variant={BidMessageVariants.negative} message="Lost Bid" />
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
  lang: enUS,
  startingBid: 600,
  soldPrice: 2000,
};

Playground.argTypes = {
  bidStatus: { options: BidStatusEnum, control: { type: 'select' } },
  auctionStatus: { options: LotStatus, control: { type: 'select' } },
};
