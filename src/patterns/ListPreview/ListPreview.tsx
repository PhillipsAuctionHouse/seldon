import { ComponentProps, forwardRef, ElementType, memo, useRef } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import Link, { LinkProps } from '../../components/Link/Link';
import { Text, TextVariants } from '../../components/Text';
import { SeldonImage } from '../../components/SeldonImage';
import { Icon } from '../../components/Icon';
import { Popover } from 'radix-ui';
export interface ListPreviewProps extends ComponentProps<'div'> {
  /**
   * Lots display text en/zh
   */
  lotText?: string;
  /**
   * Lots display text en/zh
   */
  lotsText?: string;
  /**
   * Lot favoritesText text en/zh
   */
  favoritesText?: string;
  /**
   * Lot list text en/zh
   */
  listText?: string;
  /**
   * Lot edit list text en/zh
   */
  editListText?: string;
  /**
   * Lot delete list text en/zh
   */
  deleteListText?: string;
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
  listImageUrl: string;
  /**
   * Whether this card is in favorites view
   */
  isFavorites?: boolean;
  /**
   * Element to render within the navigation item, renders <Link> by default
   */
  element?: ElementType<LinkProps>;
  /**
   * imageLink
   */
  imageLink?: string;
  /**
   * Callback function for editList menu item click
   */
  onEditListClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Callback function for deleteList menu item click
   */
  onDeleteListClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
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
        listImageUrl,
        isFavorites = false,
        element: Component = Link,
        imageLink,
        lotText = 'LOT',
        lotsText = 'LOTS',
        favoritesText = 'You have not added any objects to your Favorites yet.',
        listText = 'Create your first List.',
        editListText = 'Edit List',
        deleteListText = 'Delete List',
        onEditListClick,
        onDeleteListClick,
        ...props
      },
      ref,
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ListPreview');
      const imageRef = useRef<HTMLDivElement>(null);
      const isCountEmpty = list.count === 0;

      return (
        <div {...commonProps} className={classnames(baseClassName, className)} ref={ref}>
          <div className={`${baseClassName}__content`}>
            <div className={`${baseClassName}__header`}>
              <div className={`${baseClassName}__info`}>
                {(isFavorites || !isCountEmpty) && (
                  <Text element="span" className={`${baseClassName}__count`} variant={TextVariants.body3}>
                    {list.count} {list.count === 1 ? lotText : lotsText}
                  </Text>
                )}
                {
                  <Text element="h3" className={`${baseClassName}__title`} variant={TextVariants.heading5}>
                    {list.name}
                  </Text>
                }
              </div>
              <>
                {!isCountEmpty && !isFavorites && (
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <div className={`${baseClassName}__actions`} data-testid="menu-trigger">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                            fill="currentColor"
                          />
                          <path
                            d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                            fill="currentColor"
                          />
                          <path
                            d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content sideOffset={5} className={`${baseClassName}__popover-content`}>
                        <div className={`${baseClassName}__dropdown`} data-testid="dropdown-menu">
                          <div className={`${baseClassName}__dropdown--item`} onClick={onEditListClick}>
                            {editListText}
                          </div>
                          <div className={`${baseClassName}__dropdown--item`} onClick={onDeleteListClick}>
                            {deleteListText}
                          </div>
                        </div>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                )}
              </>
            </div>

            <Component href={imageLink} className={`${baseClassName}__media-link`}>
              {isCountEmpty ? (
                isFavorites ? (
                  <div className={`${baseClassName}__media-container`} data-testid="favorites">
                    <div className={classnames(`${baseClassName}__empty`, `${baseClassName}__empty--favorites`)}>
                      <div className={`${baseClassName}__empty__content`}>
                        <Icon
                          icon="FavoriteOutline"
                          width={24}
                          height={24}
                          color="$dark-gray"
                          className={`${baseClassName}__icon`}
                        />
                        <div className={`${baseClassName}__text`}>{favoritesText}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`${baseClassName}__media-container`} data-testid="list">
                    <div className={classnames(`${baseClassName}__empty`, `${baseClassName}__empty--list`)}>
                      <div className={`${baseClassName}__empty__content`}>
                        <Icon
                          icon="Plus"
                          width={24}
                          height={24}
                          color="$dark-gray"
                          className={`${baseClassName}__icon`}
                        />
                        <div className={`${baseClassName}__text`}>{listText}</div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className={`${baseClassName}__media-container`} ref={imageRef}>
                  <SeldonImage
                    alt={list.name}
                    aspectRatio="1/1"
                    className={`${baseClassName}__media`}
                    objectFit="cover"
                    src={listImageUrl}
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </div>
              )}
            </Component>
          </div>
        </div>
      );
    },
  ),
);

ListPreview.displayName = 'ListPreview';

export default ListPreview;
