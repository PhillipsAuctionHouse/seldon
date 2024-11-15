import { Meta } from '@storybook/react';
import { addMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';

import BidSnapshot, { BidSnapshotProps } from './BidSnapshot';
import { AuctionStatus } from '../../types/commonTypes';

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
  console.log('Story Number of Bids', props.activeBid, props?.bids?.[props.bids.length - 1]);
  return (
    <BidSnapshot {...props} bids={props.auctionStatus === 'READY' ? ['$600'] : props.bids}>
      {props.activeBid === props?.bids?.[props.bids.length - 1] && props.auctionStatus === AuctionStatus.live ? (
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
          <span style={{ fontSize: '6px' }}>🟢</span> With You
        </p>
      ) : props.activeBid === props?.bids?.[props.bids.length - 1] && props.auctionStatus === AuctionStatus.past ? (
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
          <span style={{ fontSize: '6px' }}>🟢</span> Winning Bid not including Buyer Premium
        </p>
      ) : null}
    </BidSnapshot>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  activeBid: '$1,000',
  auctionStatus: AuctionStatus.live,
  bids: ['$600', '$800', '$1,000'],
  lotCloseDate: addMinutes(new Date(), 20),
  lang: enUS,
};

Playground.argTypes = {};
