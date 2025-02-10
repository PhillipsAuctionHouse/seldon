import { act, render, screen } from '@testing-library/react';
import Countdown from './Countdown';
import { runCommonTests } from '../../utils/testUtils';
import { vi } from 'vitest';
import { CountdownVariants } from './types';
import { addDays, addHours, addMinutes, addSeconds } from 'date-fns';
import { SupportedLanguages } from '../../types/commonTypes';

const fiveMinutesFromNow = addMinutes(new Date(), 5);
const fiveHoursFromNow = addHours(new Date(), 5);
const threeDaysFromNow = addDays(new Date(), 3);
const fiveSecondsFromNow = addSeconds(new Date(), 5);

describe('Countdown', () => {
  runCommonTests(Countdown, 'Countdown', { endDateTime: fiveMinutesFromNow });

  it('renders with default labels', () => {
    render(<Countdown endDateTime={fiveMinutesFromNow} />);
    expect(screen.getByText('Lots Close in')).toBeInTheDocument();
    expect(screen.getByText('minutes')).toBeInTheDocument();
    expect(screen.getByText('seconds')).toBeInTheDocument();
  });

  it('renders with custom labels', () => {
    render(<Countdown endDateTime={fiveMinutesFromNow} label="Time Remaining" intervalDescription="Closing soon" />);
    expect(screen.getByText('Time Remaining')).toBeInTheDocument();
    expect(screen.getByText('Closing soon')).toBeInTheDocument();
  });

  it('checks aria-label', () => {
    render(<Countdown endDateTime={fiveMinutesFromNow} />);
    expect(screen.getByRole('timer', { name: 'Lots Close in' })).toBeInTheDocument();
  });

  it('renders days and hours when more than a day left', () => {
    render(<Countdown endDateTime={threeDaysFromNow} />);
    expect(screen.getByText('days')).toBeInTheDocument();
    expect(screen.getByText('hours')).toBeInTheDocument();
    expect(screen.queryByText('minutes')).not.toBeInTheDocument();
    expect(screen.queryByText('seconds')).not.toBeInTheDocument();
  });

  it('renders hours and minutes when more than an hour left but less than a day', () => {
    render(<Countdown endDateTime={fiveHoursFromNow} />);
    expect(screen.queryByText('days')).not.toBeInTheDocument();
    expect(screen.getByText('hours')).toBeInTheDocument();
    expect(screen.getByText('minutes')).toBeInTheDocument();
    expect(screen.queryByText('seconds')).not.toBeInTheDocument();
  });

  it('renders days and hours when a day left but 0 hours', () => {
    const oneDayAndThirtyMinutesFromNow = addMinutes(addDays(new Date(), 1), 30);
    render(<Countdown endDateTime={oneDayAndThirtyMinutesFromNow} />);
    expect(screen.getByText('day')).toBeInTheDocument();
    expect(screen.getByText('hours')).toBeInTheDocument();
    expect(screen.queryByText('minutes')).not.toBeInTheDocument();
    expect(screen.queryByText('seconds')).not.toBeInTheDocument();
  });

  it('shows only minutes and seconds when less than an hour left', () => {
    render(<Countdown endDateTime={fiveSecondsFromNow} />);
    expect(screen.queryByText('days')).not.toBeInTheDocument();
    expect(screen.queryByText('hours')).not.toBeInTheDocument();
    expect(screen.getByText('minutes')).toBeInTheDocument();
    expect(screen.getByText('seconds')).toBeInTheDocument();
  });

  it('shows only minutes and seconds when less than a minute left', () => {
    render(<Countdown endDateTime={fiveSecondsFromNow} />);
    expect(screen.queryByText('days')).not.toBeInTheDocument();
    expect(screen.queryByText('hours')).not.toBeInTheDocument();
    expect(screen.queryByText('minutes')).toBeInTheDocument();
    expect(screen.getByText('seconds')).toBeInTheDocument();
  });

  it('updates the countdown every second', () => {
    vi.useFakeTimers();
    const tenSecondsFromNow = addSeconds(new Date(), 10);
    render(<Countdown endDateTime={tenSecondsFromNow} />);

    expect(screen.getByText('10')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('09')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('08')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('renders with compact variant', () => {
    const tenSecondsFromNow = addSeconds(new Date(), 10);
    render(<Countdown endDateTime={tenSecondsFromNow} variant={CountdownVariants.compact} />);
    expect(screen.getByText('minutes')).toBeInTheDocument();
    expect(screen.getByText('seconds')).toBeInTheDocument();
    expect(screen.queryByText('Lots Close in 2-minute intervals')).not.toBeInTheDocument();
  });

  const chineseHours = '小时';
  const chineseMinutes = '分钟';
  const chineseDays = '天';
  const chineseSeconds = '秒';
  it('renders with chinese minutes', () => {
    const tenSecondsFromNow = addSeconds(new Date(), 10);
    render(
      <Countdown endDateTime={tenSecondsFromNow} variant={CountdownVariants.compact} locale={SupportedLanguages.zh} />,
    );
    expect(screen.getByText(chineseMinutes)).toBeInTheDocument();
    expect(screen.getByText(chineseSeconds)).toBeInTheDocument();
    expect(screen.queryByText('Lots Close in 2-minute intervals')).not.toBeInTheDocument();
  });
  it('renders with chinese hours', () => {
    const twentyFourHoursFromNow = addHours(new Date(), 23);
    render(
      <Countdown
        endDateTime={twentyFourHoursFromNow}
        variant={CountdownVariants.compact}
        locale={SupportedLanguages.zh}
      />,
    );
    expect(screen.getByText(chineseHours)).toBeInTheDocument();
    expect(screen.getByText(chineseMinutes)).toBeInTheDocument();
    expect(screen.queryByText('Lots Close in 2-minute intervals')).not.toBeInTheDocument();
  });
  it('renders with chinese days', () => {
    const twoDaysFromNow = addDays(new Date(), 2);
    render(
      <Countdown endDateTime={twoDaysFromNow} variant={CountdownVariants.compact} locale={SupportedLanguages.zh} />,
    );
    expect(screen.getByText(chineseDays)).toBeInTheDocument();
    expect(screen.getByText(chineseHours)).toBeInTheDocument();
    expect(screen.queryByText('Lots Close in 2-minute intervals')).not.toBeInTheDocument();
  });
  it('should not render when the endDateTime has passed', () => {
    const now = new Date();
    render(<Countdown endDateTime={now} />);
    expect(screen.queryByText('Lots Close in')).not.toBeInTheDocument();
    expect(screen.queryByText('minutes')).not.toBeInTheDocument();
    expect(screen.queryByText('seconds')).not.toBeInTheDocument();
  });
  it('should render when the endDateTime is in the future, but then stay at zeros after it passes', () => {
    const now = new Date();
    render(<Countdown endDateTime={addSeconds(now, 10)} />);
    expect(screen.getByText('Lots Close in')).toBeInTheDocument();
    expect(screen.getByText('minutes')).toBeInTheDocument();
    expect(screen.getByText('seconds')).toBeInTheDocument();

    vi.useFakeTimers();
    vi.advanceTimersByTime(10000);
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(screen.getByText('00')).toBeInTheDocument();
  });
});
