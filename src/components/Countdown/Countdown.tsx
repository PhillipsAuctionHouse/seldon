import { ComponentProps, forwardRef, useEffect, useMemo, useState } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { SupportedLanguages } from '../../types/commonTypes';
import {
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { CountdownVariants } from './types';
import { Duration } from './Duration'; // Import the Duration component
import { Text, TextVariants } from '../Text';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface CountdownProps extends ComponentProps<'div'> {
  /**
   * The date the countdown should end
   */
  endDateTime: Date;
  /**
   * Function to modify strings coming from date-fns (Minutes -> Mins etc)
   */
  formatDurationStr?: (duration: string) => string;
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
   * Displays a border below the Countdown if true
   */
  showBottomBorder?: boolean;
  /**
   * Variant of the countdown
   */
  variant?: CountdownVariants;
  /**
   * Function to get the current date time
   */
  getCurrentDateTime?: () => Date | null;
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
      formatDurationStr,
      label = 'Lots Close in',
      intervalDescription,
      className,
      locale = 'en',
      showBottomBorder = true,
      variant = CountdownVariants.default,
      getCurrentDateTime = () => new Date(),
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Countdown');
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime() || new Date());

    const dateFnsLocale = locale === SupportedLanguages.zh ? zhCN : enUS;

    const timeLeft = {
      days: differenceInDays(endDateTime, currentDateTime) > 0 ? differenceInDays(endDateTime, currentDateTime) : 0,
      hours:
        differenceInHours(endDateTime, currentDateTime) > 0 ? differenceInHours(endDateTime, currentDateTime) % 24 : 0,
      minutes:
        differenceInMinutes(endDateTime, currentDateTime) > 0
          ? differenceInMinutes(endDateTime, currentDateTime) % 60
          : 0,
      seconds:
        (differenceInSeconds(endDateTime, currentDateTime) > 0
          ? differenceInSeconds(endDateTime, currentDateTime) % 60
          : 0) % 60,
    };

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDateTime(getCurrentDateTime() || new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, [endDateTime, getCurrentDateTime]);

    const showTimer = useMemo(() => {
      // we use the prop instead of the state variable to avoid hiding the timer when it hits 0
      const currentDateTime = getCurrentDateTime();
      return !!currentDateTime && new Date(endDateTime).getTime() > currentDateTime.getTime();
    }, [endDateTime, getCurrentDateTime]);

    const isClosingTag = differenceInMilliseconds(endDateTime, currentDateTime) <= 3 * 60 * 1000;

    return showTimer ? (
      <div
        {...commonProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--compact`]: variant === CountdownVariants.compact,
          [`${baseClassName}--show-bottom-border`]: showBottomBorder,
          [`${baseClassName}--closing-lot`]: isClosingTag,
        })}
        {...props}
        ref={ref}
      >
        <div className={`${baseClassName}__countdown-container`} role="timer" aria-label={label}>
          <Text variant={TextVariants.labelSmall}>{label}</Text>
          {timeLeft.days > 0 ? (
            <Duration duration={timeLeft} unit="days" locale={dateFnsLocale} formatDurationStr={formatDurationStr} />
          ) : null}
          {timeLeft.days > 0 || timeLeft.hours > 0 ? (
            <Duration duration={timeLeft} unit="hours" locale={dateFnsLocale} formatDurationStr={formatDurationStr} />
          ) : null}
          {timeLeft.days === 0 ? (
            <Duration duration={timeLeft} unit="minutes" locale={dateFnsLocale} formatDurationStr={formatDurationStr} />
          ) : null}
          {timeLeft.days === 0 && timeLeft.hours === 0 ? (
            <Duration duration={timeLeft} unit="seconds" locale={dateFnsLocale} formatDurationStr={formatDurationStr} />
          ) : null}
        </div>
        {variant === CountdownVariants.default ? <span>{intervalDescription}</span> : null}
      </div>
    ) : null;
  },
);

Countdown.displayName = 'Countdown';

export default Countdown;
