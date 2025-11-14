import { AccordionMultipleProps, AccordionSingleProps } from '@radix-ui/react-accordion';

// AccordionHeader Interface
export interface AccordionHeaderType {
  /**
   * Child element pass in to display as header label.
   */
  children?: React.ReactNode;
  /**
   * Option class user may set to header.
   */
  className?: string;
  /**
   * Base class for header component.
   */
  baseClassName: string;
  /*
   * When true, prevents the user from interacting with the header.
   */
  disable: boolean;
  /**
   * Unique id for icon component testing
   */
  id?: string;
  /**
   * Callback function that is called when the header is opened.
   */
  onOpen?: () => void;
  /**
   * Callback function that is called when the header is closed.
   */
  onClose?: () => void;
  /**
   * Determines whether the variant on text style is large or small.
   */
  variant?: AccordionItemVariant;
}

// AccordionContent Interface
export interface AccordionContentType {
  /**
   * Child element pass in to display as content.
   */
  children?: React.ReactNode;
  /**
   * Option class user may set to header.
   */
  className?: string;
  /**
   * Base class for content component.
   */
  baseClassName: string;
  /*
   * When true, hide default content with styles and show the children passed in as is.
   */
  disable: boolean;
  /**
   * When true applied the transition keyframe animation on item expand. Default as false.
   */
  hasTransition?: boolean;

  /**
   * Determines whether the variant on text style is larger or smaller.
   */
  variant?: AccordionItemVariant;
}

export enum AccordionVariants {
  /*
   * Allows multiple elements to be opened at the same time.
   */
  multiple = 'multiple',
  /*
   * Only allows one element opened at a time and allows users to close an open element by clicking on it.
   */
  singleCollapsible = 'singleCollapsible',
  /*
   * Only allows one element opened at a time. Elements cannot be closed by clicking on them.
   */
  singleNonCollapsible = 'singleNonCollapsible',
}
export type AccordionVariantKey = keyof typeof AccordionVariants;

export interface AccordionVariantProps {
  /**
   * Determines whether multiple elements can be opened at the same time or not.
   */
  type: AccordionSingleProps['type'] | AccordionMultipleProps['type'];
  /**
   * Determines if an open element can be closed by clicking on it.
   * Only applicable to the `single` variants.
   */
  collapsible?: boolean;
}

export enum AccordionItemVariant {
  md = 'md',
  sm = 'sm',
}
