import { render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import TextSymbol, { TextSymbolProps } from './TextSymbol';
import { px } from '../../utils';
import { TextSymbolVariants } from './types';
import { forwardRef } from 'react';

const symbols = 'Ο‡≠♠ΩΔ•†◆Σ܀∞✱▼Ж≌Ø'.split('');
const TEXT_VARIATION_SELECTOR = '\uFE0E';

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

  it('renders symbols with text variation selector', () => {
    render(<TextSymbol symbols={symbols} />);
    const root = screen.getByTestId('text-symbol');
    const symbolElements = root.querySelectorAll(':scope > *');

    expect(symbolElements).toHaveLength(symbols.length);
    symbolElements.forEach((element, index) => {
      // Each symbol should have the variation selector appended
      expect(element.textContent).toBe(`${symbols[index]}${TEXT_VARIATION_SELECTOR}`);
    });
  });

  it('renders empty when symbols array is empty', () => {
    render(<TextSymbol symbols={[]} />);
    const root = screen.getByTestId('text-symbol');
    const symbolElements = root.querySelectorAll(':scope > *');
    expect(symbolElements).toHaveLength(0);
  });

  it('handles empty string symbols', () => {
    render(<TextSymbol symbols={['♠', '', '♣']} />);
    const root = screen.getByTestId('text-symbol');
    const symbolElements = root.querySelectorAll(':scope > *');

    // Should render all 3 children, but empty string returns empty (early return in toTextSymbol)
    expect(symbolElements).toHaveLength(3);
    expect(symbolElements[0].textContent).toBe(`♠${TEXT_VARIATION_SELECTOR}`);
    expect(symbolElements[1].textContent).toBe(''); // Empty string returns empty
    expect(symbolElements[2].textContent).toBe(`♣${TEXT_VARIATION_SELECTOR}`);
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
