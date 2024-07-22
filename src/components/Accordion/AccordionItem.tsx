import React, { useState } from 'react';
import { getCommonProps } from '../../utils';
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
   * When true applied the lock variation icon.
   */
  isLockedVariation?: boolean;
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
   * Determines whether one or multiple items can be opened at the same time. Default as single.
   */
  type?: 'single' | 'multiple';
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
  isCollapsed,
  setIsCollapsed,
  isLargeVariation,
  isLockedVariation,
  id,
}: AccordionHeaderType) => {
  const handleClick = () => !disable && setIsCollapsed((prevState) => !prevState);
  const icon = disable ? lockIcon : isCollapsed ? plusIcon : minusIcon;
  const dataTestId =
    `${id}-` + (disable ? 'lockedIcon' : isLockedVariation ? 'lockBlueIcon' : isCollapsed ? 'plusIcon' : 'minusIcon');
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
          className={classnames(
            `${baseClassName}__icon`,
            { [`${baseClassName}__icon--lg`]: isLargeVariation },
            isLockedVariation && `${baseClassName}--blue-fill`,
          )}
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
  isLockedVariation,
  variation,
  label,
  isLastItem,
  hasTransition = false,
  children,
  type = 'single',
  ...props
}: AccordionItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Accordion');
  const isLargeVariation = variation === 'lg';
  const accordionItemClassName = `${baseClassName}-item`;
  return (
    <Accordion.Item
      disabled={isLocked}
      value={commonProps['data-testid']}
      className={classnames(accordionItemClassName, { [`${accordionItemClassName}__border-bottom`]: !isLastItem })}
    >
      <AccordionHeader
        disable={isLocked}
        isLargeVariation={isLargeVariation}
        isLockedVariation={isLockedVariation}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        id={type === 'single' ? props?.id : undefined}
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
