import AuctionTile from './AuctionTile';
import { runCommonTests } from '../../utils/testUtils';
import { render } from '@testing-library/react';

describe('AuctionTile', () => {
  runCommonTests(AuctionTile, 'AuctionTile');

  it('should render the AuctionTile component', () => {
    const { getByText } = render(
      <AuctionTile
        auctionImageHref="https://example.com/image.jpg"
        auctionType="Live Auction"
        auctionTitle="Modern & Contemporary Art Day Sale, Morning Session"
        auctionDate="18 Aug"
        auctionLocation="New York"
      />,
    );
    expect(getByText('Live Auction')).toBeInTheDocument();
    expect(getByText('Modern & Contemporary Art Day Sale, Morning Session')).toBeInTheDocument();
    expect(getByText('18 Aug')).toBeInTheDocument();
    expect(getByText('New York')).toBeInTheDocument();
  });
});
