import { TextSymbolSize } from './types';

export const determineSymbolSize = (symbol: string) => {
  switch (symbol) {
    case '≌':
    case '܀':
    case '•':
      return TextSymbolSize.small;
    case '▼':
    case '♠':
    case '≠':
      return TextSymbolSize.medium;
    case '∞':
    case 'Ω':
    case 'Δ':
    case '†':
    case '◆':
    case 'Σ':
    case '✱':
    case 'Ж':
    case 'Ο':
    case '‡':
    case 'Ø':
    default:
      return TextSymbolSize.large;
  }
};
