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
  <div>
    <AuctionTile {...props} />
  </div>
);

const defaultProps = {
  imageSrc: 'https://picsum.photos/160/90',
  type: 'Live Auction',
  title: 'Modern & Contemporary Art Day Sale, Morning Session',
  date: '18 Aug',
  location: 'New York',
  href: 'https://www.phillips.com/auction/HK080225',
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
  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexDirection: 'column' }}>
    <AuctionTile {...defaultProps} />
    {divider}
    <AuctionTile {...defaultProps} title="Modern & Contemporary Art Day Sale, Afternoon Session" location="Hong Kong" />
    {divider}
    <AuctionTile {...defaultProps} title="Modern & Contemporary: Online Auction, New York" date="27 Aug - 05 Sep" />
  </div>
);
