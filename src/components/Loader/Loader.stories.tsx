import { Meta } from '@storybook/react';
import Loader from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;

export const LoaderExample = () => <Loader></Loader>;
