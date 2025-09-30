import { describe, expect, Mock, vi } from 'vitest';
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

describe('AddToCalendar component', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<AddToCalendar event={event} />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('iCalendar button triggers generateCalendarFile', async () => {
    const user = userEvent.setup();
    const generateCalendarFileSpy = vi.spyOn(calendarLinks, 'generateCalendarFile');
    const { getByRole } = render(<AddToCalendar event={event} label="Add to calendar" />);
    await user.click(getByRole('button', { name: 'Add to calendar' }));
    const iCalBtn = await screen.findByRole('button', { name: 'iCalendar' });
    await user.click(iCalBtn);
    expect(generateCalendarFileSpy).toHaveBeenCalled();
  });

  it('Outlook button triggers generateCalendarFile', async () => {
    const user = userEvent.setup();
    const generateCalendarFileSpy = vi.spyOn(calendarLinks, 'generateCalendarFile');
    const { getByRole } = render(<AddToCalendar event={event} label="Add to calendar" />);
    await user.click(getByRole('button', { name: 'Add to calendar' }));
    const outlookBtn = await screen.findByRole('button', { name: 'Outlook' });
    await user.click(outlookBtn);
    expect(generateCalendarFileSpy).toHaveBeenCalled();
  });

  it('Google Calendar link is rendered', async () => {
    const user = userEvent.setup();
    render(<AddToCalendar event={event} label="Add to calendar" />);
    await user.click(screen.getByRole('button', { name: 'Add to calendar' }));
    const googleLink = await screen.findByText('Google Calendar');
    expect(googleLink).toBeInTheDocument();
  });

  it('Outlook Online link is rendered', async () => {
    const user = userEvent.setup();
    render(<AddToCalendar event={event} label="Add to calendar" />);
    await user.click(screen.getByRole('button', { name: 'Add to calendar' }));
    const outlookOnlineLink = await screen.findByText('Outlook Online');
    expect(outlookOnlineLink).toBeInTheDocument();
  });

  it('Yahoo Calendar link is rendered', async () => {
    const user = userEvent.setup();
    render(<AddToCalendar event={event} label="Add to calendar" />);
    await user.click(screen.getByRole('button', { name: 'Add to calendar' }));
    const yahooLink = await screen.findByText('Yahoo Calendar');
    expect(yahooLink).toBeInTheDocument();
  });

  it('renders correctly with CalendarAlt icon initially', () => {
    const { getByRole } = render(<AddToCalendar event={event} label="Add to calendar" />);
    const button = getByRole('button', { name: 'Add to calendar' });
    expect(button).toBeInTheDocument();
    const icon = screen.getByTestId('icon-calendar');
    expect(icon).toBeInTheDocument();
  });

  it('renders calendar links and changes icon to CloseX on trigger click', async () => {
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

  it('renders button with default aria-label when event title is missing', () => {
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

  it('calls generateCalendarFile when button is clicked ', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);
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

  it('clicking iCalendar button calls generateCalendarFile', async () => {
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

  it('pressing Enter key on button toggles open state', () => {
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

  it('calls window.open with correct link when clicking a calendar link', async () => {
    const user = userEvent.setup();
    const googleLink = 'https://calendar.google.com/fake-link';
    (calendarLinks.generateGoogleCalendarLink as Mock).mockReturnValue(googleLink);

    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<AddToCalendar event={event} label="Add to calendar" />);
    await user.click(screen.getByRole('button', { name: 'Add to calendar' }));

    const googleCalendarLink = await screen.findByText('Google Calendar');
    await user.click(googleCalendarLink);

    expect(windowOpenSpy).toHaveBeenCalledWith(googleLink, '_blank');

    windowOpenSpy.mockRestore();
  });
});
