import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../../components/Text';

export interface SaleHeaderCountdownProps extends ComponentProps<'div'> {
  label?: string;
  daysLabel?: string;
  hoursLabel?: string;
}

const SaleHeaderCountdown = forwardRef<HTMLDivElement, SaleHeaderCountdownProps>(
  ({ label = 'Lots Close in', daysLabel = 'Days', hoursLabel = 'Hours', className, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleHeaderBanner');

    return (
      <div
        id="PLACEHOLDER FOR TIMER COMPONENT"
        className={`${baseClassName}__countdown-container`}
        {...commonProps}
        {...props}
        ref={ref}
      >
        <Text variant={TextVariants.heading5}>{label}</Text>
        <Text variant={TextVariants.heading5}>2 {daysLabel}</Text>
        <Text variant={TextVariants.heading5}>17 {hoursLabel}</Text>
      </div>
    );
  },
);

SaleHeaderCountdown.displayName = 'SaleHeaderCountdown';

export default SaleHeaderCountdown;
