import { Meta } from '@storybook/react';
import LinkList, { LinkListProps } from './LinkList';
import LinkBlock, { LinkBlockProps } from '../LinkBlock/LinkBlock';

const meta = {
  title: 'Components/Links/LinkList',
  component: LinkList,
} satisfies Meta<typeof LinkList>;

export default meta;

const LinkBlocks: React.ReactElement<LinkBlockProps, typeof LinkBlock>[] = [
  <LinkBlock
    key="linkblock1"
    linkProps={{
      href: '/modern-and-contemporary-art',
      children: 'Modern & Contemporary Art',
    }}
    description="Works by Modern Masters (1860s – 1970) & Contemporary Artists (1970 – Now)"
  />,
  <LinkBlock
    key="linkblock2"
    linkProps={{
      href: '/jewels',
      children: 'Jewels',
    }}
    description="Exceptional, Rare & Timeless Jewels from Distinguished Collections"
  />,
  <LinkBlock
    key="linkblock3"
    linkProps={{
      href: 'https://dropshop.phillips.com/',
      children: 'Dropshop',
    }}
    description="Offering Exclusive & Limited Works, in Close Curation with Artists & Makers"
  />,
  <LinkBlock
    key="linkblock4"
    linkProps={{
      href: '/design',
      children: 'Design',
    }}
    description="Furniture & Conceptual Works of Design from the 20th & 21st Centuries"
  />,
  <LinkBlock
    key="linkblock5"
    linkProps={{
      href: '/photographs',
      children: 'Photographs',
    }}
    description="A Balanced Presentation of Classic Masters & Contemporary Stars"
  />,
  <LinkBlock
    key="linkblock6"
    linkProps={{
      href: '/store/perpetual',
      children: 'Perpetual',
    }}
    description="A Highly Curated Selection of Watches Sold at Fixed Prices"
  />,
  <LinkBlock
    key="linkblock7"
    linkProps={{
      href: '/editions',
      children: 'Editions',
    }}
    description="Museum-quality Prints & Multiples of Modern & Contemporary Artists"
  />,
  <LinkBlock
    key="linkblock8"
    linkProps={{
      href: '/watches',
      children: 'Watches',
    }}
    description="
        The World‘s Finest Collectors‘ Watches,
        In Association with Bacs & Russo
    "
  />,
  <LinkBlock
    key="linkblock9"
    linkProps={{
      href: '/private-sales-department',
      children: 'Private Sales',
    }}
    description="A Uniquely Personalized Approach to Collecting out of Auctions"
  />,
];
export const Playground = ({ children }: LinkListProps) => <LinkList>{children}</LinkList>;

Playground.args = {
  children: LinkBlocks,
};

export const IrregularLinkList = ({ linkCount }: { linkCount: number }) => (
  <LinkList>{LinkBlocks.slice(0, linkCount)}</LinkList>
);

IrregularLinkList.args = {
  linkCount: 5,
};
