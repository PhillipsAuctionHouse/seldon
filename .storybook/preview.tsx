import React from 'react';
import { Preview } from '@storybook/react';
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
        order: ['Welcome', 'Design', 'Components', 'Pages'],
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
