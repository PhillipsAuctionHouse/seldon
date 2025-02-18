import { Meta } from '@storybook/react';
import Text, { TextProps } from './Text';
import { TextAlignments, TextVariants } from './types';
import { TextSymbolVariants } from '../TextSymbol/types';
import TextSymbol from '../TextSymbol/TextSymbol';

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
  align: {
    options: TextAlignments,
    control: {
      type: 'select',
    },
  },
};

export const SuperScript = (props: TextProps) => <Text variant={TextVariants.heading3} {...props} />;

SuperScript.args = {
  children: (
    <>
      Lot number 23<TextSymbol variant={TextSymbolVariants.lotNumber}>ЖΟ◆</TextSymbol>
    </>
  ),
  variant: TextVariants.heading3,
};

SuperScript.argTypes = {
  variant: {
    options: TextVariants,
    control: {
      type: 'select',
    },
  },
  align: {
    options: TextAlignments,
    control: {
      type: 'select',
    },
  },
};
