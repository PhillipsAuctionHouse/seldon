import { Meta } from '@storybook/react';
import Loader from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    isCentered: { control: 'boolean' },
  },
} satisfies Meta<typeof Loader>;

export default meta;

export const LoaderDefault = () => <Loader></Loader>;

export const LoaderNotCentered = (args: { isCentered: boolean }) => <Loader {...args}></Loader>;

LoaderNotCentered.args = {
  isCentered: false,
};

LoaderNotCentered.argTypes = {
  isCentered: { control: 'boolean' },
};
