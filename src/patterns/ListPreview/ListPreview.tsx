import { ComponentProps, forwardRef, ElementType, memo } from 'react';
import { getCommonProps } from '../../utils';

import { Text, TextVariants } from '../../components/Text';
// import { DropDown } from '../../components/DropDown';
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
   * List lot count.
   */
  lotCount?: number;
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
 * [Figma Link](https://www.figma.com/design/rIefa3bRPyZbZmtyV9PSQv/My-Account?node-id=61-14355&m=dev)
 *
 * [Storybook Link](Point back to yourself here)
 */
const ListPreview = memo(
  forwardRef<HTMLAnchorElement | HTMLElement, ListPreviewProps>(
    (
      { 
        children,
        className,
        descriptionText,
        element: Element,
        imageAlt = 'Brought to you by Phillips',
        imageFetchPriority,
        imageLoading,
        imageSizes,
        imageSrcSet,
        imageUrl = '',
        lotCount = 0,
        titleText,
        ...props 
      }
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ListPreview');
      const Component = Element ?? 'a';
      
      return (
        <Component
          {...commonProps}
          {...props}
          data-testid="seldon-list-preview"
          className={classnames('seldon-list-preview', baseClassName, className)}
        >
          <Text variant={TextVariants.title3} className="seldon-list-preview__lot-count">{lotCount}</Text>
          <Text variant={TextVariants.heading3} className="seldon-list-preview__lot-title">{titleText}</Text>
          <Text variant={TextVariants.body1} className="seldon-list-preview__lot-description">{descriptionText}</Text>
          <div className="seldon-list-preview__image">
            <img
              alt={imageAlt}
              className="seldon-list-preview__image__img"
              fetchPriority={imageFetchPriority}
              loading={imageLoading}
              sizes={imageSizes}
              srcSet={imageSrcSet}
              src={imageUrl}
            />
          </div>
          <div className="seldon-list-preview__content">
            <h3 className="seldon-list-preview__content__title">{titleText}</h3>
            <p className="seldon-list-preview__content__description">{descriptionText}</p>
            {children}
          </div>
        </Component>
      );
    }
  )
);

ListPreview.displayName = 'ListPreview';

export default ListPreview;