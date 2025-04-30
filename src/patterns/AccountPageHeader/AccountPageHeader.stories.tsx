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
  subheader: 'This is a subheader',
  overline: 'Overline',
  primaryActionButton: {
    onClick: () => alert('Primary action clicked'),
    label: 'Create New',
    icon: 'Plus',
  },
  iconActions: [
    {
      action: () => alert('Icon action 1 clicked'),
      icon: 'FavoriteOutline',
    },
    {
      action: () => alert('Icon action 2 clicked'),
      icon: 'Favorite',
    },
  ],
};

export const Details = () => <AccountPageHeader title="Details" />;

export const Bids = () => <AccountPageHeader title="Bids" showDivider={false} />;

export const FavoritesAndLists = () => (
  <AccountPageHeader
    title="Favorites & Lists"
    subheader="Save Favorite items and Create Lists to organize by themes or interests."
    primaryActionButton={{
      onClick: () => alert('Create list clicked'),
      label: 'Create A List',
      icon: 'Plus',
    }}
  />
);

export const List = () => (
  <AccountPageHeader
    title="Monaco apartment"
    subheader="Thoughts for the living room renovation"
    overline="List"
    iconActions={[
      {
        action: () => alert('Favorite clicked'),
        icon: 'FavoriteOutline',
      },
      {
        action: () => alert('Share clicked'),
        icon: 'Share',
      },
    ]}
  />
);
