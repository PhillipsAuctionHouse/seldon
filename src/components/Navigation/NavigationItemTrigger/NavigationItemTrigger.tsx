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
  /**
   * When set by Navigation/NavigationList, render only this variant so list items stay direct children of ul (no SSRMediaQuery wrapper).
   */
  renderMode?: 'mobile' | 'desktop';
}

/** Mobile-only: renders trigger and submenu as an accordion (click to expand). */
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
const renderDesktopContent = (
  navListElement: React.ReactElement<NavigationListProps>[] | null | undefined,
  itemValue: string,
  baseClassName: string,
  commonProps: Record<string, unknown>,
  opts: {
    ref: React.Ref<HTMLLIElement>;
    className?: string;
    label: string;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    closeMenu?: () => void;
    setActiveSubmenuId?: (id: string | null) => void;
    props: Omit<NavigationItemTriggerProps, 'id' | 'label' | 'children' | 'className' | 'onClick' | 'renderMode'>;
  },
) => {
  const { ref, className, label, onClick, closeMenu, setActiveSubmenuId, props } = opts;
  if (navListElement?.length) {
    return (
      <NavigationMenu.Item
        value={itemValue}
        ref={ref as React.Ref<HTMLLIElement>}
        className={classNames(className, baseClassName, `${px}-nav__item`)}
      >
        <NavigationMenu.Trigger
          aria-label={label}
          className={`${px}-nav__item-trigger-wrapper`}
          data-testid={commonProps['data-testid']}
          onClick={
            onClick
              ? (e: React.MouseEvent<HTMLButtonElement>) =>
                  onClick(e as unknown as React.MouseEvent<HTMLLIElement>)
              : undefined
          }
        >
          <span className={`${px}-nav__item-trigger`}>
            <Text variant={TextVariants.linkStylised}>{label}</Text>
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content
          className={`${baseClassName}__submenu`}
          aria-label={`${label} submenu`}
          onSelect={(e) => {
            navListElement[0].props?.onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
            closeMenu?.();
            setActiveSubmenuId?.(null);
          }}
        >
          {React.cloneElement(navListElement[0], {
            wrapLinksInRadixLink: true,
            onClick: (e: React.MouseEvent<HTMLElement>) => {
              navListElement[0].props?.onClick?.(e);
              closeMenu?.();
              setActiveSubmenuId?.(null);
            },
          })}
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    );
  }
  return (
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
  );
};

const NavigationItemTrigger = forwardRef<HTMLLIElement, NavigationItemTriggerProps>(
  ({ id, label, children, className, onClick, renderMode, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'NavigationItemTrigger');
    const navListElement = findChildrenOfType<NavigationListProps>(children, NavigationList);
    const { closeMenu, setActiveSubmenuId } = React.useContext(HeaderContext);
    const itemValue = id ?? baseClassName ?? 'item'; // Radix value for controlled submenu

    const desktopContent = renderDesktopContent(navListElement, itemValue, baseClassName, commonProps, {
      ref,
      className,
      label,
      onClick,
      closeMenu,
      setActiveSubmenuId,
      props,
    });

    // When renderMode is set, render only that variant so <li> stays a direct child of <ul> (no Fresnel div in between).
    if (renderMode === 'mobile') {
      return (
        <li className={classNames(baseClassName, `${px}-nav__item`)} {...commonProps}>
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
        </li>
      );
    }

    if (renderMode === 'desktop') {
      return desktopContent;
    }

    // Legacy: no renderMode (e.g. list not from Navigation clone). Keep both variants with SSRMediaQuery.
    // Omit data-testid from the mobile wrapper li so getByTestId finds the desktop trigger (hover/aria-expanded tests).
    const { 'data-testid': _skipTestIdOnWrapper, ...commonPropsWithoutTestId } = commonProps as Record<
      string,
      unknown
    > & { 'data-testid'?: string };
    return (
      <>
        <RemoveScroll enabled={false} allowPinchZoom removeScrollBar={false}>
          <SSRMediaQuery.Media lessThan="md">
            <li className={classNames(baseClassName, `${px}-nav__item`)} {...commonPropsWithoutTestId}>
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
            </li>
          </SSRMediaQuery.Media>
          <SSRMediaQuery.Media greaterThanOrEqual="md">{desktopContent}</SSRMediaQuery.Media>
        </RemoveScroll>
      </>
    );
  },
);

NavigationItemTrigger.displayName = 'NavigationItemTrigger';

export default NavigationItemTrigger;
