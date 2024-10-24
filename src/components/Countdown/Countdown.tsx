import { ComponentProps, forwardRef, useEffect, useState } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { SupportedLanguages } from '../../types/commonTypes';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { CountdownVariants } from './types';
import { Duration } from './Duration'; // Import the Duration component

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface CountdownProps extends ComponentProps<'div'> {
  /**
   * The date the countdown should end
   */
  endDateTime: Date;
  /**
   * Any descriptor to appear below the coundown
   */
  intervalDescription?: string;
  /**
   * Text translation for what the countdown is for
   */
  label?: string;
  /**
   * Locale to use to format date strings
   */
  locale?: SupportedLanguages;
  /**
   * Variant of the countdown
   */
  variant?: CountdownVariants;
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
      endDateTime,
      label = 'Lots Close in',
      intervalDescription = 'Lots Close in 1-minute intervals',
      className,
      locale = 'en',
      variant = CountdownVariants.default,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Countdown');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const dateFnsLocale = locale === SupportedLanguages.zh ? zhCN : enUS;

    const timeLeft = {
      days: differenceInDays(endDateTime, currentDateTime),
      hours: differenceInHours(endDateTime, currentDateTime) % 24,
      minutes: differenceInMinutes(endDateTime, currentDateTime) % 60,
      seconds: (differenceInSeconds(endDateTime, currentDateTime) % 60) % 60,
    };

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, [endDateTime]);

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <div className={`${baseClassName}__countdown-container`} role="timer" aria-label={label}>
          <span>{label}</span>
          {timeLeft.days > 0 ? <Duration duration={timeLeft} unit="days" locale={dateFnsLocale} /> : undefined}
          {timeLeft.days > 0 || timeLeft.hours > 0 ? (
            <Duration duration={timeLeft} unit="hours" locale={dateFnsLocale} />
          ) : undefined}
          {timeLeft.days === 0 ? <Duration duration={timeLeft} unit="minutes" locale={dateFnsLocale} /> : undefined}
          {timeLeft.days === 0 && timeLeft.hours === 0 ? (
            <Duration duration={timeLeft} unit="seconds" locale={dateFnsLocale} />
          ) : undefined}
        </div>
        {variant === CountdownVariants.default ? <span>{intervalDescription}</span> : undefined}
      </div>
    );
  },
);

Countdown.displayName = 'Countdown';

export default Countdown;
