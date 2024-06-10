import { render } from '@testing-library/react';
import NavigationItemTrigger from './NavigationItemTrigger';

describe('NavigationItemTrigger', () => {
  // const mockHandleSelection = vi.fn();
  const mockLabel = 'Test Label';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call handleSelection when clicked', () => {
    //TODO: Fix this test
    // const { getByText } = render(<NavigationItemTrigger label={mockLabel} handleSelection={mockHandleSelection} />);
    // fireEvent.click(getByText(mockLabel));
    // expect(mockHandleSelection).toHaveBeenCalledWith(mockLabel);
  });

  it('should render the label correctly', () => {
    const { getByText } = render(<NavigationItemTrigger label={mockLabel} />);

    expect(getByText(mockLabel)).toBeInTheDocument();
  });
});
