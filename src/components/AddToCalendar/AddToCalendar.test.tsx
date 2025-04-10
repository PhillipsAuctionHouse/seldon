import { ReactNode } from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { getTimeZone } from './utils';
import AddToCalendar from './AddToCalendar';

const props = {
  startDateTimeOffset: '2025-01-27T15:13:02.59+00:00',
  endDateTimeOffset: '2025-06-27T15:13:02.59+00:00',
  timeZone: 'America/New_York',
  title: 'Jewels & More: Online Auction',
  description: 'Jewels & More: Online Auction.',
  location: 'New York',
  organizer: 'Conference Organizers',
  organizerEmail: 'test@example.com',
};

vi.mock('@radix-ui/react-menubar', () => ({
  Root: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Menu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Trigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('getTimeZone', () => {
  it('should return the correct time zone for a known location', () => {
    expect(getTimeZone('Geneva')).toBe('Europe/Paris');

    expect(getTimeZone('Hong Kong')).toBe('Asia/Hong_Kong');

    expect(getTimeZone('London')).toBe('Europe/London');

    expect(getTimeZone('New York')).toBe('America/New_York');

    expect(getTimeZone('Paris')).toBe('Europe/Paris');

    expect(getTimeZone('Singapore')).toBe('Asia/Singapore');
  });

  it('should return an empty string for an unknown location', () => {
    expect(getTimeZone('Unknown City')).toBe('');

    expect(getTimeZone('')).toBe(''); //test empty string

    expect(getTimeZone(undefined as unknown as string)).toBe(''); //test undefined
  });
});

describe('AddToCalendar component', () => {
  it('renders correctly with all props', async () => {
    render(<AddToCalendar {...props} />);
    await waitFor(() => {
      expect(screen.getByText(props.title)).toBeInTheDocument();
      expect(screen.getByText(props.description)).toBeInTheDocument();
      expect(screen.getByText(props.location)).toBeInTheDocument();
      expect(screen.getByText(props.organizer)).toBeInTheDocument();
      expect(screen.getByText(props.organizerEmail)).toBeInTheDocument();
    });
  });

  it('renders calendar icon with correct SVG paths', () => {
    const { container } = render(<AddToCalendar {...props} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      expect(paths).toHaveLength(2);
    }
  });

  it('renders event details', async () => {
    //Use async/await for better handling of asynchronous operations
    render(<AddToCalendar {...props} />);
    await waitFor(() => {
      expect(screen.getByText('Jewels & More: Online Auction')).toBeInTheDocument();
      expect(screen.getByText('Jewels & More: Online Auction.')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
      expect(screen.getByText('Conference Organizers')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText(/2025-01-27/)).toBeInTheDocument(); //Check for date part
      expect(screen.getByText(/2025-06-27/)).toBeInTheDocument(); //Check for date part
      expect(screen.getByText('America/New_York')).toBeInTheDocument();
    });
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
    expect(timeZoneElement).toHaveTextContent('America/New_York');
  });

  it('renders the correct timezone for a given location', () => {
    const { container } = render(<AddToCalendar {...props} />);
    const timeZoneElement = container.querySelector('var.atc_timezone');
    expect(timeZoneElement).toHaveTextContent('America/New_York');
  });

  it('renders the correct date format', () => {
    const { container } = render(<AddToCalendar {...props} />);
    const dateElement = container.querySelector('var.atc_date_start');
    expect(dateElement).toHaveTextContent('2025-01-27 15:13:02');
  });

  it('initializes the calendar on mount', async () => {
    const { container } = render(<AddToCalendar {...props} />);
    await waitFor(() => expect(container.querySelector('div#add-to-calendar')).toBeInTheDocument());
  });

  it('renders the component with the correct props', () => {
    const { container } = render(<AddToCalendar {...props} />);
    expect(container.querySelector('var.atc_date_start')).toHaveTextContent('2025-01-27 15:13:02');
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
