import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProgressBar } from './index';

const sampleLot = {
  lotNumber: 12,
  lotTitle: 'Test work',
  lotArtist: 'Artist',
  estimate: '$100',
  type: 'upcoming' as const,
};

describe('ProgressBar', () => {
  it('renders lot progress text', () => {
    render(<ProgressBar currentLot={8} totalLots={110} />);
    expect(screen.getByText('8/110')).toBeInTheDocument();
  });

  it('uses custom progress aria-label when provided', () => {
    render(<ProgressBar currentLot={2} totalLots={10} progressAriaLabel="Auction progress" />);
    expect(screen.getByRole('progressbar', { name: 'Auction progress' })).toBeInTheDocument();
  });

  it('shows custom popover status labels when a lot marker popover is opened', async () => {
    const user = userEvent.setup();
    render(
      <ProgressBar
        currentLot={12}
        totalLots={20}
        lotObjects={[{ ...sampleLot }]}
        labels={{
          statusCurrentLot: 'Lot actuel',
          statusUpcoming: 'À venir',
          lotsAwayAdvanceBidCurrent: 'En cours',
        }}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Lot 12, Test work' }));
    expect(await screen.findByText('Lot actuel')).toBeInTheDocument();
  });

  it('uses default advance bid copy when the parent passes an empty string', async () => {
    const user = userEvent.setup();
    render(
      <ProgressBar
        currentLot={1}
        totalLots={120}
        advanceBidLabel=""
        lotObjects={[
          {
            lotNumber: 108,
            lotTitle: 'Night Orchard',
            lotArtist: 'Jonas Reed',
            estimate: '$9,000 - $13,000',
            type: 'upcoming',
            advBid: '$11,250',
            imageSrc: '/x.jpg',
          },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Lot 108, Night Orchard' }));
    expect(await screen.findByText('Advance bid')).toBeInTheDocument();
    expect(screen.getByText('$11,250')).toBeInTheDocument();
  });

  it('shows advance bid label and amount on the current lot popover', async () => {
    const user = userEvent.setup();
    render(<ProgressBar currentLot={12} totalLots={20} lotObjects={[{ ...sampleLot, advBid: '$500' }]} />);
    await user.click(screen.getByRole('button', { name: 'Lot 12, Test work' }));
    expect(await screen.findByText('Advance bid')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  it('shows hover preview copy near pointer position on track', () => {
    render(<ProgressBar currentLot={40} totalLots={80} />);
    const track = screen.getByText('40/80').closest('.seldon-progress-bar__track');
    expect(track).not.toBeNull();
    if (!track) {
      return;
    }

    Object.defineProperty(track, 'getBoundingClientRect', {
      value: () => ({
        width: 200,
        left: 10,
        right: 210,
        top: 0,
        bottom: 0,
        height: 0,
        x: 10,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    fireEvent.mouseMove(track, { clientX: 110 });
    expect(screen.getByText('Live lot 40 of 80')).toBeInTheDocument();
  });

  it('supports overriding hover preview copy via labels', () => {
    render(
      <ProgressBar currentLot={40} totalLots={80} labels={{ hoverLiveLot: 'Lot en direct {current} sur {total}' }} />,
    );
    const track = screen.getByText('40/80').closest('.seldon-progress-bar__track');
    expect(track).not.toBeNull();
    if (!track) {
      return;
    }

    Object.defineProperty(track, 'getBoundingClientRect', {
      value: () => ({
        width: 200,
        left: 10,
        right: 210,
        top: 0,
        bottom: 0,
        height: 0,
        x: 10,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    fireEvent.mouseMove(track, { clientX: 110 });
    expect(screen.getByText('Lot en direct 40 sur 80')).toBeInTheDocument();
  });

  it('shows dot lot number in hover preview when hovering a marker', () => {
    render(
      <ProgressBar
        currentLot={1}
        totalLots={120}
        lotObjects={[
          {
            lotNumber: 50,
            lotTitle: 'Marker lot',
            lotArtist: 'Artist',
            estimate: '$100',
            type: 'upcoming',
          },
        ]}
      />,
    );
    const button = screen.getByRole('button', { name: 'Lot 50, Marker lot' });
    // ensure we use dot center within track bounds
    fireEvent.mouseEnter(button);
    expect(screen.getByText('Live lot 50 of 120')).toBeInTheDocument();
  });
});
