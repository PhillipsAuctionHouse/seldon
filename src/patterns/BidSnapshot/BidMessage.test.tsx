import { render } from '@testing-library/react';
import BidMessage from './BidMessage';
import { BidMessageVariants } from './types';

describe('BidMessage', () => {
  it('renders positive icon when variant is positive', () => {
    const { getByText } = render(<BidMessage message="Positive message" variant={BidMessageVariants.positive} />);
    expect(getByText('🟢')).toBeInTheDocument();
  });

  it('renders negative icon when variant is negative', () => {
    const { getByText } = render(<BidMessage message="Negative message" variant={BidMessageVariants.negative} />);
    expect(getByText('🔴')).toBeInTheDocument();
  });

  it('does not render icon when hasIcon is false', () => {
    const { queryByText } = render(<BidMessage message="No icon message" hasIcon={false} />);
    expect(queryByText('🟢')).not.toBeInTheDocument();
    expect(queryByText('🔴')).not.toBeInTheDocument();
  });
});