import { AccordionVariantKey, AccordionVariants } from './types';

export interface AccordionVariantProps {
  /**
   * Determines whether multiple elements can be opened at the same time or not.
   */
  type: 'single' | 'multiple';
  /**
   * Determines if an open element can be closed by clicking on it.
   * Only applicable to the `single` variants.
   */
  collapsible?: boolean;
}

/**
 * Sets the type and collapsible props based on the variant prop
 * The collapsible prop should only be passed when the variant is single
 */
export const getAccordionVariantProps = (variant?: AccordionVariantKey): AccordionVariantProps => {
  const variantProps: AccordionVariantProps = { type: 'multiple' };

  if (variant === AccordionVariants.singleCollapsible) {
    variantProps.type = 'single';
    variantProps.collapsible = true;
  }

  if (variant === AccordionVariants.singleNonCollapsible) {
    variantProps.type = 'single';
    variantProps.collapsible = false;
  }

  return variantProps;
};
