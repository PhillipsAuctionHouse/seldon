import { Meta } from '@storybook/react';
import Detail, { DetailProps } from './Detail';

const meta = {
  title: 'Components/Detail',
  component: Detail,
} satisfies Meta<typeof Detail>;

export default meta;
export const Playground = (props: DetailProps) => <Detail {...props} />;

Playground.args = {
  label: 'Label',
  value: 'Value',
};

Playground.argTypes = {};
