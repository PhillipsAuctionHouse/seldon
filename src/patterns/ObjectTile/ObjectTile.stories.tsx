import { Meta } from '@storybook/react';
import { addHours, addMinutes } from 'date-fns';

import ObjectTile from './ObjectTile';
import { LotStatus } from '../../types/commonTypes';
import { BidMessage, BidSnapshot, BidStatusEnum } from '../BidSnapshot';
import { ComponentProps } from 'react';
import { Icon } from '../../components/Icon';
import { DetailVariants } from '../../components/Detail/types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/ObjectTile',
  component: ObjectTile,
} satisfies Meta<typeof ObjectTile>;

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const args = {
  badgeText: 'No Reserve',
  badgeElement: () => <Icon icon="MagnificentSeven" width={150} height={24} />,
  favoriteElement: () => <Icon icon="FavoriteActive" />,
  estimate: '$1,500,000 - $3,000,000',
  element: 'span',
  children: (
    <>
      <BidSnapshot
        startingBid={50000}
        bidStatus={BidStatusEnum.Winning}
        lotStatus={LotStatus.live}
        numberOfBids={2}
        lotCloseDate={addHours(new Date(), 20)}
        saleCloseDate={addHours(new Date(), 20)}
        currentBid={1000000}
        variant={DetailVariants.sm}
      >
        <BidMessage message="With You" />
      </BidSnapshot>
    </>
  ),
  href: '/?path=/story/patterns-objecttile--playground',
  imageUrl: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
  lotNumber: '1',
  makerText: 'Koichi Sato',
  titleText: 'Beauty on the duty',
  referenceNumber: 'Ref. 1728494-c',
  modelText: 'Nautilus',
};

export const NoImage = (props: ComponentProps<typeof ObjectTile>) => <ObjectTile {...props} imageUrl={undefined} />;
NoImage.args = args;
export const Playground = (props: ComponentProps<typeof ObjectTile>) => <ObjectTile {...props} />;
Playground.args = args;
Playground.argTypes = {};

export const WithCountdownTimer = (props: ComponentProps<typeof ObjectTile>) => <ObjectTile {...props} />;
WithCountdownTimer.args = {
  ...args,
  children: (
    <>
      <BidSnapshot
        startingBid={50000}
        bidStatus={BidStatusEnum.Winning}
        lotStatus={LotStatus.live}
        numberOfBids={2}
        lotCloseDate={addMinutes(new Date(), 3)} // Lot closes in 3 minutes
        saleCloseDate={addMinutes(new Date(), 5)} // Sale closes in 5 minutes
        currentBid={1000000}
        variant={DetailVariants.sm}
      >
        <BidMessage message="With You" />
      </BidSnapshot>
    </>
  ),
};

export const SoldState = (props: ComponentProps<typeof ObjectTile>) => <ObjectTile {...props} />;
SoldState.args = {
  ...args,
  children: (
    <>
      <BidSnapshot
        startingBid={50000}
        bidStatus={BidStatusEnum.Won}
        lotStatus={LotStatus.past}
        numberOfBids={12}
        currentBid={2500000}
        soldPrice={2500000}
        variant={DetailVariants.sm}
      >
        <BidMessage message="You won this lot!" />
      </BidSnapshot>
    </>
  ),
};
