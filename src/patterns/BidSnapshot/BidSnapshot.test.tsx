import BidSnapshot from './BidSnapshot';
import { runCommonTests } from '../../utils/testUtils';
import { render } from '@testing-library/react';
import { AuctionStatus } from '../../types/commonTypes';

describe('BidSnapshot', () => {
  runCommonTests(BidSnapshot, 'BidSnapshot');

  it('renders starting bid when there is only one bid and auction is not past', () => {
    const { getByText } = render(<BidSnapshot startingBid={100} auctionStatus={AuctionStatus.ready} />);
    expect(getByText('Starting bid')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });

  it('renders current bid when there are multiple bids and auction is not past', () => {
    const { getByText } = render(<BidSnapshot startingBid={100} numberOfBids={3} auctionStatus={AuctionStatus.live} />);
    expect(getByText('Current bid')).toBeInTheDocument();
    expect(getByText('300')).toBeInTheDocument();
    expect(getByText('(3 bids)')).toBeInTheDocument();
  });

  it('renders won for when auction is past and active bid is the last bid', () => {
    const { getByText } = render(
      <BidSnapshot startingBid={100} numberOfBids={3} auctionStatus={AuctionStatus.past} activeBid={300} />,
    );
    expect(getByText('Won for')).toBeInTheDocument();
    expect(getByText('300')).toBeInTheDocument();
  });

  it('renders sold for when auction is past and active bid is not the last bid', () => {
    const { getByText } = render(
      <BidSnapshot startingBid={100} numberOfBids={3} auctionStatus={AuctionStatus.past} activeBid={200} />,
    );
    expect(getByText('Sold for')).toBeInTheDocument();
    expect(getByText('300')).toBeInTheDocument();
  });

  it('renders Countdown timer when lotCloseDate prop is passed', () => {
    const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now
    const { getByText } = render(
      <BidSnapshot startingBid={100} numberOfBids={1} auctionStatus={AuctionStatus.live} lotCloseDate={lotCloseDate} />,
    );
    expect(getByText('Closes in')).toBeInTheDocument();
  });
});
