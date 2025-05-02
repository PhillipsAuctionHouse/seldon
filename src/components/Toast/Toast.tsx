import { forwardRef, ReactNode } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import * as PrimitiveToast from '@radix-ui/react-toast';
import { Icon } from '../Icon';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';

export interface PrimitiveToastProps extends PrimitiveToast.ToastProps {
  title?: string;
  action?: ReactNode;
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/f3vm6hItGjnsmkJxLLbe3P/MANAGE---MUI-v5.9.0--24?node-id=6586-47081&m=dev)
 *
 * [Storybook Link](Point back to yourself here)
 */
const Toast = forwardRef<HTMLLIElement, PrimitiveToastProps>(({ className, title, action, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Toast');

  return (
    <PrimitiveToast.Root {...commonProps} className={classnames(baseClassName, className)} ref={ref}>
      <div className={`${baseClassName}__content`}>
        {title && <PrimitiveToast.Title>{title}</PrimitiveToast.Title>}

        {action && (
          <PrimitiveToast.Action asChild altText="Toast action" className={`${baseClassName}__action`}>
            {action}
          </PrimitiveToast.Action>
        )}
      </div>
      <PrimitiveToast.Close className={`${baseClassName}__close`} aria-label="Close" asChild>
        <IconButton variant={ButtonVariants.tertiary}>
          <Icon icon="Close"></Icon>
        </IconButton>
      </PrimitiveToast.Close>
    </PrimitiveToast.Root>
  );
});

Toast.displayName = 'Toast';

export default Toast;
