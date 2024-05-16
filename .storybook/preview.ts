import type { Preview } from "@storybook/react";
import '../src/styles.scss';
import '../src/story-styles.scss';


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'Design', 'Components', 'Pages'],
      },
    },
  },
};

export default preview;
