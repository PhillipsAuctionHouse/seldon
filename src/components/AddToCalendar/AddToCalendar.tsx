import { ComponentProps, forwardRef, ElementType, useState } from 'react';
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
  label?: string;
}

/**
 * ## Overview
 *
 * Overview of AddToCalendar component
 *
 * [Figma Link](https://www.figma.com/design/OvBXAq48blO1r4qYbeBPjW/RW---Sale-Page-(PLP)?node-id=4791-30655)
 *
 * [Storybook Link](https://deploy-preview-600--phillips-seldon.netlify.app/?path=/docs/components-addtocalendar--overview)
 */

const AddToCalendar = forwardRef<HTMLDivElement, AddToCalendarProps>(
  ({ className, event, label = 'Add to calendar', linkElement: Component = Link, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AddToCalendar');
    const [open, setOpen] = useState(false); // State to manage the open/close of the popover

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <button aria-label={label} className={`${px}-icon-button ${px}-icon-button--small`} type="button">
              <Icon icon={open ? 'Close' : 'CalendarAlt'} />
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
                    Yahoo Calendar
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
