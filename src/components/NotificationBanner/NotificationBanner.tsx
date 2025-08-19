import classnames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export type NotificationBannerProps = ComponentProps<'div'> & {
  /**
   * The content to display inside the notification banner.
   */
  children: React.ReactNode;
};
/**
 * ## Overview
 *
 * The `NotificationBanner` component displays a prominent message at the top of the page or section to inform users about important information, updates, or alerts. It is designed to be highly visible and can contain any custom content passed as children. Use this component to draw attention to critical messages that require user awareness.
 *
 * [Figma Link](https://www.figma.com/design/qEd5aXjQeiboeJ8GJMOJba/Global-Notification-Banner?node-id=1-1899&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-notificationbanner--overview)
 */
const NotificationBanner = forwardRef<HTMLDivElement, NotificationBannerProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'NotificationBanner');
  const { children, id } = props;

  return (
    <div {...commonProps} {...props} className={classnames(baseClassName, className)} ref={ref} id={id}>
      {children}
    </div>
  );
});

NotificationBanner.displayName = 'NotificationBanner';

export default NotificationBanner;
