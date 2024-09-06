import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../Collapsible';
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
const ReadMore = ({
  className,
  children,
  readMoreText = 'Read More',
  readLessText = 'Read Less',
  maxHeight = 480,
  ...props
}: ReadMoreProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'read-more');
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHasOverflow(contentRef.current.scrollHeight > maxHeight);
    }
  }, [children, maxHeight]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={toggleExpand}
      className={classnames(baseClassName, className, {
        hasOverflow: hasOverflow,
      })}
      style={
        {
          '--read-more-max-height': `${maxHeight}px`,
        } as React.CSSProperties
      }
      {...commonProps}
      id={props?.id}
    >
      {hasOverflow && (
        <div className={`${baseClassName}-overlay`}>
          <div
            className={classnames(`${baseClassName}-gradient`, {
              isClosed: !isExpanded,
            })}
          />
          <CollapsibleTrigger asChild>
            <Button variant={ButtonVariants.secondary}>{isExpanded ? readLessText : readMoreText}</Button>
          </CollapsibleTrigger>
        </div>
      )}
      <CollapsibleContent className={`${baseClassName}-content`} ref={contentRef} forceMount>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ReadMore;
