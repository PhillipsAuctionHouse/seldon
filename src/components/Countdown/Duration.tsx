import { Duration as DurationValue, DurationUnit, formatDuration, Locale } from 'date-fns';
import { px } from '../../utils';
import { Text, TextVariants } from '../Text';

export interface DurationProps {
  duration: DurationValue;
  unit: DurationUnit;
  locale: Locale;
  formatDurationStr?: (duration: string) => string;
  textVariant?: TextVariants;
}

export const Duration = ({
  duration,
  unit,
  locale,
  formatDurationStr = (str) => str,
  textVariant = TextVariants.labelMedium,
}: DurationProps) => {
  const baseClassName = `${px}-duration`;
  const durationParts = formatDuration(duration, { format: [unit], zero: true, locale }).split(' ');
  return (
    <div className={baseClassName}>
      <Text variant={textVariant}>{durationParts[0].padStart(2, '0')}</Text>
      <Text variant={textVariant}>{formatDurationStr(durationParts[1])}</Text>
    </div>
  );
};
