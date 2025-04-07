import { ComponentProps, forwardRef, ElementType, memo, useRef } from 'react';
import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../../components/Text';
import { SeldonImage } from '../../components/SeldonImage';

export interface ListPreviewProps extends ComponentProps<'div'> {
  /**
   * List data containing count and name
   */
  list: {
    count: number;
    name: string;
  };
  /**
   * Image URL for the list
   */
  transformedImageUrl: string;
  /**
   * Whether this card is in favorites view
   */
  isFavorites?: boolean;
  /**
   * Analytics wrapper for click events
   */
  onClickAnalyticsWrapper: <T>(
    callback: () => void,
    eventName: string
  ) => (event: T) => void;
  /**
   * Function to navigate to list details
   */
  navigateToList: () => void;
  /**
   * Optional Element to render at the top level
   */
  element?: ElementType<ComponentProps<'div'>>;
  /**
   * Element used for editing list
   */
  EditListMenu?: React.ComponentType<{ list: any }>;
}

/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/rIefa3bRPyZbZmtyV9PSQv/My-Account?node-id=61-14355&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-listpreview--overview)
 */
const ListPreview = memo(
  forwardRef<HTMLDivElement, ListPreviewProps>(
    (
      {
        className,
        list,
        transformedImageUrl,
        isFavorites = false,
        onClickAnalyticsWrapper,
        navigateToList,
        element: Element,
        EditListMenu,
        ...props
      },
      ref,
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ListPreview');
      const Component = Element ?? 'div';
      const imageRef = useRef<HTMLDivElement>(null);

      return (
        <Component
          {...commonProps} 
          className={classnames(baseClassName, className)} 
          {...props} 
          ref={ref}
        >
          <div className={`${baseClassName}__header`}>
            <div className={`${baseClassName}__info`}>
              <Text 
                element="span" 
                className={`${baseClassName}__count`} 
                variant={TextVariants.body3}
              >
                {list.count} {list.count === 1 ? 'LOT' : 'LOTS'}
              </Text>
              <Text 
                element="h3" 
                className={`${baseClassName}__title`} 
                variant={TextVariants.heading5}
              >
                {list.name}
              </Text>
            </div>
            <div className={`${baseClassName}__actions`}>
              {!isFavorites && EditListMenu && <EditListMenu list={list} />}
            </div>
          </div>
          <div 
            className={`${baseClassName}__media-container`} 
            ref={imageRef}
          >
            <SeldonImage
              alt={list.name}
              aspectRatio="1/1"
              className={`${baseClassName}__media`}
              objectFit="cover"
              src={transformedImageUrl}
              onClick={onClickAnalyticsWrapper<React.MouseEvent>(
                navigateToList,
                isFavorites ? 'navigateToFavoritesList' : 'navigateToList'
              )}
              style={{
                cursor: 'pointer',
              }}
            />
          </div>
        </Component>
      );
    },
  ),
);

ListPreview.displayName = 'ListPreview';

export default ListPreview;