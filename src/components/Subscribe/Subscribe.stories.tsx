import type { Meta } from '@storybook/react';

import Subscribe, { SubscribeProps } from './Subscribe';

const meta = {
  title: 'Components/Subscribe',
  component: Subscribe,
} satisfies Meta<typeof Subscribe>;

export default meta;

export const Playground = (props: SubscribeProps) => <Subscribe {...props} />;

Playground.args = {
  id: 'mySubscribeComponent',
  title: 'Subscribe to Newsletter',
};
