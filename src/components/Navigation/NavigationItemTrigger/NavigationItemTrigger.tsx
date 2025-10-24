import classNames from 'classnames';
import React, { ComponentProps, forwardRef, useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { SSRMediaQuery } from '../../../providers/SeldonProvider/utils';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import { findChildrenOfType, focusElementById, getCommonProps, px } from '../../../utils';
import { AccordionItemVariant } from '../../Accordion';
import Accordion from '../../Accordion/Accordion';
import AccordionItem from '../../Accordion/AccordionItem';
import { Text, TextVariants } from '../../Text';
import NavigationList, { NavigationListProps } from '../NavigationList/NavigationList';

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
        variant={AccordionItemVariant.lg}
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
    const {
      closeMenu,
      activeSubmenuId,
      setActiveSubmenuId,
      closeTimeoutRef: contextCloseTimeoutRef,
    } = React.useContext(HeaderContext);

    const localCloseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = contextCloseTimeoutRef || localCloseTimeoutRef;

    const isSubmenuOpened = activeSubmenuId === id;

    const handleSubmenuOpen = React.useCallback(() => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      setActiveSubmenuId?.(id || null);

      if (navListElement && navListElement[0]?.props?.id) {
        focusElementById(navListElement[0].props.id, true);
      }
      const triggerElement = ref && 'current' in ref ? ref.current : null;
      if (triggerElement) {
        triggerElement.focus();
      }
    }, [navListElement, ref, id, setActiveSubmenuId, closeTimeoutRef]);

    const handleSubmenuClose = React.useCallback(() => {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveSubmenuId?.(null);
        closeTimeoutRef.current = null;
      }, 200);
    }, [setActiveSubmenuId, closeTimeoutRef]);

    useEffect(() => {
      return () => {
        if (!contextCloseTimeoutRef && closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, [contextCloseTimeoutRef, closeTimeoutRef]);

    return (
      <>
        <RemoveScroll enabled={isSubmenuOpened} allowPinchZoom removeScrollBar={false}>
          <SSRMediaQuery.Media lessThan="md">
            <MobileNavigationItemTrigger id={id} label={label} {...commonProps}>
              {navListElement
                ? React.cloneElement(navListElement[0], {
                    className: `${baseClassName}__submenu--mobile`,
                    onClick: (e: React.MouseEvent<HTMLElement>) => {
                      navListElement[0].props?.onClick?.(e);
                      setActiveSubmenuId?.(null);
                      closeMenu?.();
                    },
                  })
                : null}
            </MobileNavigationItemTrigger>
          </SSRMediaQuery.Media>

          <SSRMediaQuery.Media greaterThanOrEqual="md">
            <li
              {...commonProps}
              ref={ref}
              aria-expanded={isSubmenuOpened}
              className={classNames(className, baseClassName, `${px}-nav__item`, {
                [`${baseClassName}--hovered`]: isSubmenuOpened,
              })}
              onClick={onClick}
              onMouseOver={handleSubmenuOpen}
              onMouseOut={handleSubmenuClose}
              {...props}
            >
              <button className={`${px}-nav__item-trigger`} type="button">
                <Text variant={TextVariants.linkStylised}>{label}</Text>
              </button>
              {navListElement
                ? React.cloneElement(navListElement[0], {
                    className: `${baseClassName}__submenu`,
                    onClick: (e: React.MouseEvent<HTMLElement>) => {
                      navListElement[0].props?.onClick?.(e);
                      setActiveSubmenuId?.(null);
                      closeMenu?.();
                    },
                  })
                : null}
            </li>
          </SSRMediaQuery.Media>
        </RemoveScroll>
      </>
    );
  },
);

NavigationItemTrigger.displayName = 'NavigationItemTrigger';

export default NavigationItemTrigger;
