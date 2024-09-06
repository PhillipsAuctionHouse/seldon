import { Meta } from '@storybook/react';
import ReadMore, { ReadMoreProps } from './ReadMore';

const meta = {
  title: 'Components/ReadMore',
  component: ReadMore,
  argTypes: {
    readMoreText: { control: 'text' },
    readLessText: { control: 'text' },
    maxHeight: { control: 'number' },
  },
} satisfies Meta<typeof ReadMore>;

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

export const Default = (args: ReadMoreProps) => (
  <>
    <ReadMore {...args}>{sampleText}</ReadMore>
  </>
);

Default.args = {
  readMoreText: 'Read More',
  readLessText: 'Read Less',
  maxHeight: 100,
};

export const CustomText = (args: ReadMoreProps) => (
  <ReadMore {...args}>
    <p>{sampleText}</p>
  </ReadMore>
);

CustomText.args = {
  readMoreText: 'Show More',
  readLessText: 'Show Less',
  maxHeight: 150,
};

export const LargeMaxHeight = (args: ReadMoreProps) => (
  <ReadMore {...args}>
    <p>{sampleText}</p>
  </ReadMore>
);

LargeMaxHeight.args = {
  readMoreText: 'Expand',
  readLessText: 'Collapse',
  maxHeight: 300,
};
