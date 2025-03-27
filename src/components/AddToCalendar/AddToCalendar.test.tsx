import { render, waitFor } from '@testing-library/react';
import AddToCalendar from './AddToCalendar';

const props = {
  startDateTimeOffset: '2022-01-01T12:00:00',
  endDateTimeOffset: '2022-01-01T13:00:00',
  timeZone: 'UTC',
  title: 'Test Event',
  description: 'This is a test event',
  location: 'New York',
  organizer: 'John Doe',
  organizerEmail: 'johndoe@example.com',
};

describe('AddToCalendar component', () => {
  it('renders correctly', () => {
    const { container } = render(<AddToCalendar {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders calendar icon with correct SVG paths', () => {
    const { container } = render(<AddToCalendar {...props} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      expect(paths).toHaveLength(6);
    }
  });

  it('renders event details', () => {
    const { container } = render(<AddToCalendar {...props} />);
    const eventDetails = container.querySelector('var.atc_event');
    expect(eventDetails).toBeInTheDocument();
    if (eventDetails) {
      const dateStart = eventDetails.querySelector('var.atc_date_start');
      expect(dateStart).toHaveTextContent('2022-01-01 12:00:00');
      const dateEnd = eventDetails.querySelector('var.atc_date_end');
      expect(dateEnd).toHaveTextContent('2022-01-01 13:00:00');
      const timezone = eventDetails.querySelector('var.atc_timezone');
      expect(timezone).toHaveTextContent('UTC');
      const title = eventDetails.querySelector('var.atc_title');
      expect(title).toHaveTextContent('Test Event');
      const description = eventDetails.querySelector('var.atc_description');
      expect(description).toHaveTextContent('This is a test event');
      const location = eventDetails.querySelector('var.atc_location');
      expect(location).toHaveTextContent('New York');
      const organizer = eventDetails.querySelector('var.atc_organizer');
      expect(organizer).toHaveTextContent('John Doe');
      const organizerEmail = eventDetails.querySelector('var.atc_organizer_email');
      expect(organizerEmail).toHaveTextContent('johndoe@example.com');
    }
  });

  it('renders Add to Calendar button with correct class names', () => {
    const { container } = render(<AddToCalendar {...props} />);
    const button = container.querySelector('span.addtocalendar');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('atc-style-icon');
    expect(button).toHaveClass('atc-style-menu-wb');
  });
  it('displays the correct time zone', () => {
    const baseprops = { ...props, location: 'Geneva' };
    const { container } = render(<AddToCalendar {...baseprops} />);
    const timeZoneElement = container.querySelector('var.atc_timezone');
    expect(timeZoneElement).toHaveTextContent('UTC');
  });

  it('renders the correct timezone for a given location', () => {
    const { container } = render(<AddToCalendar {...props} />);
    const timeZoneElement = container.querySelector('var.atc_timezone');
    expect(timeZoneElement).toHaveTextContent('UTC');
  });

  it('renders the correct date format', () => {
    const { container } = render(<AddToCalendar {...props} />);
    const dateElement = container.querySelector('var.atc_date_start');
    expect(dateElement).toHaveTextContent('2022-01-01 12:00:00');
  });

  it('initializes the calendar on mount', async () => {
    const { container } = render(<AddToCalendar {...props} />);
    await waitFor(() => expect(container.querySelector('div#add-to-calendar')).toBeInTheDocument());
  });

  it('renders the component with the correct props', () => {
    const { container } = render(<AddToCalendar {...props} />);
    expect(container.querySelector('var.atc_date_start')).toHaveTextContent('2022-01-01 12:00:00');
  });
  it('handles errors correctly', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation((error) => {
      console.log('Error occurred:', error);
    });

    const baseprops = { ...props, startDateTimeOffset: 'invalid-date' };
    try {
      render(<AddToCalendar {...baseprops} />);
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
    }
    expect(consoleErrorSpy).toHaveBeenCalledTimes(3);
  });
  it('returns null when startDateTimeOffset is falsy', () => {
    const props = {
      startDateTimeOffset: '',
      endDateTimeOffset: '2022-01-01T12:00:00',
      timeZone: 'UTC',
      title: 'Test Event',
      description: 'This is a test event',
      location: 'New York',
      organizer: 'John Doe',
      organizerEmail: 'johndoe@example.com',
    };
    const { container } = render(<AddToCalendar {...props} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the component when startDateTimeOffset is truthy', () => {
    const props = {
      startDateTimeOffset: '2022-01-01T12:00:00',
      endDateTimeOffset: '2022-01-01T13:00:00',
      timeZone: 'UTC',
      title: 'Test Event',
      description: 'This is a test event',
      location: 'New York',
      organizer: 'John Doe',
      organizerEmail: 'johndoe@example.com',
    };
    const { container } = render(<AddToCalendar {...props} />);
    expect(container).not.toBeEmptyDOMElement();
  });
  it('renders correctly with startDateTimeOffset', () => {
    const props = {
      startDateTimeOffset: '2022-01-01T12:00:00',
      endDateTimeOffset: '2022-01-01T13:00:00',
      timeZone: 'UTC',
      title: 'Test Event',
      description: 'This is a test event',
      location: 'New York',
      organizer: 'John Doe',
      organizerEmail: 'johndoe@example.com',
    };
    const { container } = render(<AddToCalendar {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly without startDateTimeOffset', () => {
    const props = {
      endDateTimeOffset: '2022-01-01T13:00:00',
      timeZone: 'UTC',
      title: 'Test Event',
      description: 'This is a test event',
      location: 'New York',
      organizer: 'John Doe',
      organizerEmail: 'johndoe@example.com',
    };
    const { container } = render(<AddToCalendar {...props} />);
    expect(container).toBeEmptyDOMElement();
  });
});
