import { ComponentProps, forwardRef, ElementType, useState } from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import * as Popover from '@radix-ui/react-popover';
import { Icon } from '../Icon';
import { CalendarEvent } from './types';
import { Link, LinkProps } from '../Link';
import {
  generateGoogleCalendarLink,
  generateOutlookOnlineLink,
  generateYahooCalendarLink,
  generateCalendarFile,
} from './calendarLinks';

export interface AddToCalendarProps extends ComponentProps<'div'> {
  event: CalendarEvent;
  linkElement?: ElementType<LinkProps>;
  label?: string;
}

const AddToCalendar = forwardRef<HTMLDivElement, AddToCalendarProps>(
  ({ className, event, label = 'Add to calendar', linkElement: Component = Link, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AddToCalendar');
    const [open, setOpen] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        setOpen(!open);
      }
    };

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <button
              aria-label={label}
              className={`${px}-icon-button ${px}-icon-button--small ${baseClassName}-icon-button`}
              type="button"
              onKeyDown={handleKeyDown}
            >
              <Icon icon={open ? 'CloseX' : 'Calendar'} />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content sideOffset={5} align="start" side="bottom" data-side="bottom" avoidCollisions={false}>
              <ul className={`${baseClassName}-atcb-list`} role="menu">
                <li className={`${baseClassName}-atcb-item`}>
                  <button
                    className={`${baseClassName}-atcb-item-link`}
                    role="button"
                    onClick={() => generateCalendarFile(event)}
                  >
                    <Text variant={TextVariants.body2}>iCalendar</Text>
                  </button>
                </li>
                <li className={`${baseClassName}-atcb-item`}>
                  <Component className={`${baseClassName}-atcb-item-link`} href={generateGoogleCalendarLink(event)}>
                    Google Calendar
                  </Component>
                </li>
                <li className={`${baseClassName}-atcb-item`} role="none">
                  <button
                    className={`${baseClassName}-atcb-item-link`}
                    role="button"
                    onClick={() => generateCalendarFile(event)}
                  >
                    <Text variant={TextVariants.body2}>Outlook</Text>
                  </button>
                </li>
                <li className={`${baseClassName}-atcb-item`}>
                  <Component className={`${baseClassName}-atcb-item-link`} href={generateOutlookOnlineLink(event)}>
                    Outlook Online
                  </Component>
                </li>
                <li className={`${baseClassName}-atcb-item`}>
                  <Component className={`${baseClassName}-atcb-item-link`} href={generateYahooCalendarLink(event)}>
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
