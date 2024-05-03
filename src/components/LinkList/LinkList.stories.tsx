import { Meta } from '@storybook/react';
import LinkList, { LinkListProps } from './LinkList';
import LinkBlock from '../LinkBlock/LinkBlock';

const meta = {
  title: 'Components/Links/LinkList',
  component: LinkList,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkList>;

export default meta;

export const Playground = ({ children }: LinkListProps) => <LinkList>{children}</LinkList>;

Playground.args = {
  children: [
    <LinkBlock
      key="linkblock1"
      linkProps={{
        href: '/modern-and-contemporary-art',
        children: 'Modern & Contemporary Art',
      }}
      description="Works by Modern Masters (1860s – 1970) & Contemporary Artists (1970 – Now)"
    ></LinkBlock>,
    <LinkBlock
      key="linkblock2"
      linkProps={{
        href: '/jewels',
        children: 'Jewels',
      }}
      description="Exceptional, Rare & Timeless Jewels from Distinguished Collections"
    ></LinkBlock>,
    <LinkBlock
      key="linkblock3"
      linkProps={{
        href: '/paintings',
        children: 'Paintings',
      }}
      description="Beautiful Paintings from Renowned Artists"
    ></LinkBlock>,
  ],
};
