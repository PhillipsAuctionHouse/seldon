import { fireEvent, render } from '@testing-library/react';
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
    const { getByText } = render(<Navigation {...defaultProps} />);
    expect(getByText('Back')).toBeInTheDocument();
  });

  it('renders mobile menu with default value', () => {
    const { getByText } = render(<Navigation {...defaultProps} />);
    expect(getByText('Main Menu')).toBeInTheDocument();
  });

  it('renders mobile menu with expanded item value', () => {
    const { getByText } = render(
      <Navigation {...defaultProps}>
        <NavigationItemTrigger label="Auctions"></NavigationItemTrigger>
      </Navigation>,
    );
    fireEvent.click(getByText('Auctions'));
    expect(getByText(expandedItem)).toBeInTheDocument();
  });
});
