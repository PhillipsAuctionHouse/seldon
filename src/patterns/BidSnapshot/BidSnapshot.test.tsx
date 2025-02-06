import BidSnapshot from './BidSnapshot';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';
import { LotStatus } from '../../types/commonTypes';
import { BidStatusEnum } from './types';
import BidMessage from './BidMessage';
import { addDays, addMinutes, subHours } from 'date-fns';

const saleCloseDate = addMinutes(new Date(), 50);

describe('BidSnapshot', () => {
  runCommonTests(BidSnapshot, 'BidSnapshot');

  it('renders starting bid when there is only one bid and auction is not past', () => {
    render(<BidSnapshot startingBid={100} lotStatus={LotStatus.ready} />);
    expect(screen.getByText('Starting bid')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('renders starting bid if no bids placed', () => {
    render(<BidSnapshot startingBid={100} lotStatus={LotStatus.live} />);
    expect(screen.getByText('Starting bid')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('does not render starting bid if lot did not sell', () => {
    render(<BidSnapshot startingBid={100} lotStatus={LotStatus.past} />);
    expect(screen.queryByText('Starting bid')).not.toBeInTheDocument();
    expect(screen.queryByText('$100')).not.toBeInTheDocument();
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
        soldPrice={300}
        numberOfBids={3}
        lotStatus={LotStatus.past}
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
      <BidSnapshot startingBid={100} soldPrice={300} numberOfBids={3} lotStatus={LotStatus.past}>
        <BidMessage message="You won" />
      </BidSnapshot>,
    );
    expect(screen.queryByText('Won for')).not.toBeInTheDocument();
    expect(screen.getByText('Sold for')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.queryByText('You won')).not.toBeInTheDocument();
  });

  it('renders sold for when auction is past and user lost', () => {
    render(
      <BidSnapshot
        startingBid={100}
        numberOfBids={3}
        currentBid={300}
        soldPrice={300}
        lotStatus={LotStatus.past}
        bidStatus={BidStatusEnum.Lost}
      >
        <BidMessage message="You lost"></BidMessage>
      </BidSnapshot>,
    );
    expect(screen.getByText('Sold for')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('You lost')).toBeInTheDocument();
  });

  it('renders winning for if in progress', () => {
    render(
      <BidSnapshot
        startingBid={100}
        numberOfBids={3}
        currentBid={300}
        lotStatus={LotStatus.live}
        bidStatus={BidStatusEnum.Lost}
      >
        <BidMessage message="Winning for"></BidMessage>
      </BidSnapshot>,
    );
    expect(screen.getByText('Winning for')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  it('does not render sold for if soldPrice not passed, used if auction should hide sold price', () => {
    render(
      <BidSnapshot
        startingBid={100}
        currentBid={500}
        numberOfBids={3}
        lotStatus={LotStatus.past}
        bidStatus={BidStatusEnum.Lost}
      >
        <BidMessage message="You won" />
      </BidSnapshot>,
    );
    expect(screen.queryByText('Sold for')).not.toBeInTheDocument();
    expect(screen.queryByText('$500')).not.toBeInTheDocument();
    expect(screen.getByText('You won')).toBeInTheDocument();
  });

  describe('countdown timer', () => {
    it('renders Countdown timer when lotCloseDate prop is passed', () => {
      const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now

      render(
        <BidSnapshot
          startingBid={100}
          numberOfBids={1}
          lotStatus={LotStatus.live}
          lotCloseDate={lotCloseDate}
          saleCloseDate={saleCloseDate}
        />,
      );
      expect(screen.getByText('Closes in')).toBeInTheDocument();
    });

    it('does not render Countdown timer if lot not started', () => {
      const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now
      render(
        <BidSnapshot
          startingBid={100}
          numberOfBids={1}
          lotStatus={LotStatus.ready}
          lotCloseDate={lotCloseDate}
          saleCloseDate={saleCloseDate}
        />,
      );
      expect(screen.queryByText('Closes in')).not.toBeInTheDocument();
    });

    it('does not render Countdown timer if lot closed', () => {
      const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now
      render(
        <BidSnapshot
          startingBid={100}
          numberOfBids={1}
          lotStatus={LotStatus.past}
          lotCloseDate={lotCloseDate}
          saleCloseDate={saleCloseDate}
        />,
      );
      expect(screen.queryByText('Closes in')).not.toBeInTheDocument();
    });

    it('renders Countdown timer if sale close date is in the next hour', () => {
      const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now

      render(
        <BidSnapshot
          startingBid={100}
          numberOfBids={1}
          lotStatus={LotStatus.live}
          lotCloseDate={lotCloseDate}
          saleCloseDate={addMinutes(new Date(), 55)}
        />,
      );
      expect(screen.getByText('Closes in')).toBeInTheDocument();
    });

    it('renders Countdown timer if sale close date in the past', () => {
      const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now

      render(
        <BidSnapshot
          startingBid={100}
          numberOfBids={1}
          lotStatus={LotStatus.live}
          lotCloseDate={lotCloseDate}
          saleCloseDate={subHours(new Date(), 6)}
        />,
      );
      expect(screen.getByText('Closes in')).toBeInTheDocument();
    });

    it('does not render Countdown timer if sale close date is far in the future', () => {
      const lotCloseDate = new Date(Date.now() + 10000); // 10 seconds from now
      render(
        <BidSnapshot
          startingBid={100}
          numberOfBids={1}
          lotStatus={LotStatus.live}
          lotCloseDate={lotCloseDate}
          saleCloseDate={addDays(new Date(), 5)}
        />,
      );
      expect(screen.queryByText('Closes in')).not.toBeInTheDocument();
    });
  });
});
