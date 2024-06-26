import classnames from 'classnames';

import { getCommonProps } from '../../utils';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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
  buttonType?: 'primary' | 'secondary' | 'ghost';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The type of the button.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Name of the button
   */
  name?: string;
  /**
   * Value of the button
   */
  value?: string;
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

const Button = ({
  buttonType = 'primary',
  size = 'md',
  children,
  className,
  isIconLast: iconLast = false,
  type = 'button',
  ...props
}: ButtonProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Button');
  return (
    <button
      {...commonProps}
      type={type}
      className={classnames(
        `${baseClassName}`,
        `${baseClassName}--${size}`,
        `${baseClassName}--${buttonType}`,
        {
          [`${baseClassName}--icon-last`]: iconLast,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
