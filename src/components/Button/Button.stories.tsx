import type { Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';
import Plus from '../../assets/plus.svg?react';
import { ButtonVariants } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Button',
  component: Button,

  argTypes: {
    variant: {
      options: Object.values(ButtonVariants),
      control: {
        type: 'select',
      },
    },
    isIconLast: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const ButtonWithIcon = (props: ButtonProps) => (
  <Button {...props}>
    {!props.isIconLast ? <Plus /> : null}
    This is the title
    {props.isIconLast ? <Plus /> : null}
  </Button>
);

export const ButtonAsLink = (props: ButtonProps) => (
  <Button {...props} href="https://www.phillips.com" target="_blank">
    Visit Phillips
  </Button>
);

ButtonAsLink.args = {
  variant: ButtonVariants.tertiary,
  size: 'md',
};

export const ButtonAsLinkWithPrefetch = (props: ButtonProps) => (
  <Button {...props} href="https://www.phillips.com" target="_blank" prefetch="intent">
    Visit Phillips
  </Button>
);

ButtonAsLinkWithPrefetch.args = {
  variant: ButtonVariants.tertiary,
  size: 'md',
};

export const ButtonWithSkeleton = (props: ButtonProps) => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Button {...props} isSkeletonLoading>
      Visit Phillips
    </Button>
    <Button {...props}>Visit Phillips</Button>
  </div>
);

ButtonAsLinkWithPrefetch.args = {
  variant: ButtonVariants.tertiary,
  size: 'md',
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = {
  args: {
    children: 'Button',
    variant: ButtonVariants.primary,
    isSkeletonLoading: false,
  },
  argTypes: {
    isSkeletonLoading: { control: 'boolean' },
  },
};
