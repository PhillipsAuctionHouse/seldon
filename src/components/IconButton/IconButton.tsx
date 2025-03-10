import classnames from 'classnames';
import Button, { ButtonProps } from '../Button/Button';
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
  href?: ButtonProps['href'];
  /**
   * The target of the link (e.g. _blank). To be combined with href.
   */
  target?: ButtonProps['target'];
  /**
   * The prefetch of the link.
   */
  prefetch?: ButtonProps['prefetch'];
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
      className={classnames(
        baseClass,
        `${baseClass}--${variant}`,
        {
          [`${baseClass}--is-disabled`]: isDisabled,
        },
        className,
      )}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
