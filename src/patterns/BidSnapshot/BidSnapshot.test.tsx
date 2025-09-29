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

  it.each([
    { lotStatus: LotStatus.ready, label: 'Starting bid', amount: '$100' },
    { lotStatus: LotStatus.live, label: 'Starting bid', amount: '$100' },
  ])('renders starting bid for lotStatus $lotStatus', ({ lotStatus, label, amount }) => {
    render(<BidSnapshot startingBid={100} lotStatus={lotStatus} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(amount)).toBeInTheDocument();
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

  it.each([
    {
      bidStatus: BidStatusEnum.Won,
      soldPrice: 300,
      label: 'Won for',
      message: 'You won',
      shouldShow: true,
    },
    {
      bidStatus: BidStatusEnum.Lost,
      soldPrice: 300,
      label: 'Sold for',
      message: 'You lost',
      shouldShow: true,
    },
  ])(
    'renders $label and message when auction is past and bidStatus is $bidStatus',
    ({ bidStatus, soldPrice, label, message }) => {
      render(
        <BidSnapshot
          startingBid={100}
          soldPrice={soldPrice}
          numberOfBids={3}
          lotStatus={LotStatus.past}
          bidStatus={bidStatus}
        >
          <BidMessage message={message} />
        </BidSnapshot>,
      );
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(`$${soldPrice}`)).toBeInTheDocument();
      expect(screen.getByText(message)).toBeInTheDocument();
    },
  );

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

  it.each([
    {
      bidStatus: BidStatusEnum.Won,
      label: 'Won',
      message: 'You won',
      soldForText: undefined,
      wonForText: 'Won',
    },
    {
      bidStatus: BidStatusEnum.Lost,
      label: 'Sold',
      message: 'You lost',
      soldForText: 'Sold',
      wonForText: undefined,
    },
  ])(
    'does not render soldPrice if not passed, user $label',
    ({ bidStatus, label, message, soldForText, wonForText }) => {
      render(
        <BidSnapshot
          startingBid={100}
          currentBid={500}
          numberOfBids={3}
          lotStatus={LotStatus.past}
          bidStatus={bidStatus}
          soldForText={soldForText}
          wonForText={wonForText}
        >
          <BidMessage message={message} />
        </BidSnapshot>,
      );
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.queryByText('$500')).not.toBeInTheDocument();
      expect(screen.getByText(message)).toBeInTheDocument();
    },
  );

  describe('countdown timer', () => {
    it.each([
      {
        lotStatus: LotStatus.live,
        saleCloseDate: saleCloseDate,
        shouldShow: true,
        desc: 'renders Countdown timer when lotCloseDate prop is passed',
      },
      {
        lotStatus: LotStatus.ready,
        saleCloseDate: saleCloseDate,
        shouldShow: false,
        desc: 'does not render Countdown timer if lot not started',
      },
      {
        lotStatus: LotStatus.past,
        saleCloseDate: saleCloseDate,
        shouldShow: false,
        desc: 'does not render Countdown timer if lot closed',
      },
      {
        lotStatus: LotStatus.live,
        saleCloseDate: addMinutes(new Date(), 55),
        shouldShow: true,
        desc: 'renders Countdown timer if sale close date is in the next hour',
      },
      {
        lotStatus: LotStatus.live,
        saleCloseDate: subHours(new Date(), 6),
        shouldShow: true,
        desc: 'renders Countdown timer if sale close date in the past',
      },
      {
        lotStatus: LotStatus.live,
        saleCloseDate: addDays(new Date(), 5),
        shouldShow: false,
        desc: 'does not render Countdown timer if sale close date is far in the future',
      },
    ])('$desc', ({ lotStatus, saleCloseDate, shouldShow }) => {
      const lotCloseDate = new Date(Date.now() + 10000);
      render(
        <BidSnapshot
          startingBid={100}
          numberOfBids={1}
          lotStatus={lotStatus}
          lotCloseDate={lotCloseDate}
          saleCloseDate={saleCloseDate}
        />,
      );
      if (shouldShow) {
        expect(screen.getByText('Closes in')).toBeInTheDocument();
      } else {
        expect(screen.queryByText('Closes in')).not.toBeInTheDocument();
      }
    });

    it('render sold price if status is past and sold price present', () => {
      render(<BidSnapshot startingBid={100} soldPrice={300} lotStatus={LotStatus.past} numberOfBids={0} />);
      expect(screen.getByText('Sold for')).toBeInTheDocument();
      expect(screen.getByText('$300')).toBeInTheDocument();
    });
  });
});
