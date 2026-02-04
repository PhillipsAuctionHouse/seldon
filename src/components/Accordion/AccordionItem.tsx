import * as Accordion from '@radix-ui/react-accordion';
import classnames from 'classnames';
import React, { forwardRef, useCallback, useRef } from 'react';
import { Icon } from '../Icon';
import { getCommonProps, px } from '../../utils';
import { AccordionContentType, AccordionHeaderType, AccordionItemVariant } from './types';
import { getIconClasses } from './utils';
import { Text, TextVariants } from '../Text';

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
  id,
  variant = AccordionItemVariant.md,
  onOpen,
  onClose,
}: AccordionHeaderType) => {
  const itemRef = useRef<HTMLButtonElement>(null);
  const showLock = disable;

  const labelVariant = variant === AccordionItemVariant.md ? TextVariants.labelMedium : TextVariants.labelSmall;

  // Render all icons and use css to conditionally show/hide the correct one
  const lockIconComponent = (
    <div>
      <Icon
        icon="Lock"
        height={24}
        width={24}
        className={getIconClasses(baseClassName, variant, 'lock')}
        data-testid={`${id}-lockedIcon`}
        aria-hidden
      />
    </div>
  );

  const plusIconComponent = (
    <div>
      <Icon
        icon="Add"
        height={24}
        width={24}
        className={getIconClasses(baseClassName, variant, 'plus')}
        data-testid={`${id}-plusIcon`}
        aria-hidden
      />
    </div>
  );

  const minusIconComponent = (
    <div>
      <Icon
        icon="Subtract"
        height={24}
        width={24}
        className={getIconClasses(baseClassName, variant, 'minus')}
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
      className={classnames(baseClassName, { [`${baseClassName}--hoverable`]: !disable }, className)}
      ref={itemRef}
      onClick={handleOnToggle}
    >
      <button type="button" data-testid={`${id}-trigger`}>
        <Text className={`${px}-accordion-item-label__text`} variant={labelVariant}>
          {children}
        </Text>
        {showLock && lockIconComponent}
        {!showLock && plusIconComponent}
        {!showLock && minusIconComponent}
      </button>
    </Accordion.Trigger>
  );
};

const AccordionContent = ({
  children,
  baseClassName,
  disable,
  hasTransition,
  className,
  variant = AccordionItemVariant.md,
}: AccordionContentType) =>
  disable && children ? (
    <div className={`${baseClassName}__content--locked`}>{children}</div>
  ) : (
    <Accordion.Content
      asChild
      className={classnames(
        `${baseClassName}__content`,
        { [`${baseClassName}--transition`]: hasTransition },
        className,
      )}
    >
      <Text variant={variant === AccordionItemVariant.md ? TextVariants.bodyMedium : TextVariants.bodySmall}>
        {children}
      </Text>
    </Accordion.Content>
  );

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      isLocked = false,
      variant = AccordionItemVariant.md,
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
          variant={variant}
          disable={isLocked}
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
          variant={variant}
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
