import { render, screen } from '@testing-library/react';
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

  it('forwards estimateLabel and menuAriaLabel to the popover card', async () => {
    const user = userEvent.setup();
    render(
      <ProgressBar
        currentLot={12}
        totalLots={20}
        lotObjects={[{ ...sampleLot }]}
        estimateLabel="Estimation"
        menuAriaLabel="Menu du lot"
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Lot 12, Test work' }));
    expect(await screen.findByText('Estimation')).toBeInTheDocument();
    expect(screen.getByLabelText('Menu du lot')).toBeInTheDocument();
  });
});
