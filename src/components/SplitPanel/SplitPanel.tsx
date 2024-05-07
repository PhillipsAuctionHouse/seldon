import classnames from 'classnames';

import { px } from '../../utils';

export interface SplitPanelProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional element to render in place of a section e.g. div, span, etc
   */
  element?: React.ElementType;
  /**
   * Boolean that will determine if the split panel has a border between panels at large screens
   */
  hasBorder?: boolean;
}

/**
 * ## Overview
 *
 * A component for splitting content into two sections. The sections are split 50/50 that stack on the default and 'sm' break points and are side by side at bigger screen sizes.
 *
 * [Figma Link](https://www.figma.com/file/Hp2FyltbOmRxTuw9kSwBAd/EPIC-About-Us?type=design&node-id=635-34713&mode=design&t=wKZW1vKP8WePUjrH-0)
 */
const SplitPanel = ({
  children,
  className,
  element: Element = 'section',
  hasBorder = true,
  id,
  ...props
}: SplitPanelProps) => {
  return (
    <Element
      data-testid={id ? id : `split-panel`}
      id={id}
      className={classnames(`${px}-split-panel`, className, { [`${px}-split-panel--borderless`]: !hasBorder })}
      {...props}
    >
      {children}
    </Element>
  );
};

export default SplitPanel;
