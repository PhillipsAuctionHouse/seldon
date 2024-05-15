import { px } from '../../utils';
import { GridItemProps } from './GridItem';

export enum GridItemAlign {
  center = 'center',
  left = 'left',
  right = 'right',
}

export const determineColumnSpanClassName = (
  breakpoint: 'xs' | 'sm' | 'md' | 'lg',
  columnSpan: number,
  align: GridItemProps['align'] = GridItemAlign.center,
): string => {
  return `${px}-grid-item--span-${breakpoint}-${columnSpan} ${px}-grid-item--span-${breakpoint}-${columnSpan}-align-${align}`;
};

export const validateColumnSpans = (xs: number, md: number, lg: number, xl: number) => {
  if (xs > 12 || md > 12 || lg > 12 || xl > 12) {
    console.warn('Column spans must be less than or equal to 12');
    return false;
  }
  if (xs < 1 || md < 1 || lg < 1 || xl < 1) {
    console.warn('Column spans must be greater than or equal to 1');
    return false;
  }
  return true;
};
