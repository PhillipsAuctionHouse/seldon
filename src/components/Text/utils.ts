import { px } from '../../utils';
import { TextVariants } from './types';

export const determineTextClassName = (variant: TextVariants = TextVariants.bodyLg): string => {
  // our javascript const doesn't exactly match the tokens

  return `${px}-text--${variant.charAt(0).toLowerCase() + variant.slice(1)}`;
};

export const determineDefaultTextElement = (variant: TextVariants = TextVariants.bodyLg): string => {
  let loweredVariant = variant.toLowerCase();

  if (variant === TextVariants.blockquote) return 'blockquote';
  if (variant.includes('body')) return 'span';
  if (variant.includes('string')) return 'span';
  if (variant.includes('title')) return 'span';
  if (variant.includes('eyebrow')) return 'span';
  if (variant === TextVariants.label) return 'label';
  if (loweredVariant.includes('heading')) {
    loweredVariant = loweredVariant.replace('italic', '');
    const headingNumber = !isNaN(parseInt(loweredVariant.slice(-1))) ? parseInt(loweredVariant.slice(-1)) : 3;
    return `h${headingNumber}`;
  }

  return 'span';
};
