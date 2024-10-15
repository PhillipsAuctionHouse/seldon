import React from 'react';
import { getCommonProps } from '../../utils';
import PlusIcon from '../../assets/plus.svg?react';
import MinusIcon from '../../assets/minus.svg?react';
import LockIcon from '../../assets/lock.svg?react';
import classnames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionItemVariant, AccordionHeaderType, AccordionContentType } from './types';
import { getIconClasses } from './utils';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, prevents border bottom style from being applied to the item.
   */
  isLastItem?: boolean;
  /**
   * When true, prevents the user from interacting with the item.
   */
  isLocked?: boolean;
  /**
   * Determines whether the variant on text style is large or small.
   */
  variant?: AccordionItemVariant;
  /**
   * Uniqueid for the Accordion Item.
   */
  id: string;
  /**
   * Accordion item label.
   */
  label: React.ReactNode;
  /**
   * Child element pass in to display as item content.
   */
  children?: React.ReactNode;
  /**
   * When true applied the transition keyframe animation on item expand. Default as false.
   */
  hasTransition?: boolean;
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
  isLargeVariation,
  id,
}: AccordionHeaderType) => {
  const showLock = disable;

  // Render all icons and use css to conditionally show/hide the correct one
  const lockIconComponent = (
    <div>
      <LockIcon
        className={getIconClasses(baseClassName, isLargeVariation, 'lock')}
        data-testid={`${id}-lockedIcon`}
        aria-hidden
      />
    </div>
  );

  const plusIconComponent = (
    <div>
      <PlusIcon
        className={getIconClasses(baseClassName, isLargeVariation, 'plus')}
        data-testid={`${id}-plusIcon`}
        aria-hidden
      />
    </div>
  );

  const minusIconComponent = (
    <div>
      <MinusIcon
        className={getIconClasses(baseClassName, isLargeVariation, 'minus')}
        data-testid={`${id}-minusIcon`}
        aria-hidden
      />
    </div>
  );

  return (
    <Accordion.Trigger
      data-disabled={disable}
      asChild
      className={classnames(baseClassName, { [`${baseClassName}--hoverable`]: !disable }, className)}
    >
      <div data-testid={`${id}-trigger`}>
        <div className={classnames(`${baseClassName}__text`, { [`${baseClassName}__text--lg`]: isLargeVariation })}>
          {children}
        </div>
        {showLock && lockIconComponent}
        {!showLock && plusIconComponent}
        {!showLock && minusIconComponent}
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
  className,
}: AccordionContentType) =>
  disable && children ? (
    <div>{children}</div>
  ) : (
    <Accordion.Content
      asChild
      className={classnames(
        `${baseClassName}__content`,
        { [`${baseClassName}__content--lg`]: isLargeVariation },
        { [`${baseClassName}--transition`]: hasTransition },
        className,
      )}
    >
      {children}
    </Accordion.Content>
  );

const AccordionItem = ({
  isLocked = false,
  variant = AccordionItemVariant.sm,
  id,
  label,
  isLastItem,
  hasTransition = false,
  children,
  ...props
}: AccordionItemProps) => {
  const { className: baseClassName } = getCommonProps({ id }, 'Accordion');
  const isLargeVariation = variant === AccordionItemVariant.lg;
  const accordionItemClassName = `${baseClassName}-item`;

  return (
    <Accordion.Item
      disabled={isLocked}
      value={id}
      className={classnames(accordionItemClassName, {
        [`${accordionItemClassName}__border-bottom`]: !isLastItem,
        [`${accordionItemClassName}--large`]: isLargeVariation,
      })}
      {...props}
    >
      <AccordionHeader
        disable={isLocked}
        isLargeVariation={isLargeVariation}
        id={id}
        baseClassName={`${accordionItemClassName}-label`}
      >
        {label}
      </AccordionHeader>

      <AccordionContent
        disable={isLocked}
        hasTransition={hasTransition}
        isLargeVariation={isLargeVariation}
        baseClassName={accordionItemClassName}
      >
        <div className="radix-accordion-content">{children}</div>
      </AccordionContent>
    </Accordion.Item>
  );
};

export default AccordionItem;
