import { Meta } from '@storybook/react';
import AccountPageHeader, { AccountPageHeaderProps } from './AccountPageHeader';

const meta = {
  title: 'Patterns/AccountPageHeader',
  component: AccountPageHeader,
  args: {
    showDivider: true,
  },
} satisfies Meta<typeof AccountPageHeader>;

export default meta;

export const Playground = (props: AccountPageHeaderProps) => <AccountPageHeader {...props} />;

Playground.args = {
  title: 'Account Page Header',
  subtitle: 'This is a subtitle',
  overline: 'Overline',
  actionButtons: [
    {
      label: 'Create New',
      ariaLabel: 'Create New',
      icon: 'Add',
      onClick: () => alert('Primary action clicked'),
      isPrimary: true,
    },
    {
      ariaLabel: 'Favorite',
      icon: 'Favorite',
      onClick: () => alert('Icon action 1 clicked'),
    },
    {
      ariaLabel: 'Share',
      icon: 'Share',
      onClick: () => alert('Icon action 2 clicked'),
    },
  ],
};

export const Details = () => <AccountPageHeader title="Details" />;

export const Bids = () => <AccountPageHeader title="Bids" showDivider={false} />;

export const FavoritesAndLists = () => (
  <AccountPageHeader
    title="Favorites & Lists"
    subtitle="Save Favorite items and Create Lists to organize by themes or interests."
    actionButtons={[
      {
        label: 'Create A List',
        ariaLabel: 'Create A List',
        icon: 'Add',
        onClick: () => alert('Create list clicked'),
        isPrimary: true,
      },
    ]}
  />
);

export const List = () => (
  <AccountPageHeader
    title="Monaco apartment"
    subtitle="Thoughts for the living room renovation"
    overline="List"
    actionButtons={[
      {
        ariaLabel: 'Favorite',
        icon: 'Favorite',
        onClick: () => alert('Favorite clicked'),
      },
      {
        ariaLabel: 'Share',
        icon: 'Share',
        onClick: () => alert('Share clicked'),
      },
    ]}
  />
);
