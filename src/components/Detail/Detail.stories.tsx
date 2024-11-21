import { Meta } from '@storybook/react';
import Detail, { DetailProps } from './Detail';
import { Text, TextVariants } from '../Text';

const meta = {
  title: 'Components/Detail',
  component: Detail,
} satisfies Meta<typeof Detail>;

export default meta;
export const Playground = (props: DetailProps) => <Detail {...props} />;

Playground.args = {
  label: 'Label',
  subLabel: '',
  value: <Text variant={TextVariants.string2}>Value</Text>,
};

Playground.argTypes = {};
