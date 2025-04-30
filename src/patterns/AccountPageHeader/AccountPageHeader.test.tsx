import AccountPageHeader from './AccountPageHeader';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('AccountPageHeader', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<AccountPageHeader title="Account Settings" />);
    expect(getByText('Account Settings')).toBeInTheDocument();
  });

  it('renders subheader when provided', () => {
    const { getByText } = render(
      <AccountPageHeader title="Account Settings" subheader="Manage your account preferences" />,
    );
    expect(getByText('Manage your account preferences')).toBeInTheDocument();
  });

  it('renders overline when provided', () => {
    const { getByText } = render(<AccountPageHeader title="Account Settings" overline="User Profile" />);
    expect(getByText('User Profile')).toBeInTheDocument();
  });

  it('renders primary action button when provided', async () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <AccountPageHeader
        title="Account Settings"
        primaryActionButton={{
          onClick: handleClick,
          label: 'Edit Profile',
          icon: 'Favorite',
        }}
      />,
    );

    expect(getByText('Edit Profile')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'SvgFavorite Edit Profile' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders icon actions when provided', async () => {
    const handleAction = vi.fn();
    render(<AccountPageHeader title="Account Settings" iconActions={[{ icon: 'Favorite', action: handleAction }]} />);

    const iconButton = screen.getByTestId('icon-button');
    expect(iconButton).toBeInTheDocument();

    await userEvent.click(iconButton);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('does not render divider when showDivider is false', () => {
    const { container } = render(<AccountPageHeader title="Account Settings" showDivider={false} />);
    expect(container.querySelector('.AccountPageHeader__divider')).not.toBeInTheDocument();
  });
});
