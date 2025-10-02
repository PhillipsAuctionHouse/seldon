import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SaleHeaderBanner, { SaleHeaderBannerProps } from './SaleHeaderBanner';
import { AuctionStatus } from '../../types/commonTypes';
import SaleHeaderBrowseAuctions from './SaleHeaderBrowseAuctions';
import { addDays } from 'date-fns';
import Button from '../../components/Button/Button';

const defaultProps: SaleHeaderBannerProps = {
  auctionTitle: 'Sample Auction',
  headerLabel: 'Auction',
  location: 'New York',
  occurrenceInformation: [{ date: '2023-12-01', occurrenceLabel: 'Auction Date' }],
  auctionState: AuctionStatus.ready,
  imageSrcUrl: 'https://example.com/image.jpg',
  showTimer: true,
};

describe('SaleHeaderBanner', () => {
  it('renders the auction title', () => {
    render(<SaleHeaderBanner {...defaultProps} />);
    expect(screen.getByText('Sample Auction')).toBeInTheDocument();
  });

  it('renders the location', () => {
    render(<SaleHeaderBanner {...defaultProps} />);
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('renders the date and occurrence label', () => {
    render(<SaleHeaderBanner {...defaultProps} />);
    expect(screen.getByText('Auction Date')).toBeInTheDocument();
    expect(screen.getByText('2023-12-01')).toBeInTheDocument();
  });

  it('renders the image with the correct src and alt attributes', () => {
    render(<SaleHeaderBanner {...defaultProps} />);
    const img = screen.getByAltText('Sample Auction');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders only the mobile countdown when SSRMediaQuery is mocked for mobile', () => {
    vi.mock('../../providers/SeldonProvider/utils', () => ({
      SSRMediaQuery: {
        Media: ({ lessThan, children }: { lessThan?: string; children: React.ReactNode }) =>
          lessThan === 'md' ? <>{children}</> : null,
      },
    }));

    render(
      <SaleHeaderBanner
        {...defaultProps}
        auctionState={AuctionStatus.live}
        auctionEndTime={addDays(new Date(), 2)}
        showTimer
      />,
    );
    const countdowns = screen.getAllByText('Lots Close in');
    expect(countdowns.length).toBe(1);
  });

  it('renders only the desktop countdown when SSRMediaQuery is mocked for desktop', () => {
    vi.mock('../../providers/SeldonProvider/utils', () => ({
      SSRMediaQuery: {
        Media: ({ greaterThanOrEqual, children }: { greaterThanOrEqual?: string; children: React.ReactNode }) =>
          greaterThanOrEqual === 'md' ? <>{children}</> : null,
      },
    }));

    render(
      <SaleHeaderBanner
        {...defaultProps}
        auctionState={AuctionStatus.live}
        auctionEndTime={addDays(new Date(), 2)}
        showTimer
      />,
    );
    const countdowns = screen.getAllByText('Lots Close in');
    expect(countdowns.length).toBe(1);
  });

  it('does NOT render the countdown timer when showTimer is false', () => {
    render(
      <SaleHeaderBanner
        {...defaultProps}
        auctionState={AuctionStatus.live}
        auctionEndTime={addDays(new Date(), 2)}
        showTimer={false}
      />,
    );

    expect(screen.queryByText('Lots Close in')).not.toBeInTheDocument();
  });

  it('renders the countdown timer with custom text when auction is open for bidding and there is an auctionEndTime', () => {
    render(
      <SaleHeaderBanner
        {...defaultProps}
        countdownTimerLabel="Lots Begin to close in"
        countdownFormatDuration={(duration) => `${duration}Translated`}
        auctionState={AuctionStatus.live}
        auctionEndTime={addDays(new Date(), 2)}
        showTimer
      />,
    );
    // The countdown component is rendered twice, once for mobile and once for desktop
    // Only one is shown at a time based on the screen size
    expect(screen.getAllByText('Lots Begin to close in').length).toBeGreaterThan(0);
    expect(screen.getAllByText('dayTranslated').length).toBeGreaterThan(0);
  });

  it('renders the "Browse Upcoming Sale" link when auction is closed', () => {
    render(
      <SaleHeaderBanner {...defaultProps} auctionState={AuctionStatus.past}>
        <SaleHeaderBrowseAuctions />
      </SaleHeaderBanner>,
    );
    expect(screen.getByText('Browse Upcoming Sale')).toBeInTheDocument();
    expect(screen.getByText('View Calendar')).toBeInTheDocument();
  });

  it('calls onClick handler when CTA button is clicked', () => {
    const handleClick = vi.fn();
    render(
      <SaleHeaderBanner {...defaultProps} onClick={handleClick}>
        <Button onClick={handleClick} />
        Register to Bid
      </SaleHeaderBanner>,
    );
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders children when auction is closed', () => {
    render(
      <SaleHeaderBanner {...defaultProps} auctionState={AuctionStatus.past}>
        <div>Child Component</div>
      </SaleHeaderBanner>,
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
