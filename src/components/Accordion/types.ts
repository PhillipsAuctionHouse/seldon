// Add any additional typescript types here
interface AccordionItemType {
  key?: string;
  isLastItem?: boolean;
  locked: boolean;
  lockedVariation?: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  lockedChildren?: any;
  variation: 'lg' | 'sm';
  label: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  children?: any;
}

export type { AccordionItemType };
