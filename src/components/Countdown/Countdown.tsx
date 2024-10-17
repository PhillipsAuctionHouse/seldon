import { ComponentProps, forwardRef, useCallback, useEffect, useState } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface CountdownProps extends ComponentProps<'div'> {
  /**
   * The date the countdown should end
   */
  endDate: string;
  /**
   * Any descriptor to appear below the coundown
   */
  intervalDescription?: string;
  /**
   * Text translation for days
   */
  daysLabel?: string;
  /**
   * Text translation for hours
   */
  hoursLabel?: string;
  /**
   * Text translation for minutes
   */
  minutesLabel?: string;
  /**
   * Text translation for seconds
   */
  secondsLabel?: string;
  /**
   * Text translation for what the countdown is for
   */
  label?: string;
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10850-35410&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-countdown--overview)
 */
const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  (
    {
      endDate,
      label = 'Lots Close in',
      daysLabel = 'Days',
      hoursLabel = 'Hours',
      minutesLabel = 'Minutes',
      secondsLabel = 'Seconds',
      intervalDescription = 'Lots Close in 2-minute intervals',
      className,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Countdown');

    const calculateTimeLeft = useCallback(() => {
      const targetTime = new Date(endDate).getTime();
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;

      // Adjust for GMT offsets and Daylight Saving Time
      const targetDate = new Date(endDate);
      const currentDate = new Date();

      const targetOffset = targetDate.getTimezoneOffset();
      const currentOffset = currentDate.getTimezoneOffset();

      const offsetDifference = (currentOffset - targetOffset) * 60 * 1000;
      const adjustedDifference = difference + offsetDifference;

      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (adjustedDifference > 0) {
        timeLeft = {
          days: Math.floor(adjustedDifference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((adjustedDifference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((adjustedDifference / 1000 / 60) % 60),
          seconds: Math.floor((adjustedDifference / 1000) % 60),
        };
      }

      return timeLeft;
    }, [endDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }, [calculateTimeLeft, endDate]);

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <div className={`${baseClassName}__countdown-container`}>
          <span>{label}</span>
          {timeLeft.days > 0 && (
            <span className={`${baseClassName}__time-item`}>
              <span className={`${baseClassName}__time-item--numbers`}>
                {timeLeft.days.toString().padStart(2, '0')}
              </span>{' '}
              <span>{daysLabel}</span>
            </span>
          )}
          {(timeLeft.hours > 0 || (timeLeft.days > 0 && timeLeft.hours === 0)) && (
            <span className={`${baseClassName}__time-item`}>
              <span className={`${baseClassName}__time-item--numbers`}>
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>{' '}
              <span>{hoursLabel}</span>
            </span>
          )}
          {timeLeft.days <= 0 && (
            <span className={`${baseClassName}__time-item`}>
              <span className={`${baseClassName}__time-item--numbers`}>
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>{' '}
              <span>{minutesLabel}</span>
            </span>
          )}
          {timeLeft.hours <= 0 && timeLeft.days === 0 && (
            <span className={`${baseClassName}__time-item`}>
              <span className={`${baseClassName}__time-item--numbers`}>
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>{' '}
              <span>{secondsLabel}</span>
            </span>
          )}
        </div>
        <span>{intervalDescription}</span>
      </div>
    );
  },
);

Countdown.displayName = 'Countdown';

export default Countdown;
