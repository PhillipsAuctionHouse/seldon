import { Meta } from '@storybook/react';
import { addMinutes } from 'date-fns';

import ObjectTile, { ObjectTileProps } from './ObjectTile';
import { BidSnapshot } from '../BidSnapshot';
import { AuctionStatus } from '../../types/commonTypes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/ObjectTile',
  component: ObjectTile,
} satisfies Meta<typeof ObjectTile>;

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const args = {
  badgeText: 'No Reserve',
  estimate: '$1,500,000 - $3,000,000',
  children: (
    <>
      <BidSnapshot
        activeBid="$65,000"
        auctionStatus={AuctionStatus.live}
        bids={['$50,000', '$65,000']}
        lotCloseDate={addMinutes(new Date(), 20)}
      >
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
          <span style={{ fontSize: '6px' }}>🟢</span> With You
        </p>
      </BidSnapshot>
    </>
  ),
  href: '/?path=/story/patterns-objecttile--playground',
  imageUrl: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
  lotNumber: '1',
  makerText: 'Koichi Sato',
  titleText: 'Beauty On The Duty',
  referenceNumber: 'Ref. 1728494-c',
  modelText: 'Nautilus',
};

export const NoImage = (props: ObjectTileProps) => <ObjectTile {...props} imageUrl={undefined} />;
NoImage.args = args;
export const Playground = (props: ObjectTileProps) => <ObjectTile {...props} />;
Playground.args = args;
Playground.argTypes = {};
