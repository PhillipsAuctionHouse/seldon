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

    const handleSelect = (action: 'file' | 'link', link?: string) => {
      if (action === 'file') {
        generateCalendarFile(event);
      } else if (action === 'link' && link) {
        window.open(link, '_blank');
      }
    };

    const menuItems: { label: string; action: 'link' | 'file'; link?: string }[] = [
      { label: 'iCalendar', action: 'file' },
      { label: 'Google Calendar', action: 'link', link: generateGoogleCalendarLink(event) },
      { label: 'Outlook', action: 'file' },
      { label: 'Outlook Online', action: 'link', link: generateOutlookOnlineLink(event) },
      { label: 'Yahoo Calendar', action: 'link', link: generateYahooCalendarLink(event) },
    ];

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>
            <button
              aria-label={label}
              className={`${px}-icon-button ${px}-icon-button--small ${baseClassName}-icon-button`}
              type="button"
            >
              <Icon icon={open ? 'CloseX' : 'Calendar'} title={label} />
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
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  setOpen(false);
                }
              }}
            >
              {menuItems.map((item) => (
                <DropdownMenu.Item
                  key={item.label}
                  className={`${baseClassName}-atcb-item`}
                  onSelect={() => handleSelect(item.action, item.link)}
                >
                  {item.action === 'link' ? (
                    <Component className={`${baseClassName}-atcb-item-link`} href={item.link}>
                      {item.label}
                    </Component>
                  ) : (
                    <button className={`${baseClassName}-atcb-item-link`}>
                      <Text variant={TextVariants.body2}>{item.label}</Text>
                    </button>
                  )}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    );
  },
);

AddToCalendar.displayName = 'AddToCalendar';

export default AddToCalendar;
