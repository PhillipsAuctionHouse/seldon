import { Meta } from '@storybook/react';
import AuctionTile, { AuctionTileProps } from './AuctionTile';
import { getScssVar } from '../../utils/scssUtils';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/AuctionTile',
  component: AuctionTile,
} satisfies Meta<typeof AuctionTile>;

export default meta;
export const Playground = (props: AuctionTileProps) => (
  <div style={{ width: '500px' }}>
    <AuctionTile {...props} />
  </div>
);

const defaultProps = {
  auctionImageHref: 'https://picsum.photos/160/160',
  auctionType: 'Live Auction',
  auctionTitle: 'Modern & Contemporary Art Day Sale, Morning Session',
  auctionDate: '18 Aug',
  auctionLocation: 'New York',
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = { ...defaultProps };

Playground.argTypes = {};

const divider = (
  <div
    style={{
      height: '1px',
      backgroundColor: getScssVar('$light-gray', '#ECEAE7'),
      width: '100%',
    }}
  />
);

export const MultipleAuctions = () => (
  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexDirection: 'column', width: '400px' }}>
    <AuctionTile {...defaultProps} />
    {divider}
    <AuctionTile
      {...defaultProps}
      auctionTitle="Modern & Contemporary Art Day Sale, Afternoon Session"
      auctionLocation="Hong Kong"
    />
    {divider}
    <AuctionTile
      {...defaultProps}
      auctionTitle="Modern & Contemporary: Online Auction, New York"
      auctionDate="27 Aug - 05 Sep"
    />
  </div>
);
