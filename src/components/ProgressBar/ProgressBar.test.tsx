import { render, screen } from '@testing-library/react';
import { ProgressBar } from './index';

describe('ProgressBar', () => {
  it('renders lot progress text', () => {
    render(<ProgressBar currentLot={8} totalLots={110} />);
    expect(screen.getByText('8/110')).toBeInTheDocument();
  });
});
