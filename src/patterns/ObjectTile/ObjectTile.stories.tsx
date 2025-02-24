import { Meta } from '@storybook/react';
import { addMinutes } from 'date-fns';

import ObjectTile from './ObjectTile';
import { LotStatus } from '../../types/commonTypes';
import { BidMessage, BidSnapshot, BidStatusEnum } from '../BidSnapshot';
import { Favorite, MagificentSeven } from '../../assets/icons';

import { ComponentProps } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/ObjectTile',
  component: ObjectTile,
} satisfies Meta<typeof ObjectTile>;

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const args = {
  badgeText: 'No Reserve',
  badgeElement: () => <MagificentSeven />,
  favoriteElement: () => <Favorite />,
  estimate: '$1,500,000 - $3,000,000',
  element: 'span',
  children: (
    <>
      <BidSnapshot
        startingBid={50000}
        bidStatus={BidStatusEnum.Winning}
        lotStatus={LotStatus.live}
        numberOfBids={2}
        lotCloseDate={addMinutes(new Date(), 20)}
        saleCloseDate={addMinutes(new Date(), 20)}
        currentBid={1000000}
      >
        <BidMessage message="With You" />
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

export const NoImage = (props: ComponentProps<typeof ObjectTile>) => <ObjectTile {...props} imageUrl={undefined} />;
NoImage.args = args;
export const Playground = (props: ComponentProps<typeof ObjectTile>) => <ObjectTile {...props} />;
Playground.args = args;
Playground.argTypes = {};
