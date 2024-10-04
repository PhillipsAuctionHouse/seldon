import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SaleHeaderBanner, { SaleHeaderBannerProps } from './SaleHeaderBanner';
import { AuctionState } from './types';

const defaultProps: SaleHeaderBannerProps = {
  auctionTitle: 'Sample Auction',
  location: 'New York',
  date: '2023-12-01',
  occuranceLabel: 'Auction Date',
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

  it('renders the date and occurance label', () => {
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
    render(<SaleHeaderBanner {...defaultProps} auctionState={AuctionState.openForBidding} />);
    expect(screen.getByText('Lots Close in')).toBeInTheDocument();
  });

  it('renders the "Browse Upcoming Sale" link when auction is closed', () => {
    render(<SaleHeaderBanner {...defaultProps} auctionState={AuctionState.past} />);
    expect(screen.getByText('Browse Upcoming Sale')).toBeInTheDocument();
    expect(screen.getByText('View Calendar')).toBeInTheDocument();
  });
});
