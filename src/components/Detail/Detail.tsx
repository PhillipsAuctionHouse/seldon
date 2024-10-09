import React, { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';

export interface DetailProps extends ComponentProps<'div'> {
  /*
   * Label that appears on the left side of the Detail component
   */
  label: React.ReactNode;
  /*
   * Value that appears on the right side of the Detail component
   */
  value: React.ReactNode;
}
/**
 * ## Overview
 *
 * A simple component for displaying value with a label. Layout style is handled by the [DetailList](/docs/patterns-detaillist--overview)
 *
 * [Figma Link](https://www.figma.com/design/hxqgsE26wM7hII0WaUaDfF/RW---TIMED-Lot-Details-(PDP)?node-id=189-5590&node-type=instance&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-detail--overview)
 *
 */
const Detail = forwardRef<HTMLDivElement, DetailProps>(({ className = '', label, value, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Detail');

  return (
    <div {...commonProps} className={classNames(baseClassName, className)} {...props} ref={ref}>
      <dt className={`${baseClassName}__label`}>{label}</dt>
      <dd className={`${baseClassName}__value`}>{value}</dd>
    </div>
  );
});

Detail.displayName = 'Detail';

export type DetailComponent = ReturnType<typeof Detail>;

export default Detail;
