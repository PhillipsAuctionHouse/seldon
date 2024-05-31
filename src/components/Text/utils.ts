import { px } from '../../utils';
import { TextVariants } from './types';

export const determineTextClassName = (variant: TextVariants = TextVariants.body1): string => {
  // our javascript const doesn't exactly match the tokens
  const tokenVariant = variant.replace('ctaSm', 'cta-sm').replace('ctaLg', 'cta-lg');

  return `${px}-text--${tokenVariant.charAt(0).toLowerCase() + tokenVariant.slice(1)}`;
};

export const determineDefaultTextElement = (variant: TextVariants = TextVariants.body1): string => {
  if ([TextVariants.display0, TextVariants.display1].includes(variant)) return 'h1';
  if ([TextVariants.display2, TextVariants.display3, TextVariants.display4].includes(variant)) return 'h3';
  if (variant === TextVariants.blockquote) return 'blockquote';

  if (variant.includes('body')) return 'p';
  if (variant === TextVariants.label) return 'label';
  if (variant.includes('heading')) {
    const headingNumber = !isNaN(parseInt(variant.slice(-1))) ? parseInt(variant.slice(-1)) : 3;
    return `h${headingNumber}`;
  }

  return 'span';
};
