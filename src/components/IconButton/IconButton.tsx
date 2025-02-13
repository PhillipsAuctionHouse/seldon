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
   * Mainly used for styling
   */
  variant?: ButtonVariants;
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
   * The prefetch of the link.
   */
  prefetch?: 'none' | 'intent' | 'render' | 'viewport';
}

const IconButton = ({
  children,
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
      className={classnames(baseClass, `${baseClass}--${variant}`, className)}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
