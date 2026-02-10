import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import { Text } from '../../components/Text';

export interface SaleCardActionsProps extends ComponentProps<'div'> {
  /**
   * The ctas to be rendered by <SaleCard />.
   */
  children?: React.ReactNode;
}

export const SaleCardActions = forwardRef<HTMLDivElement, SaleCardActionsProps>(({ children, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleCardActions');

  return (
    <Text className={`${baseClassName}__ctas`} {...commonProps} ref={ref}>
      {children}
    </Text>
  );
});

SaleCardActions.displayName = 'SaleCardActions';

export default SaleCardActions;
