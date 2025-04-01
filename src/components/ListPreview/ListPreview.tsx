import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface ListPreviewProps extends ComponentProps<'div'> {}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](Point back to yourself here)
 */
const ListPreview = forwardRef<HTMLDivElement, ListPreviewProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ListPreview');

  return <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}></div>;
});

ListPreview.displayName = 'ListPreview';

export default ListPreview;
