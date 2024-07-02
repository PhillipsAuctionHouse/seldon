import { Meta } from '@storybook/react';
import Breadcrumb, { BreadcrumbProps } from './Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;

export default meta;

const items = [
  {
    href: '',
    label: 'Art, Modern to Contemporary',
  },
  {
    href: '',
    label: 'New Now (26 Sep 2023)',
  },
  {
    href: '',
    label: 'Lot 1',
  },
];
export const Playground = (props: BreadcrumbProps) => <Breadcrumb {...props} />;

Playground.args = {
  items,
};

Playground.argTypes = {};
