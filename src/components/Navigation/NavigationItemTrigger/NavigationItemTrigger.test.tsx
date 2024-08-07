import { render } from '@testing-library/react';
import NavigationItemTrigger from './NavigationItemTrigger';

describe('NavigationItemTrigger', () => {
  // const mockHandleSelection = vi.fn();
  const mockLabel = 'Test Label';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the label correctly', () => {
    const { getByText } = render(<NavigationItemTrigger label={mockLabel} />);

    expect(getByText(mockLabel)).toBeInTheDocument();
  });
});
