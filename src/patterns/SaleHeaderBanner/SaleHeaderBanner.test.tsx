import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SaleHeaderBanner, { SaleHeaderBannerProps } from './SaleHeaderBanner';
import { AuctionState } from './types';
import SaleHeaderBrowseAuctions from './SaleHeaderBrowseAuctions';
import { Countdown } from '../../components/Countdown';
import { addDays } from 'date-fns';

const defaultProps: SaleHeaderBannerProps = {
  auctionTitle: 'Sample Auction',
  location: 'New York',
  occurrenceInformation: [{ date: '2023-12-01', occurrenceLabel: 'Auction Date' }],
  auctionState: AuctionState.preSale,
  imageSrcUrl: 'https://example.com/image.jpg',
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

  it('renders the "Register to Bid" button when auction is not closed', () => {
    render(<SaleHeaderBanner {...defaultProps} />);
    expect(screen.getByText('Register to Bid')).toBeInTheDocument();
  });

  it('does not render the "Register to Bid" button when auction is closed', () => {
    render(<SaleHeaderBanner {...defaultProps} auctionState={AuctionState.past} />);
    expect(screen.queryByText('Register to Bid')).not.toBeInTheDocument();
  });

  it('renders the countdown timer when auction is open for bidding', () => {
    render(
      <SaleHeaderBanner {...defaultProps} auctionState={AuctionState.openForBidding}>
        <Countdown endDateTime={addDays(new Date(), 2)} />
      </SaleHeaderBanner>,
    );
    expect(screen.getByText('Lots Close in')).toBeInTheDocument();
  });

  it('renders the "Browse Upcoming Sale" link when auction is closed', () => {
    render(
      <SaleHeaderBanner {...defaultProps} auctionState={AuctionState.past}>
        <SaleHeaderBrowseAuctions />
      </SaleHeaderBanner>,
    );
    expect(screen.getByText('Browse Upcoming Sale')).toBeInTheDocument();
    expect(screen.getByText('View Calendar')).toBeInTheDocument();
  });

  it('renders custom CTA label when provided', () => {
    render(<SaleHeaderBanner {...defaultProps} ctaLabel="Join Now" />);
    expect(screen.getByText('Join Now')).toBeInTheDocument();
  });

  it('calls onClick handler when CTA button is clicked', () => {
    const handleClick = vi.fn();
    render(<SaleHeaderBanner {...defaultProps} onClick={handleClick} />);
    screen.getByText('Register to Bid').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders children when auction is open for bidding', () => {
    render(
      <SaleHeaderBanner {...defaultProps} auctionState={AuctionState.openForBidding}>
        <div>Child Component</div>
      </SaleHeaderBanner>,
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders children when auction is closed', () => {
    render(
      <SaleHeaderBanner {...defaultProps} auctionState={AuctionState.past}>
        <div>Child Component</div>
      </SaleHeaderBanner>,
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
