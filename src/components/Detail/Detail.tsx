import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
export interface DetailProps extends ComponentProps<'div'> {
  /*
   * Label that appears on the left side of the Detail component
   */
  label: string;
  /*
   * Value that appears on the right side of the Detail component
   */
  value: string;
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
const Detail = forwardRef<HTMLDivElement, DetailProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Detail');

  return (
    <div {...commonProps} className={`${baseClassName} ${className}`} {...props} ref={ref}>
      <dt className={`${baseClassName}__label`}>{props.label}</dt>
      <dd className={`${baseClassName}__value`}>{props.value}</dd>
    </div>
  );
});

Detail.displayName = 'Detail';

export type DetailComponent = ReturnType<typeof Detail>;

export default Detail;
