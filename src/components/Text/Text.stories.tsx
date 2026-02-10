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

export const TextWithSkeleton = (props: TextProps) => <Text {...props} style={{ maxWidth: '300px' }} />;

TextWithSkeleton.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nibh ac turpis molestie ultricies. Morbi placerat rhoncus elit, sed malesuada ante rutrum et.',
  variant: TextVariants.body2,
  isSkeletonLoading: true,
};

TextWithSkeleton.parameters = {
  chromatic: { disableSnapshot: true },
};

TextWithSkeleton.argTypes = {
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
  isSkeletonLoading: {
    control: 'boolean',
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
