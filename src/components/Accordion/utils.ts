import classnames from 'classnames';
import { AccordionType, AccordionVariantKey, AccordionVariantProps, AccordionVariants } from './types';

/**
 * Sets the type and collapsible props based on the variant prop
 * The collapsible prop should only be passed when the variant is single
 */
export const getAccordionVariantProps = (variant?: AccordionVariantKey): AccordionVariantProps => {
  const variantProps: AccordionVariantProps = { type: AccordionType.multiple };

  if (variant === AccordionVariants.singleCollapsible) {
    variantProps.type = AccordionType.single;
    variantProps.collapsible = true;
  }

  if (variant === AccordionVariants.singleNonCollapsible) {
    variantProps.type = AccordionType.single;
    variantProps.collapsible = false;
  }

  return variantProps;
};

/**
 * A helper for getting the classes of the Accordion icons
 * @param className - The className of the component
 * @param isLargeVariation - Determines whether the variation on text style is large or small.
 * @param iconName - The name of the icon to be displayed
 * @returns the classes that should be applied for the icon
 */
export const getIconClasses = (className: string, isLargeVariation: boolean, iconName: string) =>
  classnames(`${className}__icon`, `${className}-${iconName}__icon`, {
    [`${className}__icon--lg`]: isLargeVariation,
  });
