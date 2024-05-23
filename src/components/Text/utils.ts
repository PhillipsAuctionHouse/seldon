import { px } from '../../utils';
import { TextVariants } from './types';

export const determineTextClassName = (variant: TextVariants): string => `${px}-text--${variant}`;

export const determineDefaultTextElement = (variant: TextVariants): string => {
  if (variant.includes('body')) return 'p';
  if (variant === TextVariants.labelText) return 'label';
  if (variant.includes('heading')) {
    return `h${variant.slice(-1)}`;
  }
  return 'span';
};
