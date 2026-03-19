import classNames from 'classnames';
import React, { forwardRef } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { px } from '../../../utils';
import { Text, TextVariants } from '../../Text';
import type { NavigationSubmenuProps } from '../NavigationSubmenu/NavigationSubmenu';
import type { NavigationItemWithSubmenuProps } from './NavigationItemWithSubmenu';

export interface NavigationDesktopSubmenuProps {
  navSubmenuElement: React.ReactElement<NavigationSubmenuProps>[] | null | undefined;
  itemValue: string;
  baseClassName: string;
  commonProps: Record<string, unknown>;
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  closeMenu?: () => void;
  setActiveSubmenuId?: (id: string | null) => void;
  itemProps: Omit<
    NavigationItemWithSubmenuProps,
    'id' | 'label' | 'children' | 'className' | 'onClick' | 'renderMode' | 'isMobile'
  >;
}

const NavigationDesktopSubmenu = forwardRef<HTMLLIElement, NavigationDesktopSubmenuProps>(
  (
    {
      navSubmenuElement,
      itemValue,
      baseClassName,
      commonProps,
      label,
      className,
      onClick,
      closeMenu,
      setActiveSubmenuId,
      itemProps,
    },
    ref,
  ) => {
    if (navSubmenuElement?.length) {
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
                ? (e: React.MouseEvent<HTMLButtonElement>) => onClick(e as unknown as React.MouseEvent<HTMLLIElement>)
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
              navSubmenuElement[0].props?.onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
              closeMenu?.();
              setActiveSubmenuId?.(null);
            }}
          >
            {React.cloneElement(navSubmenuElement[0], {
              wrapLinksInRadixLink: true,
              onClick: (e: React.MouseEvent<HTMLElement>) => {
                navSubmenuElement[0].props?.onClick?.(e);
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
        {...itemProps}
      >
        <span className={`${px}-nav__item-trigger`}>
          <Text variant={TextVariants.linkStylised}>{label}</Text>
        </span>
      </li>
    );
  },
);

NavigationDesktopSubmenu.displayName = 'NavigationDesktopSubmenu';

export default NavigationDesktopSubmenu;
