import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../Collapsible';
import { HeightUnits } from './utils';
import { DEFAULT_REM_SIZE } from '../../utils/constants';
import { Icon } from '../Icon';

export interface ContentPeekProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique id for component testing
   */
  id?: string;
  /**
   * Child element pass in to display as item content.
   */
  children?: React.ReactNode;
  /**
   * Text for the "Content Expand" button
   */
  contentExpandText?: string;
  /**
   * Text for the "Content Collapse" button
   */
  contentCollapseText?: string;
  /**
   * Maximum height of the content when collapsed
   */
  maxHeight?: number;
  /**
   * Used to set a minimum height for the content before enabling the Peek functionality. Defaults to the same value as maxHeight if not provided.
   */
  minHeightThreshold?: number;
  /**
   * The unit used for setting height values. Defaults to 'px'.
   */
  heightUnits?: HeightUnits;
}

/**
 * ## Overview
 *
 * A component for displaying expandable content with a "ContentPeek" functionality allowing you to see the first part of the content and expand to see more.
 *
 * This component is a wrapper around the Collapsible and Button component and uses the CollapsibleTrigger and CollapsibleContent components to control the expand and collapse functionality.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=7755-5572&t=JCYbkM8yQcdb51UQ-4)
 *
 */
const ContentPeek = forwardRef<HTMLDivElement, ContentPeekProps>(
  (
    {
      className,
      children,
      contentExpandText = 'Read More',
      contentCollapseText = 'Read Less',
      maxHeight = 480,
      minHeightThreshold,
      heightUnits = HeightUnits.px,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ContentPeek');
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const maxHeightInPx = heightUnits === HeightUnits.rem ? maxHeight * DEFAULT_REM_SIZE : maxHeight;
    const minHeightThresholdToRem = minHeightThreshold ? minHeightThreshold * DEFAULT_REM_SIZE : null;
    const minHeightThresholdInPx = heightUnits === HeightUnits.rem ? minHeightThresholdToRem : minHeightThreshold;

    useEffect(() => {
      if (contentRef.current) {
        const threshold = minHeightThresholdInPx ?? maxHeightInPx;
        setHasOverflow(contentRef.current.scrollHeight > threshold);
      }
    }, [maxHeightInPx, minHeightThresholdInPx]);

    useEffect(() => {
      const threshold =
        minHeightThresholdInPx && minHeightThresholdInPx >= maxHeightInPx ? minHeightThresholdInPx : maxHeightInPx;
      contentRef.current?.style.setProperty('--content-peek-max-height', `${threshold}${HeightUnits.px}`);
    }, [maxHeightInPx, minHeightThresholdInPx]);

    const toggleExpand = useCallback(() => {
      setIsExpanded((expanded) => !expanded);
    }, []);

    return (
      <Collapsible
        id={props?.id}
        open={isExpanded}
        onOpenChange={toggleExpand}
        className={classnames(baseClassName, className)}
        ref={ref}
        {...commonProps}
        {...props}
      >
        <CollapsibleContent className={`${baseClassName}-content`} ref={contentRef} forceMount>
          {children}
        </CollapsibleContent>
        {hasOverflow ? (
          <div
            className={classnames(`${baseClassName}-overlay`, {
              [`${baseClassName}-overlay--expanded`]: isExpanded,
              [`${baseClassName}-overlay--gradient`]: hasOverflow && !isExpanded,
            })}
          >
            <div className={`${baseClassName}-overlay-trigger-wrapper`}>
              <CollapsibleTrigger asChild className={`${baseClassName}-overlay-trigger`}>
                <Button variant={ButtonVariants.secondary}>
                  {isExpanded ? <Icon icon="Minus" /> : <Icon icon="Plus" />}
                  {isExpanded ? contentCollapseText : contentExpandText}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        ) : null}
      </Collapsible>
    );
  },
);

ContentPeek.displayName = 'ContentPeek';

export default ContentPeek;
