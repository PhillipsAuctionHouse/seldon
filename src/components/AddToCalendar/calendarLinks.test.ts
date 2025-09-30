import { describe, expect, vi } from 'vitest';
import { addHours } from 'date-fns';
import {
  generateGoogleCalendarLink,
  generateOutlookOnlineLink,
  generateYahooCalendarLink,
  generateCalendarFile,
  generateCalendarLink,
} from './calendarLinks';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const event = {
  title: 'Test Event',
  description: 'This is a test event',
  start: new Date('2025-08-13T17:00:00-04:00'),
  end: new Date('2025-08-19T17:00:00-04:00'),
  location: 'New York',
  timezone: 'America/New_York',
};

describe('AddToCalendar calendarLinks', () => {
  it('generateGoogleCalendarLink', () => {
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

  it('generateGoogleCalendarLink: missing end uses start + 1 hour', () => {
    const endlessEvent = { ...event, end: undefined as unknown as Date };
    const link = generateGoogleCalendarLink(endlessEvent);
    const url = new URL(link);
    const start = toZonedTime(endlessEvent.start, endlessEvent.timezone);
    const expectedEnd = addHours(start, 1);
    const expectedDates = `${format(start, "yyyyMMdd'T'HHmmss")}/${format(expectedEnd, "yyyyMMdd'T'HHmmss")}`;
    expect(url.searchParams.get('dates')).toBe(expectedDates);
  });

  it('formats dates correctly in generateGoogleCalendarLink', () => {
    const link = generateGoogleCalendarLink(event);
    const url = new URL(link);
    const start = toZonedTime(event.start, event.timezone);
    const end = toZonedTime(event.end ?? '', event.timezone);
    const expectedDates = `${format(start, "yyyyMMdd'T'HHmmss")}/${format(end, "yyyyMMdd'T'HHmmss")}`;
    expect(url.searchParams.get('dates')).toBe(expectedDates);
  });

  it('generateOutlookOnlineLink', () => {
    const link = generateOutlookOnlineLink(event);
    const url = new URL(link);
    expect(url.origin + url.pathname).toBe('https://outlook.office.com/calendar/0/deeplink/compose');
    expect(url.searchParams.get('subject')).toBe(event.title);

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startInUserTimezone = toZonedTime(event.start, userTimezone);
    const endInUserTimezone = event.end ? toZonedTime(event.end, userTimezone) : addHours(startInUserTimezone, 1);

    expect(url.searchParams.get('startdt')).toBe(format(startInUserTimezone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
    expect(url.searchParams.get('enddt')).toBe(format(endInUserTimezone, "yyyy-MM-dd'T'HH:mm:ssXXX"));

    expect(url.searchParams.get('body')).toBe(event.description);
    expect(url.searchParams.get('location')).toBe(event.location);
  });

  it('generateOutlookOnlineLink: missing end uses start + 1 hour', () => {
    const endlessEvent = { ...event, end: undefined as unknown as Date };
    const link = generateOutlookOnlineLink(endlessEvent);
    const url = new URL(link);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const start = toZonedTime(endlessEvent.start, userTimezone);
    const expectedEnd = addHours(start, 1);
    expect(url.searchParams.get('enddt')).toBe(format(expectedEnd, "yyyy-MM-dd'T'HH:mm:ssXXX"));
  });

  it('formats dates correctly in generateOutlookOnlineLink', () => {
    const link = generateOutlookOnlineLink(event);
    const url = new URL(link);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const start = toZonedTime(event.start, userTimezone);
    const end = toZonedTime(event.end ?? '', userTimezone);
    expect(url.searchParams.get('startdt')).toBe(format(start, "yyyy-MM-dd'T'HH:mm:ssXXX"));
    expect(url.searchParams.get('enddt')).toBe(format(end, "yyyy-MM-dd'T'HH:mm:ssXXX"));
  });

  it('generateYahooCalendarLink', () => {
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

  it('generateYahooCalendarLink: missing end uses start + 1 hour', () => {
    const endlessEvent = { ...event, end: undefined as unknown as Date };
    const link = generateYahooCalendarLink(endlessEvent);
    const url = new URL(link);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const start = toZonedTime(endlessEvent.start, userTimezone);
    const expectedEnd = addHours(start, 1);
    expect(url.searchParams.get('et')).toBe(format(expectedEnd, "yyyyMMdd'T'HHmmss"));
  });

  it('formats dates correctly in generateYahooCalendarLink', () => {
    const link = generateYahooCalendarLink(event);
    const url = new URL(link);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const start = toZonedTime(event.start, userTimezone);
    const end = toZonedTime(event.end ?? '', userTimezone);
    expect(url.searchParams.get('st')).toBe(format(start, "yyyyMMdd'T'HHmmss"));
    expect(url.searchParams.get('et')).toBe(format(end, "yyyyMMdd'T'HHmmss"));
  });

  it('generateCalendarFile', () => {
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

  const brokenEvent = { ...event, start: 'never' as unknown as Date };
  it.each([
    ['generateGoogleCalendarLink', generateGoogleCalendarLink],
    ['generateOutlookOnlineLink', generateOutlookOnlineLink],
    ['generateYahooCalendarLink', generateYahooCalendarLink],
  ])('%s logs console errors', (_, fn) => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);
    const link = fn({ ...brokenEvent });
    expect(link).toBe('#');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event start date:', brokenEvent);
    consoleErrorSpy.mockRestore();
  });

  it('generateCalendarFile logs console error for invalid start date', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);
    generateCalendarFile(brokenEvent);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event start date:', brokenEvent);
    consoleErrorSpy.mockRestore();
  });

  it.skip('returns UTC and logs warning if Intl.DateTimeFormat throws', () => {
    // 🎺TODO this can't really be tested normally, we need this function to work before we need it to break.
    // Which means the try/catch is unnecessary, but only if this getTimezone function never gets repurposed.
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => void 0);
    const originalIntl = Intl.DateTimeFormat;
    // @ts-expect-error purposely breaking Intl.DateTimeFormat
    Intl.DateTimeFormat = () => {
      const result = Intl.DateTimeFormat();
      return () => {
        const resolvedOptionsResult = result.resolvedOptions();
        return {
          ...result,
          resolvedOptions: () => {
            Object.defineProperty(resolvedOptionsResult, 'timeZone', {
              get() {
                throw new Error('timeZone access error');
              },
            });
            return resolvedOptionsResult;
          },
        };
      };
    };

    generateGoogleCalendarLink(event);
    expect(consoleWarnSpy).toHaveBeenCalledWith("Unable to determine user's timezone. Using UTC as a fallback.");
    consoleWarnSpy.mockRestore();
    Intl.DateTimeFormat = originalIntl;
  });

  it('logs error and does not create file if start is missing', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);
    generateCalendarFile(brokenEvent);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event start date:', brokenEvent);
    consoleErrorSpy.mockRestore();
  });

  it('logs error for invalid calendar type in generateCalendarLink', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);
    // @ts-expect-error testing invalid type
    const result = generateCalendarLink('colander', event);
    expect(result).toBe('#');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid calendar type:', 'colander');
    consoleErrorSpy.mockRestore();
  });
});
