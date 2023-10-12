import classnames from 'classnames';

import { px } from '../../utils';

export interface ButtonProps {
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
  size?: 'sm' | 'md' | 'lg';

  /**
   * Button contents
   */
  children: React.ReactNode
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
  primary = true,
  size = 'md',
  backgroundColor,
  children,
  id,
  ...props
}: ButtonProps) => {
  return (
    <button
      data-testid={id ? `button-${id}` : `button`}
      id={id}
      type="button"
      className={classnames(`${px}-button`,`${px}-button--${size}`, {[`${px}-button--secondary`]: !primary})}
      style={{ backgroundColor }}
      {...props}
    >
      <span className={`${px}-button__helper`}/> {/* CSS selection helper */}
      {children}
    </button>
  );
};

export default Button
