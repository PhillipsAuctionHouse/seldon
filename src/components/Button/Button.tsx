import classnames from 'classnames';

import { CommonProps, px } from '../../utils';

export interface ButtonProps extends CommonProps, Record<string, unknown> {
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * True if button comes after text
   */
  iconLast?: boolean;
  /**
   * Optional click handler
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void | unknown;
  /**
   * Is this the principal call to action on the page?
   */
  buttonType?: 'primary' | 'secondary' | 'ghost';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ buttonType = 'primary', size = 'md', children, iconLast = false, id, ...props }: ButtonProps) => {
  return (
    <button
      data-testid={id ? `button-${id}` : `button`}
      id={id}
      type="button"
      className={classnames(`${px}-button`, `${px}-button--${size}`, `${px}-button--${buttonType}`, {
        [`${px}-button--icon-last`]: iconLast,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
