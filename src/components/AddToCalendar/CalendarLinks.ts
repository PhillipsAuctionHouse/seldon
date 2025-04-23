import type { CalendarEvent } from './types';
import * as ics from 'ics';

const generateGoogleCalendarLink = (event: CalendarEvent) => {
  const start = event.start;
  const end = event.end;
  const title = encodeURIComponent(event.title);
  const description = encodeURIComponent(event.description);
  const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(start)}/${formatDate(end)}&details=${description}&location=${event.location}&ctz=${event.timezone}`;
  return link;
};

const generateOutlookOnlineLink = (event: CalendarEvent) => {
  const start = event.start;
  const end = event.end;
  const link = `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=${event.title}&startdt=${formatDateForOutlook(start)}&enddt=${formatDateForOutlook(end)}&body=${event.description}&location=${event.location}`;
  return link;
};

const generateYahooCalendarLink = (event: CalendarEvent) => {
  const start = event.start;
  const end = event.end;
  const link = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${event.title}&st=${formatDate(start)}&et=${formatDate(end)}&desc=${event.description}&in_loc=${event.location}`;
  return link;
};

const generateCalendarFile = (event: CalendarEvent) => {
  const { error, value } = ics.createEvent({
    title: event.title,
    description: event.description,
    start: [
      event.start.getFullYear(),
      event.start.getMonth() + 1,
      event.start.getDate(),
      event.start.getHours(),
      event.start.getMinutes(),
    ],
    end: [
      event.end.getFullYear(),
      event.end.getMonth() + 1,
      event.end.getDate(),
      event.end.getHours(),
      event.end.getMinutes(),
    ],
    location: event.location,
    startOutputType: 'local',
    startInputType: 'local',
  });

  if (error) {
    console.log(error);
  } else {
    const link = document.createElement('a');
    link.href = `data:text/calendar;charset=utf8,${value}`;
    link.download = `${event.title}.ics`;
    link.click();
  }
};

const formatDate = (date: Date) => {
  return date.toISOString().replace(/[-:.]/g, '').replace('Z', '');
};

const formatDateForOutlook = (date: Date) => {
  return date.toISOString().replace('Z', '');
};

export { generateGoogleCalendarLink, generateOutlookOnlineLink, generateYahooCalendarLink, generateCalendarFile };

// export const generateCalendarLinks = (event: CalendarEvent) => {
//   const { title, description, start, end, location, timezone } = event;

//   const formatGoogleDate = (date: Date) => {
//     return date.toISOString().replace(/[-:.]/g, '').split('.')[0];
//   };

//   const formatISODate = (date: Date) => {
//     return date.toISOString().replace(/\..+/, '');
//   };

//   const formatYahooDate = (date: Date) => {
//     return date.toISOString().replace(/[-:.]/g, '').split('.')[0];
//   };

//   const formatAppleDate = (date: Date) => {
//     return date.toISOString().replace(/[-:.]/g, '').split('.')[0] + 'Z';
//   };

//   const calendars = [
//     {
//       name: 'Google Calendar',
//       link: `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(title)}&dates=${formatGoogleDate(start)}/${formatGoogleDate(end)}&ctz=${timezone}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&pli=1&sf=true&output=xml`,
//     },
//     {
//       name: 'Outlook.com',
//       link: `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${formatISODate(start)}&enddt=${formatISODate(end)}&subject=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&body=${encodeURIComponent(description)}`,
//     },
//     {
//       name: 'Outlook',
//       link: `https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook`,
//     },
//     {
//       name: 'Yahoo Calendar',
//       link: `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(title)}&st=${formatYahooDate(start)}&et=${formatYahooDate(end)}&desc=${encodeURIComponent(description)}&in_loc=${encodeURIComponent(location)}`,
//     },
//     {
//       name: 'Apple Calendar',
//       link: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0AUID:${new Date().getTime()}%0D%0ADTSTART:${formatAppleDate(start)}%0D%0ADTEND:${formatAppleDate(end)}%0D%0ASUMMARY:${encodeURIComponent(title)}%0D%0ADESCRIPTION:${encodeURIComponent(description)}%0D%0ALOCATION:${encodeURIComponent(location)}%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR`,
//     },
//     {
//       name: 'iCalendar',
//       link: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0AUID:${new Date().getTime()}%0D%0ADTSTART:${formatAppleDate(start)}%0D%0ADTEND:${formatAppleDate(end)}%0D%0ASUMMARY:${encodeURIComponent(title)}%0D%0ADESCRIPTION:${encodeURIComponent(description)}%0D%0ALOCATION:${encodeURIComponent(location)}%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR`,
//     },
//   ];

//   return calendars;
// };
