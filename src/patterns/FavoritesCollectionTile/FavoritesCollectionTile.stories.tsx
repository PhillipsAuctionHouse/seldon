import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import { px } from '../../utils';
import FavoritesCollectionTile from './FavoritesCollectionTile';

const meta = {
  title: 'Patterns/FavoritesCollectionTile',
  component: FavoritesCollectionTile,
} satisfies Meta<typeof FavoritesCollectionTile>;

const linkClassName = `.${px}-link .${px}-link--link`;

export default meta;

export const Playground = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

Playground.args = {
  id: 'favorites-collection-tile-1',
  count: 2,
  name: 'New List',
  imageSrc: 'https://via.placeholder.com/400',
  variant: 'lists',
  onEdit: (): void => console.log('Edit list clicked'),
  onDelete: (): void => console.log('Delete list clicked'),
  element: 'a',
  linkClassName: linkClassName,
};

Playground.argTypes = {
  variant: {
    description: 'Determines if is in favorites view or lists view',
    control: { type: 'select' },
    options: ['favorites', 'lists'],
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
  variant: 'favorites',
  element: 'a',
  formatlotStr: (count: number, lotText = 'LOT') => {
    return `${count} ${lotText}`;
  },
  linkClassName: linkClassName,
};

export const BlankList = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

BlankList.args = {
  id: 'favorites-collection-tile-3',
  count: 0,
  name: '',
  variant: 'lists',
  element: 'a',
  linkClassName: linkClassName,
};

export const EmptyList = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

EmptyList.args = {
  id: 'favorites-collection-tile-4',
  count: 0,
  name: 'Test List',
  variant: 'lists',
  element: 'a',
  linkClassName: linkClassName,
};

export const TranslatedList = (props: ComponentProps<typeof FavoritesCollectionTile>) => (
  <FavoritesCollectionTile {...props} />
);

TranslatedList.args = {
  id: 'favorites-collection-tile-5',
  count: 0,
  name: '某人列表',
  variant: 'lists',
  element: 'a',
  emptyListsText: '创建您的第一个列表',
  formatlotStr: (count: number) => {
    return `列表中有 ${count} 件拍品`;
  },
  linkClassName: linkClassName,
};
