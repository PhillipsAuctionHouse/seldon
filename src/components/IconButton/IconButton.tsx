import classnames from 'classnames';
import Button from '../Button/Button';
import { getCommonProps } from '../../utils';
import { ButtonVariants } from '../Button/types';

export interface IconButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Button contents
   */
  children?: React.ReactElement<SVGElement>;
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Mainly used for styling
   */
  variant?: ButtonVariants;
  /**
   * Should the button be disabled?
   */
  isDisabled?: boolean;
}

const IconButton = ({
  children,
  size = 'md',
  variant = ButtonVariants.primary,
  isDisabled = false,
  className,
  ...props
}: IconButtonProps) => {
  const { className: baseClass, ...commonProps } = getCommonProps(props, 'IconButton');
  return (
    <Button
      {...commonProps}
      variant={variant}
      className={classnames(baseClass, `${baseClass}--${size}`, `${baseClass}--${variant}`, className)}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
