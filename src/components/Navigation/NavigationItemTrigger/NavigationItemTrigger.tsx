import classNames from 'classnames';
import React, { ComponentProps, forwardRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { SSRMediaQuery } from '../../../providers/SeldonProvider/utils';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import { findChildrenOfType, getCommonProps, px } from '../../../utils';
import Accordion from '../../Accordion/Accordion';
import AccordionItem from '../../Accordion/AccordionItem';
import { Text, TextVariants } from '../../Text';
import NavigationList, { NavigationListProps } from '../NavigationList/NavigationList';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export interface NavigationItemTriggerProps extends ComponentProps<'li'> {
  /**
   * Label for the navigation item
   */
  label: string;
  /**
   * ID for the trigger - required for context-based submenu management
   */
  id?: string;
}

const MobileNavigationItemTrigger = ({ id, label, children }: NavigationItemTriggerProps) => {
  const { isMenuOpen } = React.useContext(HeaderContext);

  return (
    <Accordion key={`accordion-key-${label}-${isMenuOpen}`}>
      <AccordionItem
        hasTransition
        key={`accordion-key-${label}`}
        id={`accordion-item-${id}`}
        label={<Text variant={TextVariants.linkStylised}>{label}</Text>}
      >
        {children}
      </AccordionItem>
    </Accordion>
  );
};

/**
 * ## Overview
 *
 * Supports clicking in mobile mode and hovering in desktop mode to expand the child navigation lists
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10570-6295&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-languageselector--overview)
 */
const NavigationItemTrigger = forwardRef<HTMLLIElement, NavigationItemTriggerProps>(
  ({ id, label, children, className, onClick, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'NavigationItemTrigger');
    const navListElement = findChildrenOfType<NavigationListProps>(children, NavigationList);
    const { closeMenu } = React.useContext(HeaderContext);
    const itemValue = id ?? baseClassName ?? 'item';

    return (
      <>
        <RemoveScroll enabled={false} allowPinchZoom removeScrollBar={false}>
          <SSRMediaQuery.Media lessThan="md">
            <MobileNavigationItemTrigger id={id} label={label} {...commonProps}>
              {navListElement
                ? React.cloneElement(navListElement[0], {
                    className: `${baseClassName}__submenu--mobile`,
                    onClick: (e: React.MouseEvent<HTMLElement>) => {
                      navListElement[0].props?.onClick?.(e);
                      closeMenu?.();
                    },
                  })
                : null}
            </MobileNavigationItemTrigger>
          </SSRMediaQuery.Media>

          <SSRMediaQuery.Media greaterThanOrEqual="md">
            {navListElement ? (
              <NavigationMenu.Item
                value={itemValue}
                ref={ref as React.Ref<HTMLLIElement>}
                className={classNames(className, baseClassName, `${px}-nav__item`)}
              >
                <NavigationMenu.Trigger
                  className={`${px}-nav__item-trigger-wrapper`}
                  onClick={onClick ? (e: React.MouseEvent<HTMLButtonElement>) => onClick(e as unknown as React.MouseEvent<HTMLLIElement>) : undefined}
                >
                  <span className={`${px}-nav__item-trigger`}>
                    <Text variant={TextVariants.linkStylised}>{label}</Text>
                  </span>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className={`${baseClassName}__submenu`}
                  onSelect={(e) => {
                    navListElement[0].props?.onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
                    closeMenu?.();
                  }}
                >
                  {React.cloneElement(navListElement[0], {
                    onClick: (e: React.MouseEvent<HTMLElement>) => {
                      navListElement[0].props?.onClick?.(e);
                      closeMenu?.();
                    },
                  })}
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : (
              <li
                {...commonProps}
                ref={ref}
                className={classNames(className, baseClassName, `${px}-nav__item`)}
                onClick={onClick}
                {...props}
              >
                <span className={`${px}-nav__item-trigger`}>
                  <Text variant={TextVariants.linkStylised}>{label}</Text>
                </span>
              </li>
            )}
          </SSRMediaQuery.Media>
        </RemoveScroll>
      </>
    );
  },
);

NavigationItemTrigger.displayName = 'NavigationItemTrigger';

export default NavigationItemTrigger;
