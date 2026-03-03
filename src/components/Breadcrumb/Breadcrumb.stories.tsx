import { Meta } from '@storybook/react-vite';
import Breadcrumb, { BreadcrumbProps } from './Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;

export default meta;

const items = [
  {
    href: '',
    label: 'Art, Modern to Contemporary With Really Really Really Really Really ReallyLong Text that forces Truncation',
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
export const Playground = (props: BreadcrumbProps) => <Breadcrumb truncateIndex={0} {...props} />;

Playground.args = {
  items,
};

Playground.argTypes = {};
