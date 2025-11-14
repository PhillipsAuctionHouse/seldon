import { Meta } from '@storybook/react';
import Detail, { DetailProps } from './Detail';
import { DetailVariants } from './types';

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

export const Small = (props: DetailProps) => <Detail {...props} variant={DetailVariants.sm} />;
Small.args = {
  ...Playground.args,
  variant: DetailVariants.sm,
};

export const WithSubLabel = (props: DetailProps) => <Detail {...props} variant={DetailVariants.md} />;
WithSubLabel.args = {
  ...Playground.args,
  variant: DetailVariants.md,
};
