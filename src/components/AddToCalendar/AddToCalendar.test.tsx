import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddToCalendar from './AddToCalendar';
import { CalendarEvent } from './types';
import * as calendarLinks from './calendarLinks';
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
    const { getByRole } = render(<AddToCalendar event={event} label="Add to calendar" />);
    const button = getByRole('button', { name: 'Add to calendar' });
    expect(button).toBeInTheDocument();
    const icon = screen.getByTestId('icon-calendar');
    expect(icon).toBeInTheDocument();
  });

  test('renders correctly', () => {
    const { getByRole } = render(<AddToCalendar event={event} />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('renders calendar links and changes icon to CloseX on trigger click', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<AddToCalendar event={event} label="Add to calendar" />);
    const button = getByRole('button', { name: 'Add to calendar' });

    // Click the button to open the dropdown
    await user.click(button);

    // Check if the calendar links are rendered
    expect(await screen.findByText('Google Calendar')).toBeInTheDocument();
    expect(await screen.findByText('Outlook Online')).toBeInTheDocument();
    expect(await screen.findByText('Yahoo Calendar')).toBeInTheDocument();

    // Check if the icon changes to CloseX
    const closeIcon = screen.getByTestId('icon-close-x');
    expect(closeIcon).toBeInTheDocument();
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
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
    const originalCreateElement = document.createElement;
    const link = originalCreateElement.call(document, 'a');
    link.click = vi.fn(); // Mock the click function
    const createElementSpy = vi.spyOn(document, 'createElement');
    createElementSpy.mockImplementation((tagName) => {
      if (tagName === 'a') return link;
      return originalCreateElement.call(document, tagName);
    });

    const generateCalendarFileSpy = vi.spyOn(calendarLinks, 'generateCalendarFile');
    const user = userEvent.setup();

    const { getByRole, findByRole } = render(<AddToCalendar event={event} label="Add to calendar" />);
    const triggerButton = getByRole('button', { name: 'Add to calendar' });

    // Open the Popover
    await user.click(triggerButton);

    // Find the Outlook button within the Popover
    const outlookButton = await findByRole('button', { name: 'Outlook' });

    // Click the Outlook button
    await user.click(outlookButton);

    // Verify that generateCalendarFile is called with the event
    expect(generateCalendarFileSpy).toHaveBeenCalledTimes(1);
    expect(generateCalendarFileSpy).toHaveBeenCalledWith(event);

    // Restore the spies
    consoleErrorSpy.mockRestore();
    createElementSpy.mockRestore();
  });

  test('clicking iCalendar button calls generateCalendarFile', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
    const originalCreateElement = document.createElement;
    const link = originalCreateElement.call(document, 'a');
    link.click = vi.fn(); // Mock the click function
    const createElementSpy = vi.spyOn(document, 'createElement');
    createElementSpy.mockImplementation((tagName) => {
      if (tagName === 'a') return link;
      return originalCreateElement.call(document, tagName);
    });

    const generateCalendarFileSpy = vi.spyOn(calendarLinks, 'generateCalendarFile');
    const user = userEvent.setup();

    const { getByRole } = render(<AddToCalendar event={event} label="Add Jewels & More: Online Auction to calendar" />);
    const triggerButton = getByRole('button', { name: 'Add Jewels & More: Online Auction to calendar' });

    // Open the Popover
    await user.click(triggerButton);

    const iCalendarButton = await screen.findByRole('button', { name: 'iCalendar' });
    await user.click(iCalendarButton);

    expect(generateCalendarFileSpy).toHaveBeenCalledTimes(1);
    expect(generateCalendarFileSpy).toHaveBeenCalledWith(event);

    // Restore the spies
    consoleErrorSpy.mockRestore();
    createElementSpy.mockRestore();
  });

  test('pressing Enter key on button toggles open state', () => {
    const { getByRole } = render(<AddToCalendar event={event} />);
    const button = getByRole('button', { name: 'Add to calendar' });

    // Simulate Enter key press
    act(() => {
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    });

    // Verify the Popover is open
    expect(getByRole('menu')).toBeInTheDocument();

    // Simulate Enter key press again
    act(() => {
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    });

    // Verify the Popover is closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
