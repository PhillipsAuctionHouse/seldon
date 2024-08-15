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
  /*
   * When true, shows the locked icon.
   */
  isCollapsed: boolean;
  /*
   * When called it toggles the icon svg displayed.
   */
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  /*
   * When true, shows the large variation text style.
   */
  isLargeVariation: boolean;
  /**
   * Unique id for icon component testing
   */
  id?: string;
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
  /*
   * When true, shows the large variation text style.
   */
  isLargeVariation: boolean;
  /*
   * When true, and not disabled, hide the children passed in.
   */
  isCollapsed: boolean;
}
