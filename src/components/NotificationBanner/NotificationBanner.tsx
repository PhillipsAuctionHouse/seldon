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
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/qEd5aXjQeiboeJ8GJMOJba/Global-Notification-Banner?node-id=1-1899&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-notificationbanner--overview)
 */
const NotificationBanner = forwardRef<HTMLDivElement, NotificationBannerProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'NotificationBanner');
  const { children } = props;

  return (
    <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
      {children}
    </div>
  );
});

NotificationBanner.displayName = 'NotificationBanner';

export default NotificationBanner;
