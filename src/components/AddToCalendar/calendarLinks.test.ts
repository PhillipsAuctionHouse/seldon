import { describe, expect, test, vi } from 'vitest';
import { addHours } from 'date-fns';
import {
  generateGoogleCalendarLink,
  generateOutlookOnlineLink,
  generateYahooCalendarLink,
  generateCalendarFile,
} from './calendarLinks';
import { CalendarEvent } from './types';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

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
    const url = new URL(link);
    expect(url.origin + url.pathname).toBe('https://calendar.google.com/calendar/u/0/r/eventedit');
    expect(url.searchParams.get('text')).toBe(event.title);
    const start = toZonedTime(event.start, event.timezone);
    const end = event.end ? toZonedTime(event.end, event.timezone) : addHours(start, 1);
    expect(url.searchParams.get('dates')).toBe(
      `${format(start, "yyyyMMdd'T'HHmmss")}/${format(end, "yyyyMMdd'T'HHmmss")}`,
    );
    expect(url.searchParams.get('details')).toBe(event.description);
    expect(url.searchParams.get('location')).toBe(event.location);
    expect(url.searchParams.get('ctz')).toBe(event.timezone);
  });

  test('generateOutlookOnlineLink', () => {
    const link = generateOutlookOnlineLink(event);
    const url = new URL(link);
    expect(url.origin + url.pathname).toBe('https://outlook.office.com/calendar/0/deeplink/compose');
    expect(url.searchParams.get('subject')).toBe(event.title);

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startInUserTimezone = toZonedTime(event.start, userTimezone);
    const endInUserTimezone = event.end ? toZonedTime(event.end, userTimezone) : addHours(startInUserTimezone, 1); // Use userTimezone here

    expect(url.searchParams.get('startdt')).toBe(format(startInUserTimezone, "yyyy-MM-dd'T'HH:mm:ssXXX")); // Expect timezone
    expect(url.searchParams.get('enddt')).toBe(format(endInUserTimezone, "yyyy-MM-dd'T'HH:mm:ssXXX"));

    expect(url.searchParams.get('body')).toBe(event.description);
    expect(url.searchParams.get('location')).toBe(event.location);
  });

  test('generateYahooCalendarLink', () => {
    const link = generateYahooCalendarLink(event);
    const url = new URL(link);
    expect(url.origin + url.pathname).toBe('https://calendar.yahoo.com/');
    expect(url.searchParams.get('title')).toBe(event.title);

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startInUserTimezone = toZonedTime(event.start, userTimezone);

    const endInUserTimezone = event.end ? toZonedTime(event.end, userTimezone) : addHours(startInUserTimezone, 1);

    expect(url.searchParams.get('st')).toBe(format(startInUserTimezone, "yyyyMMdd'T'HHmmss"));
    expect(url.searchParams.get('et')).toBe(format(endInUserTimezone, "yyyyMMdd'T'HHmmss"));

    expect(url.searchParams.get('desc')).toBe(event.description);
    expect(url.searchParams.get('in_loc')).toBe(event.location);
  });

  test('generateCalendarFile', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');
    const link = document.createElement('a');
    link.click = vi.fn();
    createElementSpy.mockImplementation((tagName) => {
      if (tagName === 'a') return link;
      return document.createElement(tagName);
    });

    const originalCreateObjectURL = global.URL.createObjectURL;
    const originalRevokeObjectURL = global.URL.revokeObjectURL;
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost:3000/1234567890');
    global.URL.revokeObjectURL = vi.fn();

    generateCalendarFile(event);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(removeChildSpy).toHaveBeenCalledTimes(1);
    expect(link.click).toHaveBeenCalledTimes(1);
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1);

    global.URL.createObjectURL = originalCreateObjectURL;
    global.URL.revokeObjectURL = originalRevokeObjectURL;
  });
});

//negative test cases
// Test cases for invalid event data

describe('calendar link generation with invalid start date', () => {
  const event: CalendarEvent = {
    title: 'Test Event',
    description: 'This is a test event',
    start: new Date('Invalid Date'),
    end: new Date('2024-01-01T13:00:00.000Z'),
    location: 'New York',
    timezone: 'America/New_York',
  };

  test('generateGoogleCalendarLink logs console error', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const link = generateGoogleCalendarLink(event);
    expect(link).toBe('#');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event start date:', event);
    consoleErrorSpy.mockRestore();
  });

  test('generateOutlookOnlineLink logs console error', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const link = generateOutlookOnlineLink(event);
    expect(link).toBe('#');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event start date:', event);
    consoleErrorSpy.mockRestore();
  });

  test('generateYahooCalendarLink logs console error', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const link = generateYahooCalendarLink(event);
    expect(link).toBe('#');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event start date:', event);
    consoleErrorSpy.mockRestore();
  });

  test('generateCalendarFile logs console error', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    generateCalendarFile(event);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating iCalendar event:', {});
    consoleErrorSpy.mockRestore();
  });
});
