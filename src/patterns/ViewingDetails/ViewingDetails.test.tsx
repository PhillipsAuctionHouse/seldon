import { render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import ViewingDetails from './ViewingDetails';
import { viewingDetailsProps, viewingDetailsWithChildrenProps } from './ViewingDetailsMock';

describe('ViewingDetails', () => {
  runCommonTests(ViewingDetails, 'ViewingDetails');

  it('renders correctly with all props', () => {
    render(<ViewingDetails {...viewingDetailsProps} />);

    expect(screen.getByRole('heading', { name: 'Sessions and Viewings' })).toBeInTheDocument();
    expect(screen.getByText('Session Times')).toBeInTheDocument();
    expect(screen.getByText('Session I, lots 1-103')).toBeInTheDocument();
    expect(screen.getByText('Saturday, 10 May, 2025, 2pm')).toBeInTheDocument();
    expect(screen.getByText('Viewing Times')).toBeInTheDocument();
    expect(screen.getByText('7-11 May, 2025')).toBeInTheDocument();
    expect(screen.getByText('Wednesday - Friday, 10:00AM - 7PM')).toBeInTheDocument();
    expect(screen.getByText('Saturday, 09:00AM - 10:00PM')).toBeInTheDocument();
    expect(screen.getByText('Sunday, 09:00AM - 1:00PM')).toBeInTheDocument();
    expect(screen.getByText('30 Berkeley Square, London, United Kingdom, W1J 6EX')).toBeInTheDocument();
    expect(screen.getByText('(Map)').parentElement).toHaveAttribute(
      'href',
      'https://www.google.com/maps/place/30+Berkeley+Square,+London,+United+Kingdom/@51.509865,-0.14189,17z',
    );
  });

  it('renders correctly without optional props', () => {
    render(<ViewingDetails />);

    expect(screen.queryByAltText('Sessions and Viewings')).toBeNull();
    expect(screen.queryByText('Session Times')).toBeNull();
    expect(screen.queryByText('Session I, lots 1-103')).toBeNull();
    expect(screen.queryByText('Viewing Times')).toBeNull();
    expect(screen.queryByText('7-11 May, 2025')).toBeNull();
    expect(screen.queryByText('Wednesday - Friday, 10:00AM - 7PM')).toBeNull();
    expect(screen.queryByText('Saturday, 09:00AM - 10:00PM')).toBeNull();
    expect(screen.queryByText('Sunday, 09:00AM - 1:00PM')).toBeNull();
  });

  it('renders children correctly', () => {
    render(<ViewingDetails {...viewingDetailsWithChildrenProps} />);
    expect(screen.getByRole('img', { name: 'viewing-details-img' })).toHaveAttribute(
      'src',
      '/static/test-image-512x288.jpg',
    );
  });
});
