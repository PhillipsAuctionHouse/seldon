import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';

export interface SaleCardActionsProps extends ComponentProps<'div'> {
  /**
   * The ctas to be rendered by <SaleCard />.
   */
  children?: React.ReactNode;
}

export const SaleCardActions = forwardRef<HTMLDivElement, SaleCardActionsProps>(({ children, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleCardActions');

  return (
    <div className={`${baseClassName}__ctas`} {...commonProps} ref={ref}>
      {children}
    </div>
  );
});

SaleCardActions.displayName = 'SaleCardActions';

export default SaleCardActions;
