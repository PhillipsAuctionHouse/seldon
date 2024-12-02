import BidSnapshot from './BidSnapshot';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';
import { AuctionStatus } from '../../types/commonTypes';
import { BidStatusEnum } from './types';
import BidMessage from './BidMessage';

describe('BidSnapshot', () => {
  runCommonTests(BidSnapshot, 'BidSnapshot');

  it('renders starting bid when the auction is ready', () => {
    render(<BidSnapshot startingBid={100} auctionStatus={AuctionStatus.ready} />);
    expect(screen.getByText('Starting bid')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('renders starting bid if no bids placed', () => {
    render(<BidSnapshot startingBid={100} auctionStatus={AuctionStatus.live} />);
    expect(screen.getByText('Starting bid')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('does not render starting bid if lot did not sell', () => {
    render(<BidSnapshot startingBid={100} auctionStatus={AuctionStatus.past} />);
    expect(screen.queryByText('Starting bid')).not.toBeInTheDocument();
    expect(screen.queryByText('$100')).not.toBeInTheDocument();
  });

  it('renders current bid when there are multiple bids and auction is not past', () => {
    render(<BidSnapshot startingBid={100} numberOfBids={3} auctionStatus={AuctionStatus.live} currentBid={300} />);
    expect(screen.getByText('Current bid')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('(3 bids)')).toBeInTheDocument();
  });

  it('renders won for when auction is past and active bid is the last bid', () => {
    render(
      <BidSnapshot
        startingBid={100}
        soldPrice={300}
        numberOfBids={3}
        auctionStatus={AuctionStatus.past}
        bidStatus={BidStatusEnum.Won}
      >
        <BidMessage message="You won" />
      </BidSnapshot>,
    );
    expect(screen.getByText('Won for')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('You won')).toBeInTheDocument();
  });

  it('does not render bid message if user has not bid', () => {
    render(
      <BidSnapshot startingBid={100} soldPrice={300} numberOfBids={3} auctionStatus={AuctionStatus.past}>
        <BidMessage message="You won" />
      </BidSnapshot>,
    );
    expect(screen.queryByText('Won for')).not.toBeInTheDocument();
    expect(screen.getByText('Sold for')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.queryByText('You won')).not.toBeInTheDocument();
  });

  it('renders won for instead of sold for when auction is past user lost', () => {
    render(
      <BidSnapshot
        startingBid={100}
        numberOfBids={3}
        currentBid={300}
        soldPrice={300}
        auctionStatus={AuctionStatus.past}
        bidStatus={BidStatusEnum.Lost}
      >
        <BidMessage message="You lost"></BidMessage>
      </BidSnapshot>,
    );
    expect(screen.getByText('Won for')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('You lost')).toBeInTheDocument();
  });

  it('does not render sold for if soldPrice not passed, used if auction should hide sold price', () => {
    render(
      <BidSnapshot
        startingBid={100}
        currentBid={500}
        numberOfBids={3}
        auctionStatus={AuctionStatus.past}
        bidStatus={BidStatusEnum.Lost}
      >
        <BidMessage message="You won" />
      </BidSnapshot>,
    );
    expect(screen.queryByText('Sold for')).not.toBeInTheDocument();
    expect(screen.queryByText('$500')).not.toBeInTheDocument();
    expect(screen.getByText('You won')).toBeInTheDocument();
  });

  it('renders Countdown timer when lotCloseDate prop is passed', () => {
    const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now
    render(
      <BidSnapshot startingBid={100} numberOfBids={1} auctionStatus={AuctionStatus.live} lotCloseDate={lotCloseDate} />,
    );
    expect(screen.getByText('Closes in')).toBeInTheDocument();
  });
});
