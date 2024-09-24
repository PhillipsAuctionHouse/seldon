import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

export interface DetailProps extends ComponentProps<'div'> {
  /*
   * Label that appears on the left side of the Detail component
   */
  label: string;
  /*
   * Value that appears on the right side of the Detail component
   */
  value: string;
  /*
   * If true, a bottom border will be applied
   */
  showBottomBorder?: boolean;
}
/**
 * ## Overview
 *
 * A simple component for displaying value with a label.
 *
 * [Figma Link](https://www.figma.com/design/hxqgsE26wM7hII0WaUaDfF/RW---TIMED-Lot-Details-(PDP)?node-id=189-5590&node-type=instance&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-detail--overview)
 *
 */
const Detail = forwardRef<HTMLDivElement, DetailProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Detail');
  const { showBottomBorder } = props;

  return (
    <div
      {...commonProps}
      className={classnames(baseClassName, className, {
        'show-bottom-border': showBottomBorder,
      })}
      {...props}
      ref={ref}
    >
      <span className={classnames(`${baseClassName}--detail`, `${baseClassName}--label`)}>{props.label}</span>
      <span className={classnames(`${baseClassName}--detail`, `${baseClassName}--value`)}>{props.value}</span>
    </div>
  );
});

Detail.displayName = 'Detail';

export default Detail;
