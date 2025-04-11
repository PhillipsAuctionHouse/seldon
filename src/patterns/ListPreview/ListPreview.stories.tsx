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

// interface EditListMenuProps {
//   // Props for the EditListMenu component
//   props: EditListMenuProps
// }

type AnalyticsWrapperFunction = (
  callback: () => void,
  eventName: string,
) => (event: React.MouseEvent<HTMLElement>) => void;

export const Playground = (props: ComponentProps<typeof ListPreview>) => <ListPreview {...props} />;

Playground.args = {
  list: {
    count: 2,
    name: 'New List',
  } as List,
  listImageUrl: 'https://via.placeholder.com/400',
  isFavorites: false,
  navigateToList: (): void => console.log('Navigate to list'),
  onClickAnalyticsWrapper: ((callback: () => void, eventName: string) => (): void => {
    console.log(`Analytics event: ${eventName}`);
    callback();
  }) as AnalyticsWrapperFunction,
};

Playground.argTypes = {
  list: {
    description: 'List data containing count and name',
    control: 'object',
  },
  transformedImageUrl: {
    description: 'Image URL for the list',
    control: 'text',
  },
  isFavorites: {
    description: 'Whether this card is in favorites view',
    control: 'boolean',
  },
  element: {
    description: 'Optional element to render at the top level',
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
  navigateToList: (): void => console.log('Navigate to list'),
  onClickAnalyticsWrapper: ((callback: () => void, eventName: string) => (): void => {
    console.log(`Analytics event: ${eventName}`);
    callback();
  }) as AnalyticsWrapperFunction,
};

export const EmptyList = (props: ComponentProps<typeof ListPreview>) => <ListPreview {...props} />;

EmptyList.args = {
  list: {
    count: 0,
    name: '',
  } as List,
  isFavorites: false,
  navigateToList: (): void => console.log('Navigate to list'),
  onClickAnalyticsWrapper: ((callback: () => void, eventName: string) => (): void => {
    console.log(`Analytics event: ${eventName}`);
    callback();
  }) as AnalyticsWrapperFunction,
};
