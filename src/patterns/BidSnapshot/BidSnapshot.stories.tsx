import { Meta } from '@storybook/react';
import { addMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';

import BidSnapshot, { BidSnapshotProps } from './BidSnapshot';
import BidMessage from './BidMessage';
import { LotStatus } from '../../types/commonTypes';

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
  const { activeBid, lotStatus, lotCloseDate, currentBid, ...rest } = props;
  return (
    <BidSnapshot
      activeBid={activeBid}
      lotStatus={lotStatus}
      currentBid={currentBid}
      lotCloseDate={lotStatus === LotStatus.ready ? undefined : lotCloseDate}
      {...rest}
    >
      {activeBid === currentBid && lotStatus === LotStatus.live ? (
        <BidMessage message="With You" />
      ) : activeBid === currentBid && lotStatus === LotStatus.past ? (
        <BidMessage message="Winning Bid not including Buyer Premium" />
      ) : null}
    </BidSnapshot>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  activeBid: 1000,
  currency: '$',
  numberOfBids: 3,
  lotStatus: LotStatus.live,
  currentBid: 1000,
  lotCloseDate: addMinutes(new Date(), 20),
  lang: enUS,
  startingBid: 600,
};

Playground.argTypes = {};
