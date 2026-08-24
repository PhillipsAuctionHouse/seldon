/// <reference types="vite/client" />
import { Preview } from '@storybook/react-vite';
import '../src/story-styles.scss';
// foundation CSS (tokens, fonts, padding utilities) loads via CustomStoryWrapper → SeldonProvider
import CustomStoryWrapper from './CustomStoryWrapper';

const preview: Preview = {
  decorators: [(Story, Context) => CustomStoryWrapper(Story, Context)],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Foundations in Seldon',
          ['Colour', 'Type', 'Grid', 'Spacing', 'Radius', 'Icons & Pictograms'],
          'Components',
          'Pages',
        ],
      },
    },

    a11y: {
      test: 'error',
    },

    chromatic: {
      viewports: [500, 1200],
    },
  },

  tags: ['autodocs'],
};

export default preview;
