import { render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import ViewingDetails from './ViewingDetails';
import { viewingDetailsProps, viewingDetailsWithChildrenProps } from './ViewingDetailsMock';

describe('ViewingDetails', () => {
  runCommonTests(ViewingDetails, 'ViewingDetails');

  it('renders correctly with all props', () => {
    render(<ViewingDetails {...viewingDetailsProps} />);

    expect(screen.getByText('Viewings')).toBeInTheDocument();
    expect(screen.getByText('Session Times')).toBeInTheDocument();
    expect(screen.getByText('Session I, lots 1-103')).toBeInTheDocument();
    expect(screen.getByText('Saturday, 10 May, 2025, 2pm')).toBeInTheDocument();
    expect(screen.getByText('30 Berkeley Square, London, United Kingdom, W1J 6EX')).toBeInTheDocument();
    expect(screen.getByText('(Map)').parentElement).toHaveAttribute(
      'href',
      'https://www.google.com/maps/place/30+Berkeley+Square,+London,+United+Kingdom/@51.509865,-0.14189,17z',
    );
  });

  it('renders correctly without optional props', () => {
    render(<ViewingDetails />);

    expect(screen.queryByAltText('Viewings')).toBeNull();
    expect(screen.queryByText('Session Times')).toBeNull();
    expect(screen.queryByText('Session I, lots 1-103')).toBeNull();
  });

  it('renders children correctly', () => {
    render(<ViewingDetails {...viewingDetailsWithChildrenProps} />);
    expect(screen.getByRole('img', { name: 'viewing-details-img' })).toHaveAttribute(
      'src',
      'https://picsum.photos/512/288',
    );
  });
});
