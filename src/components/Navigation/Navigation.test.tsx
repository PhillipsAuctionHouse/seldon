import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation, { NavigationProps } from './Navigation';
import NavigationItemTrigger from './NavigationItemTrigger/NavigationItemTrigger';
import { px } from '../../utils';

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

  it('does not render mobile nav label when visible is false', () => {
    render(<Navigation id="phillips-nav" backBtnLabel="Back" visible={false} />);
    const navLabel = screen.getByTestId('phillips-nav-label');
    expect(navLabel).toHaveClass(`${px}-nav__label--hidden`);
  });

  it('renders mobile nav label when visible is true', () => {
    render(<Navigation id="phillips-nav" backBtnLabel="Back" />);

    const navLabel = screen.getByTestId('phillips-nav-label');
    expect(navLabel).not.toHaveClass(`${px}-nav__label--hidden`);
    expect(navLabel).toHaveTextContent('Main Menu');
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
    await userEvent.click(getByTestId('phillips-nav-back-btn'));
    expect(getByText('Main Menu')).toBeInTheDocument();
  });
});
