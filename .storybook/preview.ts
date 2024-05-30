import type { Preview } from "@storybook/react";
import '../src/styles.scss';
import '../src/story-styles.scss';


const preview: Preview = {
  parameters: {
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

  tags: ['autodocs']
};

export default preview;
