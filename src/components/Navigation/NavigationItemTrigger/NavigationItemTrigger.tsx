import { getCommonProps, px } from '../../../utils';
import classNames from 'classnames';
import { ComponentProps, forwardRef, MouseEvent, useState } from 'react';
import { Text, TextVariants } from '../../Text';

export interface NavigationItemTriggerProps extends ComponentProps<'li'> {
  /**
   * Label for the navigation item
   */
  label: string;
}

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
    const [isSubmenuOpened, setIsSubmenuOpened] = useState(false);

    const handleClick = (event: MouseEvent<HTMLLIElement>) => {
      onClick?.(event);
      setIsSubmenuOpened(true);
    };
    return (
      <li
        {...commonProps}
        ref={ref}
        aria-expanded={isSubmenuOpened}
        className={classNames(className, baseClassName, `${px}-nav__item`, {
          [`${baseClassName}--hovered`]: isSubmenuOpened,
        })}
        onClick={handleClick}
        onMouseOver={() => setIsSubmenuOpened(true)}
        onMouseOut={() => setIsSubmenuOpened(false)}
        {...props}
      >
        <button className={`${px}-nav__item-trigger`} type="button">
          <label className={`${px}-nav__item--label`}>
            <Text variant={TextVariants.snwHeaderLink}>{label}</Text>
          </label>
        </button>
        <div className={`${baseClassName}__submenu`}>{children}</div>
      </li>
    );
  },
);

NavigationItemTrigger.displayName = 'NavigationItemTrigger';

export default NavigationItemTrigger;
