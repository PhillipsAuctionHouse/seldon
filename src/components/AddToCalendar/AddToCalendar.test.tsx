import { render } from '@testing-library/react';
import AddToCalendar from './AddToCalendar'; // Path to your component

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
});
