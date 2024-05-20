import { px } from '../../utils';
import { GridItemProps } from './GridItem';
import { GridItemAlign } from './types';

export const determineColumnSpanClassName = (
  breakpoint: 'xs' | 'sm' | 'md' | 'lg',
  columnSpan: number,
  align: GridItemProps['align'] = GridItemAlign.center,
): string => {
  return `${px}-grid-item--span-${breakpoint}-${columnSpan} ${px}-grid-item--span-${breakpoint}-${columnSpan}-align-${align}`;
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
