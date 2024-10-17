import { act, render, screen } from '@testing-library/react';
import Countdown from './Countdown';
import { runCommonTests } from '../../utils/testUtils';
import { vi } from 'vitest';

describe('Countdown', () => {
  runCommonTests(Countdown, 'Countdown');

  it('renders with default labels', () => {
    render(<Countdown endDate={new Date(Date.now() + 10000).toISOString()} />);
    expect(screen.getByText('Lots Close in')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
    expect(screen.getByText('Lots Close in 2-minute intervals')).toBeInTheDocument();
  });

  it('renders with custom labels', () => {
    render(
      <Countdown
        endDate={new Date(Date.now() + 10000).toISOString()}
        label="Time Remaining"
        daysLabel="D"
        hoursLabel="H"
        minutesLabel="M"
        secondsLabel="S"
        intervalDescription="Closing soon"
      />,
    );
    expect(screen.getByText('Time Remaining')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('Closing soon')).toBeInTheDocument();
  });

  it('renders days and hours when more than a day left', () => {
    render(<Countdown endDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString()} />);
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.queryByText('Minutes')).not.toBeInTheDocument();
    expect(screen.queryByText('Seconds')).not.toBeInTheDocument();
  });

  it('renders hours and minutes when more than an hour left but less than a day', () => {
    render(<Countdown endDate={new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString()} />);
    expect(screen.queryByText('Days')).not.toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.queryByText('Seconds')).not.toBeInTheDocument();
  });

  it('renders days and hours when more than a day left but 0 hours', () => {
    render(<Countdown endDate={new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 30).toISOString()} />);
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.queryByText('Minutes')).not.toBeInTheDocument();
    expect(screen.queryByText('Seconds')).not.toBeInTheDocument();
  });

  it('shows only minutes and seconds when less than an hour left', () => {
    render(<Countdown endDate={new Date(Date.now() + 5000).toISOString()} />);
    expect(screen.queryByText('Days')).not.toBeInTheDocument();
    expect(screen.queryByText('Hours')).not.toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });

  it('shows only minutes and seconds when less than a minute left', () => {
    render(<Countdown endDate={new Date(Date.now() + 5000).toISOString()} />);
    expect(screen.queryByText('Days')).not.toBeInTheDocument();
    expect(screen.queryByText('Hours')).not.toBeInTheDocument();
    expect(screen.queryByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });

  it('updates the countdown every second', () => {
    vi.useFakeTimers();
    const endDate = new Date(Date.now() + 10000).toISOString();
    render(<Countdown endDate={endDate} />);

    expect(screen.getByText('Seconds')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Seconds')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Seconds')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
