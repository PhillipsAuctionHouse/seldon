import { render, screen } from '@testing-library/react';
import BidMessage from './BidMessage';
import { BidMessageVariants } from './types';

describe('BidMessage', () => {
  it('renders positive icon when variant is positive', () => {
    render(<BidMessage message="Positive message" variant={BidMessageVariants.positive} />);
    expect(screen.getByText('Positive message')).toBeInTheDocument();
    expect(screen.getByTestId('bid-message').innerHTML).toContain('<svg');
  });

  it('renders negative icon when variant is negative', () => {
    render(<BidMessage message="Negative message" variant={BidMessageVariants.negative} />);
    expect(screen.getByText('Negative message')).toBeInTheDocument();
    expect(screen.getByTestId('bid-message').innerHTML).toContain('<svg');
  });

  it('does not render icon when hasIcon is false', () => {
    render(<BidMessage message="No icon message" hasIcon={false} />);
    expect(screen.getByText('No icon message')).toBeInTheDocument();
    expect(screen.getByTestId('bid-message').innerHTML).not.toContain('<svg');
  });
});
