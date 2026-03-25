import React from 'react';
import { Preview } from '@storybook/react-vite';
import '../src/componentStyles.scss';
import '../src/story-styles.scss';
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
      // Non-blocking until violations are fixed; switch to 'error' when ready.
      test: 'todo',
    },
  },

  tags: ['autodocs'],
};

export default preview;
