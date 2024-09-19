import { Meta } from '@storybook/react';
import Text, { TextProps } from './Text';
import { TextVariants } from './types';

const meta = {
  title: 'Components/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
export const Playground = (props: TextProps) => <Text {...props} />;

export const SuperScript = (props: TextProps) => (
  <Text variant={TextVariants.heading3} superScript="ЖΟ◆" {...props}>
    Lot number 23
  </Text>
);

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
