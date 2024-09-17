import { screen, render } from '@testing-library/react';
import NavigationItemTrigger from './NavigationItemTrigger';

describe('NavigationItemTrigger', () => {
  // const mockHandleSelection = vi.fn();
  const mockLabel = 'Test Label';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the label correctly', () => {
    render(<NavigationItemTrigger data-testid={`nav-trigger`} label={mockLabel} />);

    expect(screen.queryByTestId(/nav-trigger/)).toBeInTheDocument();
    expect(screen.queryByTestId(/nav-trigger/)?.textContent).toEqual(mockLabel);
  });
});
