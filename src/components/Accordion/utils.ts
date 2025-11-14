import classnames from 'classnames';
import { AccordionVariantKey, AccordionVariants, AccordionItemVariant } from './types';
import { AccordionMultipleProps, AccordionSingleProps } from '@radix-ui/react-accordion';

/**
 * Sets the type and collapsible props based on the variant prop
 * The collapsible prop should only be passed when the variant is single
 */
export const getAccordionVariantProps = (
  variant?: AccordionVariantKey,
  value?: string[] | string,
): AccordionSingleProps | AccordionMultipleProps => {
  const variantProps: AccordionMultipleProps | AccordionSingleProps = { type: 'multiple' };

  if (
    (variant === AccordionVariants.singleCollapsible || variant === AccordionVariants.singleNonCollapsible) &&
    Array.isArray(value)
  ) {
    console.error('The value prop should not be an array when using a single variant');
  }

  if (variant === AccordionVariants.singleCollapsible) {
    return { type: 'single' };
  }

  if (variant === AccordionVariants.singleNonCollapsible) {
    return { type: 'single' };
  }

  return variantProps;
};

/**
 * A helper for getting the classes of the Accordion icons
 * @param className - The className of the component
 * @param variant - The size variant of the accordion item
 * @param iconName - The name of the icon to be displayed
 * @returns the classes that should be applied for the icon
 */
export const getIconClasses = (
  className: string,
  variant: AccordionItemVariant = AccordionItemVariant.md,
  iconName: string,
) =>
  classnames(`${className}__icon`, `${className}-${iconName}__icon`, {
    [`${className}__icon--sm`]: variant === AccordionItemVariant.sm,
  });
