import type { Meta } from '@storybook/react';

import Link, { LinkProps } from './Link';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

interface StoryProps extends LinkProps {
  playgroundWidth: string;
}

export const LinkStory = ({ playgroundWidth, children, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Link {...args}>{children}</Link>
  </div>
);

LinkStory.args = {
  children: 'My Link',
  href: 'https://www.google.com',
};

export const CustomLinkStory = ({ playgroundWidth, children, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Link
      {...args}
      renderLink={(props) => (
        <li>
          <a {...props}></a>
        </li>
      )}
    >
      {children}
    </Link>
  </div>
);

CustomLinkStory.args = {
  children: 'My Custom Link',
  href: 'https://www.google.com',
};
