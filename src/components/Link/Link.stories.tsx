import type { Meta } from '@storybook/react';

import Link, { LinkProps } from './Link';
import { LinkVariants } from './types';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Links/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;

const internalHref = '/?path=/docs/components-button--overview';

interface StoryProps extends LinkProps {
  playgroundWidth: string;
}

export const Playground = ({ playgroundWidth, children, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Link {...args}>{children}</Link>
  </div>
);

Playground.args = {
  children: 'My Link',
  href: internalHref,
  variant: LinkVariants.link,
};

Playground.argTypes = {
  variant: {
    options: LinkVariants,
    control: {
      type: 'select',
    },
  },
};

export const CustomLink = ({ playgroundWidth, children, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Link {...args} element={(props) => <a {...props}>{<>Custom Link: {props.children}</>}</a>}>
      {children}
    </Link>
  </div>
);

CustomLink.args = {
  children: 'My Custom Link',
  href: internalHref,
};

export const ExternalLink = ({ playgroundWidth, children, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <Link {...args}>{children}</Link>
  </div>
);

ExternalLink.args = {
  children: 'External Link',
  href: 'https://www.google.com',
};
