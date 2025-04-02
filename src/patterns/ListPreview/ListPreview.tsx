import { ComponentProps, forwardRef, ElementType } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface ListPreviewProps extends ComponentProps<'div'> {
  /**
   * Optional Element to render at the top level.
   */
  element?: ElementType<ComponentProps<'a'>>;
  /**
   * Image alt text for the object.
   */
  imageAlt?: string;
  /**
   * Image URL for the object.
   */
  imageUrl?: string;
  /**
   * Image srcset for the object. [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset]
   */
  imageSrcSet?: string;
  /**
   * Image sizes for the object. [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes]
   */
  imageSizes?: string;
  /**
   * Image loading attribute. [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading]
   */
  imageLoading?: ComponentProps<'img'>['loading'];
  /**
   * Image fetch priority. [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-fetchpriority]
   */
  imageFetchPriority?: ComponentProps<'img'>['fetchPriority'];
  /**
   * List description.
   */
  descriptionText?: string;
  /**
   * List title.
   */
  titleText?: string;
}
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
