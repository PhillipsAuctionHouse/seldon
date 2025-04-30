import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent, act, screen } from '@testing-library/react';
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with CalendarAlt icon initially', () => {
    const { getByRole } = render(<AddToCalendar event={event} />);
    const button = getByRole('button', { name: 'Add Jewels & More: Online Auction to calendar' });
    expect(button).toBeInTheDocument();
    const icon = screen.getByTestId('icon-calendar-alt');
    expect(icon).toBeInTheDocument();
  });

  test('renders correctly', () => {
    const { getByRole } = render(<AddToCalendar event={event} />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('renders calendar links and changes icon to Cross on trigger click', () => {
    const { getByRole, getByText } = render(<AddToCalendar event={event} />);
    const button = getByRole('button', { name: 'Add Jewels & More: Online Auction to calendar' });

    // Click the button to open the Popover
    act(() => {
      fireEvent.click(button);
    });

    // Check if the calendar links are rendered
    expect(getByText('Google Calendar')).toBeInTheDocument();
    expect(getByText('Outlook Online')).toBeInTheDocument();
    expect(getByText('Yahoo Calendar')).toBeInTheDocument();

    // Check if the icon changes to Cross
    const crossIcon = screen.getByTestId('icon-close');
    expect(crossIcon).toBeInTheDocument();
  });

  test('renders button with correct aria-label when event title is present', () => {
    const { getByRole } = render(<AddToCalendar event={event} />);
    const button = getByRole('button', { name: `Add ${event.title} to calendar` });
    expect(button).toBeInTheDocument();
  });

  test('renders button with default aria-label when event title is missing', () => {
    const eventWithoutTitle: CalendarEvent = {
      title: '', // or omit the title property
      description: 'Some description',
      start: new Date(),
      end: new Date(),
      location: 'Some Location',
      timezone: 'UTC',
    };
    const { getByRole } = render(<AddToCalendar event={eventWithoutTitle} />);
    const button = getByRole('button', { name: 'Add to calendar' });
    expect(button).toBeInTheDocument();
  });

  test('calls generateCalendarFile when button is clicked ', async () => {
    const generateCalendarFileSpy = vi.spyOn(CalendarLinks, 'generateCalendarFile');
    const { getByRole, findByRole } = render(<AddToCalendar event={event} />);
    const triggerButton = getByRole('button', { name: 'Add Jewels & More: Online Auction to calendar' });

    // Open the Popover
    act(() => {
      fireEvent.click(triggerButton);
    });

    // Find the Outlook button within the Popover
    const outlookButton = await findByRole('button', { name: 'Outlook' });

    // Click the Outlook button
    act(() => {
      fireEvent.click(outlookButton);
    });

    // Verify that generateCalendarFile is called with the event
    expect(generateCalendarFileSpy).toHaveBeenCalledTimes(1);
    expect(generateCalendarFileSpy).toHaveBeenCalledWith(event);
  });

  test('clicking iCalendar button calls generateCalendarFile', async () => {
    const generateCalendarFileSpy = vi.spyOn(CalendarLinks, 'generateCalendarFile');

    const { getByRole } = render(<AddToCalendar event={event} />);
    const triggerButton = getByRole('button', { name: 'Add Jewels & More: Online Auction to calendar' });

    // Open the Popover
    act(() => {
      fireEvent.click(triggerButton);
    });

    const iCalendarButton = await screen.findByRole('button', { name: 'iCalendar' });
    act(() => {
      fireEvent.click(iCalendarButton);
    });

    expect(generateCalendarFileSpy).toHaveBeenCalledTimes(1);
    expect(generateCalendarFileSpy).toHaveBeenCalledWith(event);
  });
});
