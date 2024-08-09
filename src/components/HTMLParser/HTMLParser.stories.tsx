import type { Meta } from '@storybook/react';

import HTMLParser from './HTMLParser';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/HTMLParser',
  component: HTMLParser,
} satisfies Meta<typeof HTMLParser>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = {
  args: {
    html: `
      <div>
        <h1>Heading One <span>span</span></h1>
        <blockquote>Blockquote</blockquote>
        <h2>Heading 2</h2>
        <p> We really want to show that <a class="SomeClass" href="/link/to/somewhere" data-url="disurl">this is an inline link</a> lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.;</p>
        <img src="https://via.placeholder.com/150" alt="placeholder" />
      </div>
    `,
  },
};
