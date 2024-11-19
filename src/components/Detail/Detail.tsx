import React, { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

export interface DetailProps extends ComponentProps<'div'> {
  /*
   * Whether or not to constrain the width of the label
   */
  hasWrap?: boolean;
  /*
   * Label that appears on the left side of the Detail component
   */
  label: React.ReactNode;
  /*
   * Sublabel that appears inline to right of label.
   */
  subLabel?: React.ReactNode;
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
const Detail = forwardRef<HTMLDivElement, DetailProps>(
  ({ className = '', hasWrap = true, label, subLabel, value, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Detail');

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <dt className={classnames(`${baseClassName}__label`, { [`${baseClassName}__label--no-wrap`]: !hasWrap })}>
          {label} {subLabel ? <span>{subLabel}</span> : null}
        </dt>
        <dd className={`${baseClassName}__value`}>{value}</dd>
      </div>
    );
  },
);

Detail.displayName = 'Detail';

export type DetailComponent = ReturnType<typeof Detail>;

export default Detail;
