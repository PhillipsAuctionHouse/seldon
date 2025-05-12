import { ComponentProps, forwardRef, ElementType, useState } from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
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

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>
            <button
              aria-label={label}
              className={`${px}-icon-button ${px}-icon-button--small ${baseClassName}-icon-button`}
              type="button"
            >
              <Icon icon={open ? 'CloseX' : 'Calendar'} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={5}
              align="start"
              side="bottom"
              data-side="bottom"
              avoidCollisions={false}
              className={`${baseClassName}-atcb-list`}
            >
              <DropdownMenu.Item className={`${baseClassName}-atcb-item`}>
                <button className={`${baseClassName}-atcb-item-link`} onClick={() => generateCalendarFile(event)}>
                  <Text variant={TextVariants.body2}>iCalendar</Text>
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item className={`${baseClassName}-atcb-item`}>
                <Component className={`${baseClassName}-atcb-item-link`} href={generateGoogleCalendarLink(event)}>
                  Google Calendar
                </Component>
              </DropdownMenu.Item>
              <DropdownMenu.Item className={`${baseClassName}-atcb-item`}>
                <button className={`${baseClassName}-atcb-item-link`} onClick={() => generateCalendarFile(event)}>
                  <Text variant={TextVariants.body2}>Outlook</Text>
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item className={`${baseClassName}-atcb-item`}>
                <Component className={`${baseClassName}-atcb-item-link`} href={generateOutlookOnlineLink(event)}>
                  Outlook Online
                </Component>
              </DropdownMenu.Item>
              <DropdownMenu.Item className={`${baseClassName}-atcb-item`}>
                <Component className={`${baseClassName}-atcb-item-link`} href={generateYahooCalendarLink(event)}>
                  Yahoo Calendar
                </Component>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    );
  },
);

AddToCalendar.displayName = 'AddToCalendar';

export default AddToCalendar;
