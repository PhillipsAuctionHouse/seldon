import classnames from 'classnames';

import { px } from '../../utils';

export interface SplitPanelProps extends React.HTMLAttributes<HTMLFormElement> {
  /**
   * Optional element to render in place of a section e.g. div, span, etc
   */
  element?: React.ElementType;
  /**
   * Boolean that will determine if the split panel has a border between panels at large screens
   */
  hasBorder?: boolean;
  /**
   * Component to render in the left side of the split panel
   */
  leftComponent?: React.ReactElement;
  /**
   * Component to render in the right side of the split panel
   */
  rightComponent?: React.ReactElement;
}

/**
 * ## Overview
 *
 * A component for splitting content into two sections. The sections are split 50/50 that stack on the default and 'sm' break points and are side by side at bigger screen sizes.
 *
 * [Figma Link](https://www.figma.com/file/Hp2FyltbOmRxTuw9kSwBAd/EPIC-About-Us?type=design&node-id=635-34713&mode=design&t=wKZW1vKP8WePUjrH-0)
 */
const SplitPanel = ({
  className,
  element: Element = 'section',
  hasBorder = true,
  id,
  leftComponent,
  rightComponent,
  ...props
}: SplitPanelProps) => {
  return (
    <Element
      data-testid={id ? id : `split-panel`}
      id={id}
      className={classnames(`${px}-split-panel`, className, { [`${px}-split-panel--borderless`]: !hasBorder })}
      {...props}
    >
      <div className={classnames(`${px}-split-panel__left`, { [`${className}-split-panel__left`]: className })}>
        {leftComponent}
      </div>
      <div className={classnames(`${px}-split-panel__right`, { [`${className}-split-panel__right`]: className })}>
        {rightComponent}
      </div>
    </Element>
  );
};

export default SplitPanel;
