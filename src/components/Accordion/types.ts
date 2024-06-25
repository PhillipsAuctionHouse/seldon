// Add any additional typescript types here
interface AccordionItemType {
  id?: string;
  key?: string;
  isLastItem?: boolean;
  locked: boolean;
  lockedVariation?: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  lockedContent?: any;
  variation: 'lg' | 'sm';
  label: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  content?: any;
}

export type { AccordionItemType };
