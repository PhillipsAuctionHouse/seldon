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
            { id: 'result1', label: 'Name', url: 'http://www.cnn.com' },
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
  const onSearch = (searchQuery: string) => {
    // Call to get auto complete results
    if (searchQuery.length > 2) {
      fetchData(searchQuery)
        .then((data) => setAutoCompleteResults(data.makers))
        .catch((error) => console.error(error));
    }
  };
  return <Search {...props} onSearch={onSearch} searchResults={autoCompleteResults} />;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Search',
  component: StatefulSearch,
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground: Story = {
  args: {
    useIcon: true,
    altText: 'Search',
  },
};
