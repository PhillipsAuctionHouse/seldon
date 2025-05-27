import AuctionTile from './AuctionTile';
import { runCommonTests } from '../../utils/testUtils';
import { render } from '@testing-library/react';

describe('AuctionTile', () => {
  runCommonTests(AuctionTile, 'AuctionTile');

  const props = {
    imageSrc: 'https://example.com/image.jpg',
    type: 'Live Auction',
    title: 'Modern & Contemporary Art Day Sale, Morning Session',
    date: '18 Aug',
    location: 'New York',
  };

  it('should render the AuctionTile component', () => {
    const { getByText } = render(<AuctionTile {...props} />);
    expect(getByText('Live Auction')).toBeInTheDocument();
    expect(getByText('Modern & Contemporary Art Day Sale, Morning Session')).toBeInTheDocument();
    expect(getByText('18 Aug')).toBeInTheDocument();
    expect(getByText('New York')).toBeInTheDocument();
  });

  it('should allow custom image alt text', () => {
    const { getByAltText } = render(<AuctionTile {...props} imageAlt="Custom Alt Text" />);

    expect(getByAltText('Custom Alt Text')).toBeInTheDocument();
  });
});
