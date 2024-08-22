import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Search, { type SearchProps } from './Search';

const fetchData = async (searchQuery: string) => {
  console.log('searchQuery', searchQuery);
  let searchResults: { makers: Array<{ id: string; label: string; url: string }> } = { makers: [] };
  // Call to get search results
  searchResults = await new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          makers: [
            { id: 'result1', label: 'Name', url: 'http://www.example.com' },
            { id: 'result2', label: 'Another Name', url: 'http://www.example.com' },
            { id: 'result3', label: 'Yet Another Name', url: 'http://www.example.com' },
          ],
        }),
      2000,
    );
  });
  return searchResults;
};

const StatefulSearch = (props: SearchProps) => {
  const [autoCompleteResults, setAutoCompleteResults] = React.useState(
    [] as Array<{ id: string; label: string; url: string }>,
  );
  const [state, setState] = React.useState<SearchProps['state']>('idle');
  const onSearch = (searchQuery: string) => {
    if (searchQuery?.includes('?')) {
      setState('invalid');
      return;
    }
    // Call to get auto complete results
    if (searchQuery.length > 2) {
      setState('loading');
      fetchData(searchQuery)
        .then((data) => {
          setAutoCompleteResults(data.makers);
          setState('idle');
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <Search
      {...props}
      onSearch={(value) => {
        onSearch(value);
      }}
      searchResults={autoCompleteResults}
      state={state}
    />
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Search',
  component: StatefulSearch,
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground: Story = {
  args: {
    useIcon: true,
    defaultValue: '',
    onSearch: () => {
      return;
    },
    searchResults: [],
    state: 'loading',
  },
};
