import { describe, expect, test } from 'vitest';
import { generateGoogleCalendarLink, generateOutlookOnlineLink, generateYahooCalendarLink } from './CalendarLinks';
import { CalendarEvent } from './types';

describe('calendar link generation', () => {
  const event: CalendarEvent = {
    title: 'Test Event',
    description: 'This is a test event',
    start: new Date('2024-01-01T12:00:00.000Z'),
    end: new Date('2024-01-01T13:00:00.000Z'),
    location: 'New York',
    timezone: 'America/New_York',
  };

  test('generateGoogleCalendarLink', () => {
    const link = generateGoogleCalendarLink(event);
    expect(link).toContain('https://www.google.com/calendar/render');
    expect(link).toContain(`text=${encodeURIComponent(event.title)}`);
    expect(link).toContain(`dates=${formatDate(event.start)}/${formatDate(event.end)}`);
    expect(link).toContain(`details=${encodeURIComponent(event.description)}`);
    expect(link).toContain(`location=${event.location}`);
    expect(link).toContain(`ctz=${event.timezone}`);
  });

  test('generateOutlookOnlineLink', () => {
    const link = generateOutlookOnlineLink(event);
    expect(link).toContain('https://outlook.live.com/owa/');
    expect(link).toContain(`subject=${event.title}`);
    expect(link).toContain(`startdt=${formatDateForOutlook(event.start)}`);
    expect(link).toContain(`enddt=${formatDateForOutlook(event.end)}`);
    expect(link).toContain(`body=${event.description}`);
    expect(link).toContain(`location=${event.location}`);
  });

  test('generateYahooCalendarLink', () => {
    const link = generateYahooCalendarLink(event);
    expect(link).toContain('https://calendar.yahoo.com/');
    expect(link).toContain(`title=${event.title}`);
    expect(link).toContain(`st=${formatDate(event.start)}`);
    expect(link).toContain(`et=${formatDate(event.end)}`);
    expect(link).toContain(`desc=${event.description}`);
    expect(link).toContain(`in_loc=${event.location}`);
  });

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:.]/g, '').replace('Z', '');
  };

  const formatDateForOutlook = (date: Date) => {
    return date.toISOString().replace('Z', '');
  };
});
