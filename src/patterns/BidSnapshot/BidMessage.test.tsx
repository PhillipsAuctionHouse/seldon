import { render, screen } from '@testing-library/react';
import BidMessage from './BidMessage';
import { BidMessageVariants } from './types';

describe('BidMessage', () => {
  [
    { variant: BidMessageVariants.positive, message: 'Come Meh Way', hasIcon: true },
    { variant: BidMessageVariants.negative, message: 'Confessions', hasIcon: true },
    { variant: undefined, message: 'Did You Know?', hasIcon: false },
  ].forEach(({ variant, message, hasIcon }) => {
    it(`renders ${hasIcon ? 'with' : 'without'} icon for variant ${variant ?? 'none'}`, () => {
      render(<BidMessage message={message} variant={variant} hasIcon={hasIcon} />);
      expect(screen.getByText(message)).toBeInTheDocument();
      const svg = screen.queryByTestId('bid-message')?.querySelector('svg');
      if (hasIcon) {
        expect(svg).toBeInTheDocument();
      } else {
        expect(svg).not.toBeInTheDocument();
      }
    });
  });
});
