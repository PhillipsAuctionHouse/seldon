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
        order: [
          'Welcome',
          'Foundations in Seldon',
          ['Colour', 'Type', 'Grid', 'Spacing', 'Radius', 'Icons & Pictograms'],
          'Components',
          'Pages',
        ],
      },
    },
    initialGlobals: {
      viewport: 'desktop',
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '400px',
            height: '600px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '1080px',
          },
        },
      },
    },
    chromatic: {
      modes: {
        mobile: {
          viewport: 'mobile',
        },
        desktop: {
          viewport: 'desktop',
        },
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
