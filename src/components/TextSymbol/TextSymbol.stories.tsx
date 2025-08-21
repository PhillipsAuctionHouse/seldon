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
const allSymbols = 'Ο‡≠♠ΩΔ•†◆Σ܀∞✱▼Ж≌'.split('');

Playground.args = { symbols: allSymbols, variant: TextSymbolVariants.lotNumber };

Playground.argTypes = {
  variant: {
    options: TextSymbolVariants,
    control: {
      type: 'select',
    },
  },
};

export const LotSymbol = () => (
  <Text variant={TextVariants.heading3}>
    Lot number 23
    <TextSymbol symbols={allSymbols} variant={TextSymbolVariants.lotNumber} />
  </Text>
);

export const EstimateSymbol = () => (
  <Text variant={TextVariants.bodyMd}>
    $1,000 - $2,000
    <TextSymbol symbols={allSymbols} variant={TextSymbolVariants.estimation} />
  </Text>
);
