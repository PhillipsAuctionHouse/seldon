import { describe, expect, test } from 'vitest';
import {
  generateGoogleCalendarLink,
  generateOutlookOnlineLink,
  generateYahooCalendarLink,
  generateCalendarFile,
} from './CalendarLinks';
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
  test('generateCalendarFile', () => {
    const event: CalendarEvent = {
      title: 'Test Event',
      description: 'This is a test event',
      start: new Date('2024-01-01T12:00:00.000Z'),
      end: new Date('2024-01-01T13:00:00.000Z'),
      location: 'New York',
      timezone: 'America/New_York',
    };

    const createElementSpy = vi.spyOn(document, 'createElement');
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    const link = document.createElement('a');
    link.click = vi.fn(); // Mock the click function

    createElementSpy.mockImplementation((tagName) => {
      if (tagName === 'a') return link;
      return document.createElement(tagName);
    });

    generateCalendarFile(event);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(removeChildSpy).toHaveBeenCalledTimes(1);
    expect(link.click).toHaveBeenCalledTimes(1);
  });

  test('formatDate', () => {
    const date = new Date('2024-01-01T12:00:00.000Z');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('20240101T120000000');
  });

  test('formatDateForOutlook', () => {
    const date = new Date('2024-01-01T12:00:00.000Z');
    const formattedDate = formatDateForOutlook(date);
    expect(formattedDate).toBe('2024-01-01T12:00:00.000');
  });

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:.]/g, '').replace('Z', '');
  };

  const formatDateForOutlook = (date: Date) => {
    return date.toISOString().replace('Z', '');
  };
});
