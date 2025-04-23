import { ComponentProps, forwardRef, ElementType } from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import * as Popover from '@radix-ui/react-popover';
import { Icon } from '../Icon';
import { CalendarEvent } from './types';
import { Link, LinkProps } from '../Link';
import {
  generateGoogleCalendarLink,
  generateOutlookOnlineLink,
  generateYahooCalendarLink,
  generateCalendarFile,
} from './CalendarLinks';

export interface AddToCalendarProps extends ComponentProps<'div'> {
  event: CalendarEvent;
  linkElement?: ElementType<LinkProps>;
}

const AddToCalendar = forwardRef<HTMLDivElement, AddToCalendarProps>(
  ({ className, event, linkElement: Component = Link, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AddToCalendar');
    const buttonAriaLabel = event.title ? `Add ${event.title} to calendar` : 'Add to calendar';

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button aria-label={buttonAriaLabel} className={`${px}-icon-button ${px}-icon-button--small`} type="button">
              <Icon icon="CalendarAlt" />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content sideOffset={5} align="start">
              <ul className="atcb-list" role="dialog">
                <li className="atcb-item">
                  <button className="atcb-item-link" onClick={() => generateCalendarFile(event)}>
                    iCalendar
                  </button>
                </li>
                <li className="atcb-item">
                  <Component className="atcb-item-link" href={generateGoogleCalendarLink(event)}>
                    Google Calendar
                  </Component>
                </li>
                <li className="atcb-item">
                  <button className="atcb-item-link" onClick={() => generateCalendarFile(event)}>
                    Outlook
                  </button>
                </li>
                <li className="atcb-item">
                  <Component className="atcb-item-link" href={generateOutlookOnlineLink(event)}>
                    Outlook Online
                  </Component>
                </li>
                <li className="atcb-item">
                  <Component className="atcb-item-link" href={generateYahooCalendarLink(event)}>
                    Yahoo! Calendar
                  </Component>
                </li>
              </ul>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  },
);

AddToCalendar.displayName = 'AddToCalendar';
export default AddToCalendar;
