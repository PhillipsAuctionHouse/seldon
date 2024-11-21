import * as Accordion from '@radix-ui/react-accordion';
import classnames from 'classnames';
import React, { forwardRef, useCallback, useRef } from 'react';
import LockIcon from '../../assets/lock.svg?react';
import MinusIcon from '../../assets/minus.svg?react';
import PlusIcon from '../../assets/plus.svg?react';
import { getCommonProps } from '../../utils';
import { AccordionContentType, AccordionHeaderType, AccordionItemVariant } from './types';
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
  /**
   * Number of milliseconds for the expansion transition. Defaults to 250.
   */
  transitionTimeInMs?: number;
  /**
   * Callback function that is called when the item is opened.
   */
  onOpen?: () => void;
  /**
   * Callback function that is called when the item is closed.
   */
  onClose?: () => void;
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
  onOpen,
  onClose,
}: AccordionHeaderType) => {
  const itemRef = useRef<HTMLButtonElement>(null);
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

  const handleOnToggle = useCallback(() => {
    const isOpening = itemRef.current?.getAttribute('data-state') === 'closed';
    if (isOpening) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [onOpen, onClose]);

  return (
    <Accordion.Trigger
      data-disabled={disable}
      asChild
      className={classnames(
        baseClassName,
        { [`${baseClassName}--large`]: isLargeVariation },
        { [`${baseClassName}--hoverable`]: !disable },
        className,
      )}
      ref={itemRef}
      onClick={handleOnToggle}
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
    <div className={`${baseClassName}__content--locked`}>{children}</div>
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

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      isLocked = false,
      variant = AccordionItemVariant.sm,
      id,
      label,
      isLastItem,
      hasTransition = false,
      children,
      className,
      transitionTimeInMs = 250,
      onOpen,
      onClose,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName } = getCommonProps({ id }, 'Accordion');
    const isLargeVariation = variant === AccordionItemVariant.lg;
    const accordionItemClassName = `${baseClassName}-item`;

    return (
      <Accordion.Item
        disabled={isLocked}
        value={id}
        style={{ ['--seldon-accordion-transition-time']: `${transitionTimeInMs}ms` } as React.CSSProperties}
        className={classnames(accordionItemClassName, className, {
          [`${accordionItemClassName}__border-bottom`]: !isLastItem,
        })}
        ref={ref}
        {...props}
      >
        <AccordionHeader
          disable={isLocked}
          isLargeVariation={isLargeVariation}
          id={id}
          baseClassName={`${accordionItemClassName}-label`}
          onOpen={onOpen}
          onClose={onClose}
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
  },
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
