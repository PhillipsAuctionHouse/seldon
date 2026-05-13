import { fireEvent, render, screen } from '@testing-library/react';
import { ProgressBar } from './index';

describe('ProgressBar', () => {
  it('renders lot progress text', () => {
    render(<ProgressBar currentLot={8} totalLots={110} />);
    expect(screen.getByText('8/110')).toBeInTheDocument();
  });

  it('uses custom progress aria-label when provided', () => {
    render(<ProgressBar currentLot={2} totalLots={10} progressAriaLabel="Auction progress" />);
    expect(screen.getByRole('progressbar', { name: 'Auction progress' })).toBeInTheDocument();
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
});
