import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import FavoritesCollectionTile from './FavoritesCollectionTile';

const meta = {
  title: 'Patterns/FavoritesCollectionTile',
  component: FavoritesCollectionTile,
} satisfies Meta<typeof FavoritesCollectionTile>;

export default meta;

export const Playground = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

Playground.args = {
  id: 'favorites-collection-tile-1',
  count: 2,
  name: 'New List',
  listImageUrl: 'https://via.placeholder.com/400',
  isFavorites: false,
  onEdit: (): void => console.log('Edit list clicked'),
  onDelete: (): void => console.log('Delete list clicked'),
  element: 'a',
};

Playground.argTypes = {
  list: {
    description: 'List data containing count and name',
    control: 'object',
  },
  isFavorites: {
    description: 'Whether this card is in favorites view',
    control: 'boolean',
  },
  element: {
    description: 'Wrapped element to pass in for the link',
    control: { type: null },
  },
};

export const EmptyFavorites = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

EmptyFavorites.args = {
  id: 'favorites-collection-tile-2',
  count: 0,
  name: 'Favorites',
  isFavorites: true,
  element: 'a',
};

export const BlankList = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

BlankList.args = {
  id: 'favorites-collection-tile-3',
  isLists: true,
  element: 'a',
};

export const EmptyList = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

EmptyList.args = {
  id: 'favorites-collection-tile-4',
  count: 0,
  name: 'Test List',
  isLists: true,
  element: 'a',
};

export const TranslatedList = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

TranslatedList.args = {
  id: 'favorites-collection-tile-5',
  count: 0,
  name: '某人列表',
  isLists: true,
  element: 'a',
  emptyListsText: '创建您的第一个列表',
  formatlotStr: (count: number) => {
    return `列表中有 ${count} 件拍品`;
  },
};
