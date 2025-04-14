import { ComponentProps, forwardRef, useState, useEffect, ElementType } from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import { format } from 'date-fns/format';
import initializeAddToCalendar from './initializeAddToCalendar';
import { Icon } from '../Icon';
import { getTimeZone } from './utils';
import { Link, LinkProps } from '../Link';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface AddToCalendarProps extends ComponentProps<'div'> {
  startDateTimeOffset?: string;
  endDateTimeOffset?: string;
  timeZone?: string;
  title?: string;
  description?: string;
  location?: string;
  organizer?: string;
  organizerEmail?: string;
  linkElement?: ElementType<LinkProps>;
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/OvBXAq48blO1r4qYbeBPjW/RW---Sale-Page-(PLP)?node-id=4791-30655)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-addtocalendar--overview)
 */
const AddToCalendar = forwardRef<HTMLDivElement, AddToCalendarProps>(
  (
    {
      className,
      startDateTimeOffset,
      endDateTimeOffset,
      timeZone = 'UTC',
      title,
      description,
      location = 'New York',
      organizer,
      organizerEmail,
      linkElement: Component = Link,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AddToCalendar');
    const [status, setStatus] = useState('mounting');

    useEffect(() => {
      initializeAddToCalendar()
        .then(() => setStatus('connected'))
        .catch((error) => {
          console.error('Error initializing calendar:', error);
          setStatus('error');
        });
    }, []);

    const buttonAriaLabel = title ? `Add ${title} to calendar` : 'Add to calendar';

    const statusClassName = classnames({
      hidden: status === 'mounting' || status === 'error',
    });

    if (!startDateTimeOffset) {
      return null;
    }

    const parseDate = (str: string): Date => {
      const [year, month, date, hours, minutes, seconds] =
        str
          .match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/)
          ?.slice(1)
          .map((n) => parseInt(n, 10)) || [];
      return new Date(year, month - 1, date, hours, minutes, seconds);
    };

    const timeZoneToUse = timeZone || getTimeZone(location) || 'UTC';
    const startDateTime = parseDate(startDateTimeOffset);
    const endDateTime = endDateTimeOffset ? parseDate(endDateTimeOffset) : null;

    return (
      <div className={classnames(baseClassName, className)} {...commonProps} {...props} ref={ref}>
        <div id="add-to-calendar" className={statusClassName}>
          <span className="addtocalendar atc-style-icon atc-style-menu-wb">
            <Component
              className={`{px}-icon-button ${px}-icon-button--primary atcb-link`}
              aria-label={buttonAriaLabel}
              aria-disabled={status !== 'connected'}
              tabIndex={0}
            >
              <Icon icon="CalendarAlt" />
            </Component>

            <var className="atc_event">
              <var className="atc_date_start">{format(startDateTime, 'yyyy-MM-dd HH:mm:ss')}</var>
              {endDateTime && <var className="atc_date_end">{format(endDateTime, 'yyyy-MM-dd HH:mm:ss')}</var>}
              <var className="atc_timezone">{timeZoneToUse}</var>
              <var className="atc_title">{title}</var>
              <var className="atc_description">{description}</var>
              <var className="atc_location">{location}</var>
              <var className="atc_organizer">{organizer}</var>
              <var className="atc_organizer_email">{organizerEmail}</var>
            </var>
          </span>
        </div>
      </div>
    );
  },
);

AddToCalendar.displayName = 'AddToCalendar';

export default AddToCalendar;
