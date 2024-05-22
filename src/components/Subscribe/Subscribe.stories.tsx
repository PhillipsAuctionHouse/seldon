import type { Meta } from '@storybook/react';

import Subscribe, { SubscribeProps } from './Subscribe';

const meta = {
  title: 'Components/Subscribe',
  component: Subscribe,
  tags: ['autodocs'],
} satisfies Meta<typeof Subscribe>;

export default meta;

export const Playground = (props: SubscribeProps) => <Subscribe {...props} />;

Playground.args = {
  id: 'mySubscribeComponent',
  title: 'Subscribe to Newsletter',
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    e.preventDefault();

    const nativeData = new FormData(target);
    const data = Object.fromEntries(nativeData.entries());
    console.log('Form submitted for email -', data?.email);

    target.reset();
  },
  blurb: 'Receive exclusive content about our auctions, exhibitions, and special events.',
  subscriptionState: null,
  invalidText: 'Please enter a valid email address.',
};
