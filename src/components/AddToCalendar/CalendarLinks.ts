import type { CalendarEvent } from './types';
import * as ics from 'ics';

const generateGoogleCalendarLink = (event: CalendarEvent): string => {
  const start = event.start;
  const end = event.end;
  const title = encodeURIComponent(event.title);
  const description = encodeURIComponent(event.description);
  const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(start)}/${formatDate(end)}&details=${description}&location=${event.location}&ctz=${event.timezone}`;
  return link;
};

const generateOutlookOnlineLink = (event: CalendarEvent): string => {
  const start = event.start;
  const end = event.end;
  const link = `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=${event.title}&startdt=${formatDateForOutlook(start)}&enddt=${formatDateForOutlook(end)}&body=${event.description}&location=${event.location}`;
  return link;
};

const generateYahooCalendarLink = (event: CalendarEvent): string => {
  const start = event.start;
  const end = event.end;
  const link = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${event.title}&st=${formatDate(start)}&et=${formatDate(end)}&desc=${event.description}&in_loc=${event.location}`;
  return link;
};

const generateCalendarFile = (event: CalendarEvent): void => {
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
    console.error('Error creating iCalendar event:', error);
  } else {
    const link = document.createElement('a');
    link.href = `data:text/calendar;charset=utf8,${value}`;
    link.download = `${event.title}.ics`;
    document.body.appendChild(link); // Append to the document to make click work in some browsers
    link.click();
    document.body.removeChild(link); // Clean up after the click
  }
};

const formatDate = (date: Date): string => {
  return date.toISOString().replace(/[-:.]/g, '').replace('Z', '');
};

const formatDateForOutlook = (date: Date): string => {
  return date.toISOString().replace('Z', '');
};

export { generateGoogleCalendarLink, generateOutlookOnlineLink, generateYahooCalendarLink, generateCalendarFile };
