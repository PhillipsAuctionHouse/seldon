import classNames from 'classnames';
import React, { ComponentProps, forwardRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { SSRMediaQuery } from '../../../providers/SeldonProvider/utils';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import { findChildrenOfType, getCommonProps, px } from '../../../utils';
import Accordion from '../../Accordion/Accordion';
import AccordionItem from '../../Accordion/AccordionItem';
import { Text, TextVariants } from '../../Text';
import NavigationSubmenu, { NavigationSubmenuProps } from '../NavigationSubmenu/NavigationSubmenu';
import NavigationDesktopSubmenu from './NavigationDesktopSubmenu';

export interface NavigationItemWithSubmenuProps extends ComponentProps<'li'> {
  /**
   * Label for the navigation item
   */
  label: string;
  /**
   * ID for the trigger - required for context-based submenu management
   */
  id?: string;
  /**
   * When set by Navigation/NavigationList, render only this variant so list items stay direct children of ul
   * (no SSRMediaQuery wrapper). Prefer isMobile; renderMode is kept for backwards compatibility.
   */
  renderMode?: 'mobile' | 'desktop';
  /**
   * Explicit mobile/desktop flag injected by NavigationList; when set, takes precedence over renderMode.
   */
  isMobile?: boolean;
}

/** Mobile-only: renders trigger and submenu as an accordion (click to expand). */
const MobileNavigationItemWithSubmenu = ({ id, label, children }: NavigationItemWithSubmenuProps) => {
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

const NavigationItemWithSubmenu = forwardRef<HTMLLIElement, NavigationItemWithSubmenuProps>(
  ({ id, label, children, className, onClick, renderMode, isMobile, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'NavigationItemWithSubmenu');
    const navSubmenuElement = findChildrenOfType<NavigationSubmenuProps>(children, NavigationSubmenu);
    const { closeMenu, setActiveSubmenuId } = React.useContext(HeaderContext);
    const itemValue = id ?? baseClassName ?? 'item'; // Radix value for controlled submenu

    const desktopContent = (
      <NavigationDesktopSubmenu
        ref={ref}
        navSubmenuElement={navSubmenuElement}
        itemValue={itemValue}
        baseClassName={baseClassName}
        commonProps={commonProps}
        label={label}
        className={className}
        onClick={onClick}
        closeMenu={closeMenu}
        setActiveSubmenuId={setActiveSubmenuId}
        itemProps={props}
      />
    );

    const forcedMode: 'mobile' | 'desktop' | undefined =
      typeof isMobile === 'boolean' ? (isMobile ? 'mobile' : 'desktop') : renderMode;

    // When isMobile/renderMode is set, render only that variant so <li> stays a direct child of <ul> (no Fresnel div in between).
    if (forcedMode === 'mobile') {
      return (
        <li className={classNames(baseClassName, `${px}-nav__item`)} {...commonProps}>
          <MobileNavigationItemWithSubmenu id={id} label={label} {...commonProps}>
            {navSubmenuElement
              ? React.cloneElement(navSubmenuElement[0], {
                  className: `${baseClassName}__submenu--mobile`,
                  onClick: (e: React.MouseEvent<HTMLElement>) => {
                    navSubmenuElement[0].props?.onClick?.(e);
                    closeMenu?.();
                  },
                })
              : null}
          </MobileNavigationItemWithSubmenu>
        </li>
      );
    }

    if (forcedMode === 'desktop') {
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
              <MobileNavigationItemWithSubmenu id={id} label={label} {...commonProps}>
                {navSubmenuElement
                  ? React.cloneElement(navSubmenuElement[0], {
                      className: `${baseClassName}__submenu--mobile`,
                      onClick: (e: React.MouseEvent<HTMLElement>) => {
                        navSubmenuElement[0].props?.onClick?.(e);
                        closeMenu?.();
                      },
                    })
                  : null}
              </MobileNavigationItemWithSubmenu>
            </li>
          </SSRMediaQuery.Media>
          <SSRMediaQuery.Media greaterThanOrEqual="md">{desktopContent}</SSRMediaQuery.Media>
        </RemoveScroll>
      </>
    );
  },
);

NavigationItemWithSubmenu.displayName = 'NavigationItemWithSubmenu';

export default NavigationItemWithSubmenu;
