import type { CalendarEvent } from './types';
import * as ics from 'ics';
import { format, addHours, isValid } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const CALENDAR_BASE_URL = {
  google: 'https://calendar.google.com/calendar/u/0/r/eventedit',
  outlook: 'https://outlook.office.com/calendar/0/deeplink/compose',
  yahoo: 'https://calendar.yahoo.com/',
};

// unless it gets repurposed, this function should always return a timezone.
// if the failure condition is true we would have thrown well before this is called
const getUserTimezone = () => {
  // try {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
  // } catch {
  //   console.warn("Unable to determine user's timezone. Using UTC as a fallback.");
  //   return 'UTC';
  // }
};

const createSearchParams = (params: Record<string, string>) => new URLSearchParams(params);

export const generateCalendarLink = (calendarType: 'google' | 'outlook' | 'yahoo', event: CalendarEvent) => {
  if (!event.start || !isValid(event.start)) {
    console.error('Invalid event start date:', event);
    return '#';
  }
  const userTimezone = getUserTimezone();
  const start = toZonedTime(event.start, calendarType === 'google' ? event.timezone : userTimezone);
  const end = event.end ? toZonedTime(event.end, calendarType === 'google' ? event.timezone : userTimezone) : null;
  switch (calendarType) {
    case 'google':
      return generateGoogleLink(start, end, event);
    case 'outlook':
      return generateOutlookLink(start, end, event);
    case 'yahoo':
      return generateYahooLink(start, end, event);
    default:
      console.error('Invalid calendar type:', calendarType);
      return '#';
  }
};

const generateGoogleLink = (start: Date, end: Date | null, event: CalendarEvent) => {
  const params = createSearchParams({
    text: event.title,
    dates: end
      ? `${format(start, "yyyyMMdd'T'HHmmss")}/${format(end, "yyyyMMdd'T'HHmmss")}`
      : `${format(start, "yyyyMMdd'T'HHmmss")}/${format(addHours(start, 1), "yyyyMMdd'T'HHmmss")}`,
    ctz: event.timezone,
    details: event.description,
    location: event.location,
  });
  const url = new URL(CALENDAR_BASE_URL.google);
  url.search = params.toString();
  return url.toString();
};

const generateOutlookLink = (start: Date, end: Date | null, event: CalendarEvent) => {
  const params = createSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: format(start, "yyyy-MM-dd'T'HH:mm:ssXXX"),
    enddt: end ? format(end, "yyyy-MM-dd'T'HH:mm:ssXXX") : format(addHours(start, 1), "yyyy-MM-dd'T'HH:mm:ssXXX"),
    body: event.description,
    location: event.location,
    allday: 'false',
  });
  const url = new URL(CALENDAR_BASE_URL.outlook);
  url.search = params.toString();
  return url.toString();
};

const generateYahooLink = (start: Date, end: Date | null, event: CalendarEvent) => {
  const title = encodeURIComponent(event.title);
  const desc = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  const st = format(start, "yyyyMMdd'T'HHmmss");
  const et = end ? format(end, "yyyyMMdd'T'HHmmss") : format(addHours(start, 1), "yyyyMMdd'T'HHmmss");
  return `${CALENDAR_BASE_URL.yahoo}?v=60&view=d&type=20&title=${title}&st=${st}&et=${et}&desc=${desc}&in_loc=${location}`;
};

const generateGoogleCalendarLink = (event: CalendarEvent) => generateCalendarLink('google', event);
const generateOutlookOnlineLink = (event: CalendarEvent) => generateCalendarLink('outlook', event);
const generateYahooCalendarLink = (event: CalendarEvent) => generateCalendarLink('yahoo', event);

const generateCalendarFile = (event: CalendarEvent) => {
  if (!isValid(event.start)) {
    console.error('Invalid event start date:', event);
    return;
  }
  const end = event.end ? event.end : addHours(event.start, 1);
  ics.createEvent(
    {
      title: event.title,
      description: event.description,
      start: [
        event.start.getFullYear(),
        event.start.getMonth() + 1,
        event.start.getDate(),
        event.start.getHours(),
        event.start.getMinutes(),
      ],
      end: [end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes()],
      location: event.location,
    },
    (error, value) => {
      if (error) {
        console.error('Error creating iCalendar event:', error);
      } else {
        const file = new File([value], `${event.title}.ics`, { type: 'text/calendar' });
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    },
  );
};

export { generateGoogleCalendarLink, generateOutlookOnlineLink, generateYahooCalendarLink, generateCalendarFile };
