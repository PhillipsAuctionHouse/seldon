import { render } from '@testing-library/react';
import AddToCalendar from './AddToCalendar';

describe('AddToCalendar component', () => {
  it('renders correctly', () => {
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

  it('renders calendar icon', () => {
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
    const calendarIcon = container.querySelector('svg');
    expect(calendarIcon).toBeInTheDocument();
  });

  it('renders event details', () => {
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

    const { getByText } = render(<AddToCalendar {...props} />);
    expect(getByText('Test Event')).toBeInTheDocument();
    expect(getByText('This is a test event')).toBeInTheDocument();
    expect(getByText('New York')).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('johndoe@example.com')).toBeInTheDocument();
  });
});
