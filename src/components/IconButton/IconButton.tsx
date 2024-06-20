import classnames from 'classnames';
import Button from '../Button/Button';
import { getCommonProps } from '../../utils';

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
  const { className: baseClass, ...commonProps } = getCommonProps(props, 'IconButton');
  return (
    <Button
      {...commonProps}
      buttonType="primary"
      className={classnames(baseClass, `${baseClass}--${size}`, className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
