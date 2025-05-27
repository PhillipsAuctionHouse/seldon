import { forwardRef, ReactNode } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import * as PrimitiveToast from '@radix-ui/react-toast';
import { Icon } from '../Icon';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';

export interface PrimitiveToastProps extends Omit<PrimitiveToast.ToastProps, 'title'> {
  /**
   * The content to display as the toast's title.
   */
  title: ReactNode;
  /**
   * Optional element to serve as an action within the toast.
   */
  actionElement?: ReactNode;
  /**
   * Alternative text for the action element for accessibility.
   */
  actionAltText?: string;
  /**
   * Title for the close button for accessibility.
   */
  closeButtonLabel?: string;
}
/**
 * ## Overview
 *
 * Toast is a non-disruptive message component that appears temporarily to provide
 * brief notifications to the user. It contains a title, a close button, and an optional action button or link.
 *
 * Use the `useToast` hook to trigger toast notifications programmatically from any component.
 *
 * This component requires a `ToastProvider` to be present in your application. Make sure to
 * wrap your application or the relevant section with the `ToastProvider` component.
 *
 * [Figma Link](https://www.figma.com/design/f3vm6hItGjnsmkJxLLbe3P/MANAGE---MUI-v5.9.0--24?node-id=6586-47081&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-toast--overview)
 *
 * [Radix UI Toast Documentation](https://www.radix-ui.com/docs/primitives/components/toast)
 */
const Toast = forwardRef<HTMLLIElement, PrimitiveToastProps>(
  ({ className, title, actionElement, actionAltText, closeButtonLabel, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Toast');

    return (
      <PrimitiveToast.Root {...commonProps} className={classnames(baseClassName, className)} ref={ref}>
        <div className={`${baseClassName}__content`}>
          <PrimitiveToast.Title>{title}</PrimitiveToast.Title>
          {actionElement && actionAltText && (
            <PrimitiveToast.Action asChild altText={actionAltText} className={`${baseClassName}__action`}>
              {actionElement}
            </PrimitiveToast.Action>
          )}
        </div>
        <PrimitiveToast.Close className={`${baseClassName}__close`} aria-label={closeButtonLabel} asChild>
          <IconButton variant={ButtonVariants.link}>
            <Icon icon="CloseX" title={closeButtonLabel} color="$white" aria-hidden />
          </IconButton>
        </PrimitiveToast.Close>
      </PrimitiveToast.Root>
    );
  },
);

Toast.displayName = 'Toast';

export default Toast;
