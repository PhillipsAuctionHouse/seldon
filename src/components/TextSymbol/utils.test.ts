import { TextSymbolSize } from './types';
import { determineSymbolSize } from './utils';

describe('determineSymbolSize', () => {
  it('should return small size for small symbols', () => {
    const smallSymbols = ['≌', '܀', '•'];
    smallSymbols.forEach((symbol) => {
      const size = determineSymbolSize(symbol);
      expect(size).toBe(TextSymbolSize.small);
    });
  });

  it('should return medium size for medium symbols', () => {
    const mediumSymbols = ['▼', '♠', '≠'];
    mediumSymbols.forEach((symbol) => {
      const size = determineSymbolSize(symbol);
      expect(size).toBe(TextSymbolSize.medium);
    });
  });

  it('should return large size for large symbols', () => {
    const largeSymbols = ['∞', 'Ω', 'Δ', '†', '◆', 'Σ', '✱', 'Ж', 'Ο', '‡', 'Ø'];
    largeSymbols.forEach((symbol) => {
      const size = determineSymbolSize(symbol);
      expect(size).toBe(TextSymbolSize.large);
    });
  });

  it('should return large size for unknown symbols', () => {
    const size = determineSymbolSize('unknown');
    expect(size).toBe(TextSymbolSize.large);
  });
});
