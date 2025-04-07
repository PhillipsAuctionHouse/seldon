import { Meta } from '@storybook/react';
import ListPreview, { ListPreviewProps } from './ListPreview';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/ListPreview',
  component: ListPreview,
} satisfies Meta<typeof ListPreview>;

export default meta;
export const Playground = (props: ListPreviewProps) => <ListPreview {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  list: {
    count: 2,
    name: 'New List',
  },
  transformedImageUrl: 'https://via.placeholder.com/400',
  isFavorites: false,
  navigateToList: () => console.log('Navigate to list'),
  onClickAnalyticsWrapper: (callback, eventName) => (event) => {
    console.log(`Analytics event: ${eventName}`);
    callback();
  },
  EditListMenu: (props) => (
    <div style={{ cursor: 'pointer' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" 
          fill="currentColor" 
        />
        <path 
          d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" 
          fill="currentColor" 
        />
        <path 
          d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" 
          fill="currentColor" 
        />
      </svg>
    </div>
  ),
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
  navigateToList: {
    description: 'Function to navigate to list details',
    control: { type: null },
  },
  onClickAnalyticsWrapper: {
    description: 'Analytics wrapper for click events',
    control: { type: null },
  },
  EditListMenu: {
    description: 'Component for editing the list',
    control: { type: null },
  },
  element: {
    description: 'Optional element to render at the top level',
    control: { type: null },
  },
};