import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AuctionCard from './AuctionCard';

describe('AuctionCard', () => {
  it('renders the sale type, title, location, date/time, and CTAs', () => {
    render(
      <AuctionCard
        saleTypeLabel="Live Auction"
        title="Modernism: Editions & Works on Paper"
        location="New York"
        date="Begins 22 April"
        time="12pm ET 2026"
        primaryCta={{ label: 'Browse', href: '/browse' }}
        secondaryCta={{ label: 'Register to bid', href: '/register' }}
      />,
    );
    expect(screen.getByText('Live Auction')).toBeInTheDocument();
    expect(screen.getByText('Modernism: Editions & Works on Paper')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Begins 22 April 12pm ET 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse' })).toHaveAttribute('href', '/browse');
    expect(screen.getByRole('link', { name: 'Register to bid' })).toHaveAttribute('href', '/register');
  });

  it('omits optional fields gracefully', () => {
    render(<AuctionCard title="Only title" />);
    expect(screen.getByText('Only title')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
