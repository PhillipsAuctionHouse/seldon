import { px } from '../../utils';
import { TextVariants } from './types';

export const determineTextClassName = (variant: TextVariants = TextVariants.body1): string => {
  // our javascript const doesn't exactly match the tokens
  switch (variant) {
    // I'm doing this mapping because otherwise the Text actually does the underline work that the Link component is doing
    case TextVariants.email:
      return `${px}-text--bodyMedium`;
    case TextVariants.link:
      return `${px}-text--bodyMedium`;
    case TextVariants.linkSmall:
      return `${px}-text--bodySmall`;
    case TextVariants.linkMedium:
      return `${px}-text--bodyMedium`;
    case TextVariants.linkLarge:
      return `${px}-text--bodyLarge`;
    default:
      return `${px}-text--${variant.charAt(0).toLowerCase() + variant.slice(1)}`;
  }

  return `${px}-text--${variant.charAt(0).toLowerCase() + variant.slice(1)}`;
};

export const determineDefaultTextElement = (variant: TextVariants = TextVariants.body1): string => {
  let loweredVariant = variant.toLowerCase();

  if (variant === TextVariants.blockquote) return 'blockquote';
  if (variant.includes('body')) return 'span';
  if (variant.includes('string')) return 'span';
  if (variant.includes('title')) return 'span';
  if (variant === TextVariants.label) return 'label';
  if (loweredVariant.includes('heading')) {
    loweredVariant = loweredVariant.replace('italic', '');
    const headingNumber = !isNaN(parseInt(loweredVariant.slice(-1))) ? parseInt(loweredVariant.slice(-1)) : 3;
    return `h${headingNumber}`;
  }

  return 'span';
};
