import { Meta } from '@storybook/react';
import ListPreview from './ListPreview';
import { ComponentProps } from 'react';

const meta = {
  title: 'Patterns/ListPreview',
  component: ListPreview,
} satisfies Meta<typeof ListPreview>;

export default meta;

interface List {
  count: number;
  name: string;
}

export const Playground = (props: ComponentProps<typeof ListPreview>) => <ListPreview {...props} />;

Playground.args = {
  list: {
    count: 2,
    name: 'New List',
  } as List,
  listImageUrl: 'https://via.placeholder.com/400',
  isFavorites: false,
  onEditListClick: (): void => console.log('Edit list clicked'),
  onDeleteListClick: (): void => console.log('Delete list clicked'),
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

export const EmptyFavorites = (props: ComponentProps<typeof ListPreview>) => <ListPreview {...props} />;

EmptyFavorites.args = {
  list: {
    count: 0,
    name: 'Favorites',
  } as List,
  isFavorites: true,
  element: 'a',
};

export const EmptyList = (props: ComponentProps<typeof ListPreview>) => <ListPreview {...props} />;

EmptyList.args = {
  list: {
    count: 0,
    name: '',
  } as List,
  isFavorites: false,
  element: 'a',
  listText: '首先创建某人列表',
};
