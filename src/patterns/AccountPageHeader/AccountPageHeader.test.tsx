import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountPageHeader from './AccountPageHeader';

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

  it('renders action buttons when provided', async () => {
    const handleClick = vi.fn();
    render(
      <AccountPageHeader
        title="Account Settings"
        actionButtons={[
          {
            onClick: handleClick,
            label: 'Edit Profile',
            icon: 'Favorite',
            ariaLabel: 'Edit Profile',
            isPrimary: true,
          },
        ]}
      />,
    );

    const button = screen.getByRole('button', { name: 'Edit Profile' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders multiple icon buttons when provided', async () => {
    const handleShare = vi.fn();
    const handleFavorite = vi.fn();

    render(
      <AccountPageHeader
        title="Account Settings"
        actionButtons={[
          {
            onClick: handleShare,
            icon: 'Share',
            ariaLabel: 'Share',
            isPrimary: false,
          },
          {
            onClick: handleFavorite,
            icon: 'Favorite',
            ariaLabel: 'Add to favorites',
            isPrimary: false,
          },
        ]}
      />,
    );

    const shareButton = screen.getByRole('button', { name: 'Share' });
    const favoriteButton = screen.getByRole('button', { name: 'Add to favorites' });

    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();

    await userEvent.click(shareButton);
    expect(handleShare).toHaveBeenCalledTimes(1);

    await userEvent.click(favoriteButton);
    expect(handleFavorite).toHaveBeenCalledTimes(1);
  });

  it('renders both primary and icon buttons when provided', () => {
    render(
      <AccountPageHeader
        title="Account Settings"
        actionButtons={[
          {
            onClick: () => vi.fn(),
            label: 'Primary Action',
            icon: 'Add',
            ariaLabel: 'Add new item',
            isPrimary: true,
          },
          {
            onClick: () => vi.fn(),
            icon: 'Share',
            ariaLabel: 'Share',
            isPrimary: false,
          },
        ]}
      />,
    );

    expect(screen.getByRole('button', { name: 'Add new item' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  it('does not render divider when showDivider is false', () => {
    const { container } = render(<AccountPageHeader title="Account Settings" showDivider={false} />);
    expect(container.querySelector('.px-account-page-header__divider')).not.toBeInTheDocument();
  });
});
