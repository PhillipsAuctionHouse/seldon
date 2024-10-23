import { render, screen } from '@testing-library/react';
import { Duration } from './Duration'; // Adjust the import path if necessary
import { DurationUnit } from 'date-fns';
import { zhHK, enUS } from 'date-fns/locale';

const testCases = [
  { duration: { hours: 1 }, unit: 'hours', expected: ['01', 'hour'] }, // 1 hour
  { duration: { hours: 2 }, unit: 'hours', expected: ['02', 'hours'] }, // 2 hours
  { duration: { days: 1 }, unit: 'days', expected: ['01', 'day'] }, // 1 day
  { duration: { days: 10 }, unit: 'days', expected: ['10', 'days'] }, // 2 days
  { duration: { minutes: 1 }, unit: 'minutes', expected: ['01', 'minute'] }, // 1 minute
  { duration: { minutes: 2 }, unit: 'minutes', expected: ['02', 'minutes'] }, // 2 minutes
  { duration: { seconds: 1 }, unit: 'seconds', expected: ['01', 'second'] }, // 1 second
  { duration: { seconds: 5 }, unit: 'seconds', expected: ['05', 'seconds'] }, // 2 seconds
];
describe('Duration Component', () => {
  testCases.forEach(({ duration, unit, expected }) => {
    it(`renders ${expected[0]} ${expected[1]} for duration ${Object.values(duration).join(',')} ${unit}`, () => {
      render(<Duration duration={duration} unit={unit as DurationUnit} locale={enUS} />);
      expect(screen.getByText(expected[0])).toBeInTheDocument();
      expect(screen.getByText(expected[1])).toBeInTheDocument();
    });
  });

  it(`renders chinese minutes`, () => {
    const duration = { minutes: 1 };
    render(<Duration duration={duration} unit={'minutes' as DurationUnit} locale={zhHK} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('分鐘')).toBeInTheDocument();
  });
});
