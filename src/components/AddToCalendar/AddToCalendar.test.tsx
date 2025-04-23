import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import AddToCalendar from './AddToCalendar';
import { CalendarEvent } from './types';
import * as CalendarLinks from './CalendarLinks';

vi.mock('./calendarLinks', () => ({
  generateGoogleCalendarLink: vi.fn(),
  generateOutlookOnlineLink: vi.fn(),
  generateYahooCalendarLink: vi.fn(),
  generateCalendarFile: vi.fn(),
}));

describe('AddToCalendar component', () => {
  const event: CalendarEvent = {
    title: 'Jewels & More: Online Auction',
    description: 'Jewels & More: Online Auction.',
    start: new Date('2025-01-27T15:13:02.59+00:00'),
    end: new Date('2025-06-18T18:15:02.59+00:00'),
    location: 'New York',
    timezone: 'America/New_York',
  };

  test('renders correctly', () => {
    const { getByRole } = render(<AddToCalendar event={event} />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('renders calendar links', () => {
    const { getByRole, getByText } = render(<AddToCalendar event={event} />);
    const button = getByRole('button');
    act(() => {
      fireEvent.click(button);
    });
    expect(getByText('Google Calendar')).toBeInTheDocument();
    expect(getByText('Outlook Online')).toBeInTheDocument();
    expect(getByText('Yahoo! Calendar')).toBeInTheDocument();
  });

  test('calls generateCalendarFile when button is clicked', () => {
    const { getByRole } = render(<AddToCalendar event={event} />);
    act(() => {
      fireEvent.click(getByRole('button'));
    });
    const outlookButton = getByRole('button', { name: 'Outlook' });
    act(() => {
      fireEvent.click(outlookButton);
    });
    expect(CalendarLinks.generateCalendarFile).toHaveBeenCalledTimes(1);
    expect(CalendarLinks.generateCalendarFile).toHaveBeenCalledWith(event);
  });
});
