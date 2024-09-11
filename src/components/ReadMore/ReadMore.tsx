import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../Collapsible';
import PlusIcon from '../../assets/plus.svg?react';
import MinusIcon from '../../assets/minus.svg?react';

export interface ReadMoreProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique id for component testing
   */
  id?: string;
  /**
   * Child element pass in to display as item content.
   */
  children?: React.ReactNode;
  /**
   * Text for the "Read More" button
   */
  readMoreText?: string;
  /**
   * Text for the "Read Less" button
   */
  readLessText?: string;
  /**
   * Maximum height of the content when collapsed
   */
  maxHeight?: number;
}

/**
 * ## Overview
 *
 * A component for displaying expandable content with a "Read More" functionality.
 *
 * This component is a wrapper around the Collapsible and Button component and uses the CollapsibleTrigger and CollapsibleContent components to control the expand and collapse functionality.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=7755-5572&t=JCYbkM8yQcdb51UQ-4)
 *
 */
const ReadMore = forwardRef<HTMLDivElement, ReadMoreProps>(
  ({ className, children, readMoreText = 'Read More', readLessText = 'Read Less', maxHeight = 480, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ReadMore');
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (contentRef.current) {
        setHasOverflow(contentRef.current.scrollHeight > maxHeight);
      }
    }, [children, maxHeight]);

    const toggleExpand = useCallback(() => {
      setIsExpanded((expanded) => !expanded);
    }, []);

    return (
      <Collapsible
        id={props?.id}
        open={isExpanded}
        onOpenChange={toggleExpand}
        className={classnames(baseClassName, className)}
        style={
          {
            '--read-more-max-height': `${maxHeight}px`,
          } as React.CSSProperties
        }
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
                  {isExpanded ? <MinusIcon /> : <PlusIcon />}
                  {isExpanded ? readLessText : readMoreText}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        ) : null}
      </Collapsible>
    );
  },
);

ReadMore.displayName = 'ReadMore';

export default ReadMore;
