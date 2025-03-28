import { Meta } from '@storybook/react';
import ContentPeek, { ContentPeekProps } from './ContentPeek';
import { HeightUnits } from './utils';

const meta = {
  title: 'Components/ContentPeek',
  component: ContentPeek,
  argTypes: {
    contentExpandText: { control: 'text' },
    contentCollapseText: { control: 'text' },
    maxHeight: { control: 'number' },
    minHeightThreshold: { control: { type: 'number', step: 20 } },
    heightUnits: {
      control: { type: 'select' },
      options: Object.values(HeightUnits),
    },
  },
} satisfies Meta<typeof ContentPeek>;

export default meta;

const sampleText = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

export const Playground = (args: ContentPeekProps) => (
  <>
    <ContentPeek {...args} style={{ maxWidth: '700px', margin: '0 auto' }}>
      {sampleText}
    </ContentPeek>
  </>
);

Playground.args = {
  contentExpandText: 'Read More',
  contentCollapseText: 'Read Less',
  maxHeight: 150,
  minHeightThreshold: 200,
  heightUnits: HeightUnits.px,
};

export const CustomText = (args: ContentPeekProps) => (
  <ContentPeek {...args}>
    <p>{sampleText}</p>
  </ContentPeek>
);

CustomText.args = {
  contentExpandText: 'Show More',
  contentCollapseText: 'Show Less',
  maxHeight: 150,
};
