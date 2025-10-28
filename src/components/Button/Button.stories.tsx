import type { Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';
import { ButtonVariants } from './types';
import { Icon } from '../Icon';

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
    linkSize: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    isIconLast: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Default = (props: ButtonProps) => <Button {...props}>This is the title</Button>;

export const ButtonDisabled = (props: ButtonProps) => (
  <Button {...props} isDisabled>
    This is the title
  </Button>
);

export const ButtonWithIcon = (props: ButtonProps) => (
  <Button {...props}>
    {!props.isIconLast ? <Icon icon="Add" /> : null}
    This is the title
    {props.isIconLast ? <Icon icon="Add" /> : null}
  </Button>
);

export const ButtonWithIconDisabled = (props: ButtonProps) => (
  <Button {...props} isDisabled>
    {!props.isIconLast ? <Icon icon="Add" /> : null}
    This is the title
    {props.isIconLast ? <Icon icon="Add" /> : null}
  </Button>
);

export const ButtonAsLink = (props: ButtonProps) => (
  <Button {...props} href="https://www.phillips.com" target="_blank">
    Visit Phillips
  </Button>
);

ButtonAsLink.args = {
  variant: ButtonVariants.tertiary,
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
