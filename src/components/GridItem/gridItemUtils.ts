import { BreakpointTokens, px } from '../../utils';
import { GridItemProps } from './GridItem';
import { GridItemAlign } from './types';

export const determineColumnSpanClassName = (
  breakpoint: BreakpointTokens,
  columnSpan: number,
  columnStart?: number,
  align: GridItemProps['align'] = GridItemAlign.center,
): string => {
  const colSpanClass = `${px}-grid-item--span-${breakpoint}-${columnSpan}`;
  // If columnStart is set, default align (left) is always used
  const colAlignClass = `${px}-grid-item--span-${breakpoint}-${columnSpan}-align-${columnStart ? GridItemAlign.left : align}`;
  const colStartClass = columnStart ? `${px}-grid-item--start-${breakpoint}-${columnStart}` : '';

  return `${colSpanClass} ${colAlignClass} ${colStartClass}`.replace(/\s+/g, ' ').trim();
};

export const validateColumnSpans = (columnSpans: number[]) => {
  for (let i = 0; i < columnSpans.length; i++) {
    const span = columnSpans[i];
    if (span > 12) {
      console.warn('Column spans must be less than or equal to 12');
      return false;
    }
    if (span < 1) {
      console.warn('Column spans must be greater than or equal to 1');
      return false;
    }
  }
  return true;
};
