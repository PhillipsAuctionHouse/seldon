import BidSnapshot from './BidSnapshot';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';
import { LotStatus } from '../../types/commonTypes';
import { BidStatusEnum } from './types';

describe('BidSnapshot', () => {
  runCommonTests(BidSnapshot, 'BidSnapshot');

  it('renders starting bid when there is only one bid and auction is not past', () => {
    render(<BidSnapshot startingBid={100} lotStatus={LotStatus.ready} />);
    expect(screen.getByText('Starting bid')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('renders current bid when there are multiple bids and auction is not past', () => {
    render(<BidSnapshot startingBid={100} numberOfBids={3} lotStatus={LotStatus.live} currentBid={300} />);
    expect(screen.getByText('Current bid')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('(3 bids)')).toBeInTheDocument();
  });

  it('renders won for when auction is past and active bid is the last bid', () => {
    render(
      <BidSnapshot
        startingBid={100}
        currentBid={300}
        numberOfBids={3}
        lotStatus={LotStatus.past}
        bidStatus={BidStatusEnum.Won}
      />,
    );
    expect(screen.getByText('Won for')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  it('renders sold for when auction is past and active bid is not the last bid', () => {
    render(
      <BidSnapshot
        startingBid={100}
        numberOfBids={3}
        currentBid={300}
        lotStatus={LotStatus.past}
        bidStatus={BidStatusEnum.Lost}
      />,
    );
    expect(screen.getByText('Sold for')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  it('renders Countdown timer when lotCloseDate prop is passed', () => {
    const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now
    render(<BidSnapshot startingBid={100} numberOfBids={1} lotStatus={LotStatus.live} lotCloseDate={lotCloseDate} />);
    expect(screen.getByText('Closes in')).toBeInTheDocument();
  });
});
