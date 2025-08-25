import { Meta } from '@storybook/react';
import TextBanner, { TextBannerProps } from './TextBanner';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/TextBanner',
  component: TextBanner,
} satisfies Meta<typeof TextBanner>;

export default meta;
export const Playground = (props: TextBannerProps) => <TextBanner {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  headerText: 'Text Banner',
  description:
    'This is the description of the Text variant of the Hero Banner. This is a separate component from Hero Banner, which contains an image.',
};

Playground.argTypes = {
  headerText: {
    control: {
      type: 'text',
    },
  },
  description: {
    control: {
      type: 'text',
    },
  },
};
