import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import { ButtonVariants } from './types';
import { forwardRef } from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  /**
   * Button contents
   */
  children?: React.ReactNode;
  /**
   * True if button comes after text
   */
  isIconLast?: boolean;
  /**
   * Optional click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  /**
   * Is this the principal call to action on the page?
   */
  variant?: ButtonVariants;
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The type of the button.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Should the button be disabled?
   */
  isDisabled?: boolean;
  /**
   * The href of the button. This will make the button render as an anchor tag.
   */
  href?: string;
  /**
   * The target of the link (e.g. _blank)
   */
  target?: string;
}

/**
 * ## Overview
 *
 * A component for adding a button component.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=4433-163014&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-button--overview)
 */

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = ButtonVariants.primary,
      size = 'md',
      children,
      className,
      isIconLast: iconLast = false,
      type = 'button',
      isDisabled = false,
      href,
      target,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Button');
    if (href) {
      return (
        <a
          {...commonProps}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          className={classnames(`${baseClassName}`, `${baseClassName}--${size}`, `${baseClassName}--${variant}`, {
            [`${baseClassName}--icon-last`]: iconLast,
          })}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    } else {
      return (
        <button
          {...commonProps}
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          type={type}
          className={classnames(
            `${baseClassName}`,
            `${baseClassName}--${size}`,
            `${baseClassName}--${variant}`,
            {
              [`${baseClassName}--icon-last`]: iconLast,
            },
            className,
          )}
          disabled={isDisabled}
          {...props}
        >
          {children}
        </button>
      );
    }
  },
);

Button.displayName = 'Button';
export default Button;
