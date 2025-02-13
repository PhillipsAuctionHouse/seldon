import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { ButtonVariants } from './types';
import { forwardRef, useState } from 'react';

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
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | undefined;
  /**
   * Is this the principal call to action on the page?
   */
  variant?: ButtonVariants;
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
   * The target of the link (e.g. _blank). To be combined with href.
   */
  target?: string;
  /**
   * prefetch the link
   */
  prefetch?: 'none' | 'intent' | 'render' | 'viewport';
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
      children,
      className,
      isIconLast: iconLast = false,
      type = 'button',
      isDisabled = false,
      href,
      target,
      prefetch = 'none',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Button');
    const [linkHovered, setLinkHovered] = useState(false);
    if (href) {
      return (
        <>
          <a
            {...commonProps}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            href={href}
            className={classnames(
              `${baseClassName}`,
              `${baseClassName}--${variant}`,
              {
                [`${baseClassName}--icon-last`]: iconLast,
              },
              className,
            )}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            onMouseOver={() => setLinkHovered(true)}
            onClick={props.onClick}
          >
            {children}
          </a>
          {prefetch === 'intent' && linkHovered && <link data-testid="prefetch-link" rel="prefetch" href={href} />}
          {prefetch === 'render' && <link data-testid="prefetch-link" rel="prefetch" href={href} />}
        </>
      );
    } else {
      return (
        <button
          {...commonProps}
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          type={type}
          className={classnames(
            `${baseClassName}`,
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
