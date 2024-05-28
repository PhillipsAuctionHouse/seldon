import { Meta } from '@storybook/react';
import Text, { TextProps } from './Text';
import { TextVariants } from './types';

const meta = {
  title: 'Components/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
export const Playground = (props: TextProps) => <Text {...props} />;

Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {
  variant: {
    options: TextVariants,
    control: {
      type: 'select',
    },
  },
};
