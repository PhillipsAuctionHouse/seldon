import { render, screen } from '@testing-library/react';
import { ProgressBar } from './index';

describe('ProgressBar', () => {
  it('renders lot progress text', () => {
    render(<ProgressBar currentLot={8} totalLots={110} />);
    expect(screen.getByText('Lot 8/110')).toBeInTheDocument();
  });

  it('has accessible progressbar attributes', () => {
    render(<ProgressBar currentLot={8} totalLots={110} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '8');
  });
});
