import classnames from 'classnames';

import { px } from '../../utils';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Button contents
   */
  children?: React.ReactNode;
  /**
   * True if button comes after text
   */
  iconLast?: boolean;
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
}

const Button = ({
  buttonType = 'primary',
  size = 'md',
  children,
  className,
  iconLast = false,
  id,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      data-testid={id ? `button-${id}` : `button`}
      id={id}
      type={type}
      className={classnames(
        `${px}-button`,
        `${px}-button--${size}`,
        `${px}-button--${buttonType}`,
        {
          [`${px}-button--icon-last`]: iconLast,
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
