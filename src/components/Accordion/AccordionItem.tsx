import React, { useState } from 'react';
import { getCommonProps, noOp } from '../../utils';
import plusIcon from '../../assets/plus.svg';
import minusIcon from '../../assets/minus.svg';
import lockIcon from '../../assets/lock.svg';
import classnames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionHeaderType, AccordionContentType } from './types';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, prevents border bottom style from being applied to the item.
   */
  isLastItem?: boolean;
  /**
   * When true, prevents the user from interacting with the item.
   */
  isLocked: boolean;
  /**
   * Determines whether the variation on text style is large or small.
   */
  variation: string;
  /**
   * Text string for the Accordion header for label.
   */
  label: string;
  /**
   * Child element pass in to display as item content.
   */
  children?: React.ReactNode;
  /**
   * When true applied the transition keyframe animation on item expand. Default as false.
   */
  hasTransition?: boolean;
  /**
   * When true, isCollapsed won't be toggled.
   */
  isControlled?: boolean;
}
/**
 * ## Overview
 *
 * A single Accordion Item from a list
 */

const AccordionHeader = ({
  children,
  className,
  baseClassName,
  disable,
  isCollapsed,
  setIsCollapsed,
  isLargeVariation,
  id,
}: AccordionHeaderType) => {
  const handleClick = () => !disable && setIsCollapsed((prevState) => !prevState);
  const icon = disable ? lockIcon : isCollapsed ? plusIcon : minusIcon;
  const dataTestId = `${id}-` + (disable ? 'lockedIcon' : isCollapsed ? 'plusIcon' : 'minusIcon');
  return (
    <Accordion.Trigger
      data-disabled={disable}
      asChild
      className={classnames(baseClassName, { [`${baseClassName}--hoverable`]: !disable }, className)}
    >
      <div onClick={handleClick} data-testid={`${id}-trigger`}>
        <div className={classnames(`${baseClassName}__text`, { [`${baseClassName}__text--lg`]: isLargeVariation })}>
          {children}
        </div>
        <img
          className={classnames(`${baseClassName}__icon`, { [`${baseClassName}__icon--lg`]: isLargeVariation })}
          src={icon}
          data-testid={dataTestId}
          aria-hidden
        />
      </div>
    </Accordion.Trigger>
  );
};

const AccordionContent = ({
  children,
  baseClassName,
  disable,
  hasTransition,
  isLargeVariation,
  isCollapsed,
  className,
}: AccordionContentType) => (
  <>
    {disable && children ? (
      <div>{children}</div>
    ) : (
      <Accordion.Content
        asChild
        className={classnames(
          { [`${baseClassName}__content--lg`]: isLargeVariation },
          { [`${baseClassName}--transition`]: hasTransition },
          { [`${baseClassName}--expanded`]: !isCollapsed },
          className,
        )}
      >
        {children}
      </Accordion.Content>
    )}
  </>
);

const AccordionItem = ({
  isLocked,
  variation,
  label,
  isLastItem,
  hasTransition = false,
  children,
  isControlled = true,
  ...props
}: AccordionItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { className: baseClassName } = getCommonProps(props, 'Accordion');
  const isLargeVariation = variation === 'lg';
  const accordionItemClassName = `${baseClassName}-item`;

  return (
    <Accordion.Item
      disabled={isLocked}
      value={label}
      className={classnames(accordionItemClassName, { [`${accordionItemClassName}__border-bottom`]: !isLastItem })}
    >
      <AccordionHeader
        disable={isLocked}
        isLargeVariation={isLargeVariation}
        isCollapsed={isCollapsed}
        setIsCollapsed={isControlled ? setIsCollapsed : noOp}
        id={props?.id}
        baseClassName={`${accordionItemClassName}-label`}
      >
        {label}
      </AccordionHeader>

      <AccordionContent
        disable={isLocked}
        hasTransition={hasTransition}
        isLargeVariation={isLargeVariation}
        isCollapsed={isCollapsed}
        baseClassName={accordionItemClassName}
      >
        {children}
      </AccordionContent>
    </Accordion.Item>
  );
};

export default AccordionItem;
