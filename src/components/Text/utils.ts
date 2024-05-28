import { px } from '../../utils';
import { TextVariants } from './types';

export const determineTextClassName = (variant: TextVariants): string => {
  // our javascript const doesn't exactly match the tokens for labels
  const variantWithoutLabel = variant.replace('label', '').replace('CtaSm', 'cta-sm').replace('CtaLg', 'cta-lg');
  return `${px}-text--${variantWithoutLabel.charAt(0).toLowerCase() + variantWithoutLabel.slice(1)}`;
};

export const determineDefaultTextElement = (variant: TextVariants): string => {
  if (variant.includes('body')) return 'p';
  if (variant === TextVariants.labelText) return 'label';
  if (variant.includes('heading')) {
    const headingNumber = !isNaN(parseInt(variant.slice(-1))) ? parseInt(variant.slice(-1)) : 3;
    return `h${headingNumber}`;
  }

  return 'span';
};
