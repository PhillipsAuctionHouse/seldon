import { Meta } from '@storybook/react/*';
import TextSymbol, { TextSymbolProps } from './TextSymbol';
import { TextSymbolVariants } from './types';
import Text from '../Text/Text';
import { TextVariants } from '../Text/types';

const meta = {
  title: 'Components/TextSymbol',
  component: TextSymbol,
} satisfies Meta<typeof TextSymbol>;

export default meta;
export const Playground = (props: TextSymbolProps) => (
  <Text variant={TextVariants.heading3}>
    Lot number 23
    <TextSymbol {...props} />
  </Text>
);

Playground.args = { symbols: 'Ο‡≠♠ΩΔ•†◆Σ܀∞✱▼Ж≌Ø'.split(''), variant: TextSymbolVariants.lotNumber };

Playground.argTypes = {
  variant: {
    options: TextSymbolVariants,
    control: {
      type: 'select',
    },
  },
};
