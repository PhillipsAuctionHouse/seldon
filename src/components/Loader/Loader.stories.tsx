import { Meta } from '@storybook/react';
import Loader from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    isCentered: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;

export const LoaderExample = () => <Loader></Loader>;
