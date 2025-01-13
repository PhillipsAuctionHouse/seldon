import { render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import TextSymbol, { TextSymbolProps } from './TextSymbol';
import { px } from '../../utils';
import { TextSymbolVariants } from './types';

const symbols = 'Ο‡≠♠ΩΔ•†◆Σ܀∞✱▼Ж≌Ø'.split('');

describe('TextSymbol', () => {
  runCommonTests(TextSymbol, 'TextSymbol');
  const renderTextSymbol = (props: TextSymbolProps) => {
    render(<TextSymbol {...props} />);
  };

  it('renders children correctly', () => {
    renderTextSymbol({ symbols });
    symbols.forEach((symbol) => expect(screen.getByText(symbol)).toBeInTheDocument());
  });

  it('applies the default variant correctly', () => {
    renderTextSymbol({ symbols });
    expect(screen.getByTestId('text-symbol')).toHaveClass(`${px}-text-symbol--lotNumber`);
  });

  it('applies the estimation variant correctly', () => {
    renderTextSymbol({ symbols, variant: TextSymbolVariants.estimation });
    expect(screen.getByTestId('text-symbol')).toHaveClass(`${px}-text-symbol--estimation`);
  });
  it('applies symbol size correctly', () => {
    const largeSymbols = 'Ο‡'.split('');
    renderTextSymbol({ symbols: largeSymbols });
    largeSymbols.forEach((symbol) => {
      const symbolElement = screen.getByText(symbol);
      expect(symbolElement).toHaveClass(`${px}-text-symbol--large-symbol`);
    });
  });
});
