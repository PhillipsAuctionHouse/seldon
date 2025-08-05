import { render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import TextSymbol, { TextSymbolProps } from './TextSymbol';
import { px } from '../../utils';
import { TextSymbolVariants } from './types';
import { forwardRef } from 'react';

const symbols = 'Ο‡≠♠ΩΔ•†◆Σ܀∞✱▼Ж≌Ø'.split('');

describe('TextSymbol', () => {
  // Use a forwardRef wrapper for runCommonTests to ensure ref is tested correctly
  const RefTextSymbol = forwardRef<HTMLElement, React.ComponentProps<typeof TextSymbol>>((props, ref) => (
    <TextSymbol {...props} ref={ref} />
  ));
  RefTextSymbol.displayName = 'RefTextSymbol';
  runCommonTests(RefTextSymbol, 'TextSymbol');
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
});
