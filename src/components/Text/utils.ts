import { px } from '../../utils';
import { TextVariants } from './types';

export const determineTextClassName = (variant: TextVariants = TextVariants.body1): string => {
  // our javascript const doesn't exactly match the tokens

  return `${px}-text--${variant.charAt(0).toLowerCase() + variant.slice(1)}`;
};

export const determineDefaultTextElement = (variant: TextVariants = TextVariants.body1): string => {
  if (variant === TextVariants.blockquote) return 'blockquote';
  if (variant.includes('body')) return 'p';
  if (variant.includes('string')) return 'span';
  if (variant.includes('title')) return 'span';
  if (variant === TextVariants.label) return 'label';
  if (variant.includes('heading')) {
    const headingNumber = !isNaN(parseInt(variant.slice(-1))) ? parseInt(variant.slice(-1)) : 3;
    return `h${headingNumber}`;
  }

  return 'span';
};
