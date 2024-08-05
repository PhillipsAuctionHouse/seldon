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
        <h1>Heading <span>span</span></h1>
        <blockquote>Blockquote</blockquote>
        <hr />
      </div>
    `,
  },
};
