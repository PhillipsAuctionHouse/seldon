import { Meta } from '@storybook/react';
import Link, { LinkProps } from '../Link/Link';
import LinkBlock, { LinkBlockProps } from './LinkBlock';

const meta = {
  title: 'Components/Links/LinkBlock',
  component: LinkBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkBlock>;

export default meta;

export const Playground = (props: LinkBlockProps) => <LinkBlock {...props} />;

Playground.args = {
  linkComponent: Link,
  linkProps: {
    children: 'My Link',
    href: '/?path=/docs/components-button--overview',
  },
  description: 'This is a description of the link',
};

export const CustomLinkBlock = (props: LinkBlockProps) => <LinkBlock {...props} />;

CustomLinkBlock.args = {
  linkComponent: (props: LinkProps) => (
    <Link {...props}>
      <>Custom Link: {props.children}</>
    </Link>
  ),
  linkProps: {
    children: 'Custom Link',
    href: '/?path=/docs/components-button--overview',
  },
  description: 'This is a description of the link',
};