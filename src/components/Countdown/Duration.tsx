import { Duration as DurationValue, DurationUnit, formatDuration, Locale } from 'date-fns';
import { px } from '../../utils';
import classnames from 'classnames';

export interface DurationProps {
  duration: DurationValue;
  unit: DurationUnit;
  locale: Locale;
  formatDurationStr?: (duration: string) => string;
}

export const Duration = ({ duration, unit, locale, formatDurationStr = (str) => str }: DurationProps) => {
  const baseClassName = `${px}-duration`;
  const durationParts = formatDuration(duration, { format: [unit], zero: true, locale }).split(' ');
  return (
    <div className={baseClassName}>
      <span className={classnames(unit === 'seconds' && `${baseClassName}--fixed-width`)}>
        {durationParts[0].padStart(2, '0')}
      </span>
      <span>{formatDurationStr(durationParts[1])}</span>
    </div>
  );
};
