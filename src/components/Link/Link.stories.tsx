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
  variant: LinkVariants.linkSmall,
};

Playground.argTypes = {
  variant: {
    options: Object.values(LinkVariants).filter(
      (variant) =>
        variant !== LinkVariants.link &&
        variant !== LinkVariants.snwFlyoutLink &&
        variant !== LinkVariants.snwHeaderLink,
    ),
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

export const LegacyVariants = ({ playgroundWidth, children, ...args }: StoryProps) => (
  <div style={{ width: playgroundWidth, margin: '1rem' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Deprecated Link Variants (for backward compatibility)</h4>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
          These variants are deprecated but still supported for backward compatibility.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link {...args} variant={LinkVariants.link}>
          Deprecated: link (use linkSmall instead)
        </Link>
        <Link {...args} variant={LinkVariants.snwFlyoutLink}>
          Deprecated: snwFlyoutLink (use linkLarge instead)
        </Link>
        <Link {...args} variant={LinkVariants.snwHeaderLink}>
          Deprecated: snwHeaderLink (use linkStylised instead)
        </Link>
      </div>
    </div>
  </div>
);

LegacyVariants.args = {
  children: 'Legacy Link',
  href: internalHref,
};
