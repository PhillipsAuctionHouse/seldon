import classnames from 'classnames';
import Button from '../Button/Button';
import { px } from '../../utils';

export interface IconButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Button contents
   */
  children?: React.ReactElement<SVGElement>;
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
}

const IconButton = ({ children, size = 'md', className, ...props }: IconButtonProps) => {
  return (
    <Button
      buttonType="primary"
      className={classnames(`${px}-icon-button`, `${px}-icon-button--${size}`, className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
