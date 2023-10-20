import classnames from 'classnames';

import { CommonProps, px } from '../../utils';

export interface ButtonProps extends CommonProps {
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
  onClick?: () => void;
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ primary = true, size = 'md', children, iconLast = false, id, ...props }: ButtonProps) => {
  return (
    <button
      data-testid={id ? `button-${id}` : `button`}
      id={id}
      type="button"
      className={classnames(`${px}-button`, `${px}-button--${size}`, {
        [`${px}-button--secondary`]: !primary,
        [`${px}-button--icon-last`]: iconLast,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
