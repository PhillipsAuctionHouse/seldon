import classnames from 'classnames';

import { px } from '../../utils';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean ;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: React.ReactElement | string;
  /**
  * Unique id for component
  */
  id?: string ;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */

const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  id,
  ...props
}: ButtonProps) => {
  return (
    <button
      data-testid={id ? `button-${id}` : `button`}
      type="button"
      className={classnames(`${px}-button`,`${px}-button--${size}`, {[`${px}-button--secondary`]: !primary})}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button
