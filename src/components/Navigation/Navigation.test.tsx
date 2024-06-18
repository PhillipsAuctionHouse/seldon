import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation, { NavigationProps } from './Navigation';
import NavigationItemTrigger from './NavigationItemTrigger/NavigationItemTrigger';

describe('Navigation', () => {
  const defaultProps: NavigationProps = {
    id: 'phillips-nav',
    backBtnLabel: 'Back',
    visible: true,
  };
  const expandedItem = 'Auctions';

  it('renders without error', () => {
    render(<Navigation {...defaultProps} />);
  });

  it('renders with back button label', () => {
    const { getByTestId } = render(<Navigation {...defaultProps} />);
    expect(getByTestId('phillips-nav-back-btn')).toBeInTheDocument();
  });

  it('renders mobile menu with default value', () => {
    const { getByTestId } = render(<Navigation {...defaultProps} />);
    expect(getByTestId('phillips-nav-label')).toBeInTheDocument();
  });

  it('renders mobile menu with expanded item value', async () => {
    const { getByText, getByTestId } = render(
      <Navigation {...defaultProps}>
        <NavigationItemTrigger id="auctions" label="Auctions"></NavigationItemTrigger>
      </Navigation>,
    );
    await userEvent.click(getByTestId('nav-item-trigger-auctions'));
    expect(getByText(expandedItem)).toBeInTheDocument();
  });
});
