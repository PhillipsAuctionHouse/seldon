import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import { ComponentProps, ElementType, forwardRef, memo, useRef } from 'react';
import { Icon } from '../../components/Icon';
import Link, { LinkProps } from '../../components/Link/Link';
import { SeldonImage } from '../../components/SeldonImage';
import { Text, TextVariants } from '../../components/Text';
import { getCommonProps } from '../../utils';

export interface FavoritesCollectionTileProps extends ComponentProps<'div'> {
  /**
   * Unique identifier for the list
   */
  id: string;
  /**
   * Lot empty Favorites text en/zh
   */
  emptyFavoritesText?: string;
  /**
   * Lot blank list text en/zh
   */
  blankListText?: string;
  /**
   * Lot empty lists text en/zh
   */
  emptyListsText?: string;
  /**
   * Lot edit list text en/zh
   */
  editListText?: string;
  /**
   * Lot delete list text en/zh
   */
  deleteListText?: string;
  /**
   * List data count
   */
  count: number;
  /**
   * List data name
   */
  name: string;
  /**
   * Image URL for the list
   */
  listImageUrl: string;
  /**
   * Whether this card is in favorites view or lists view
   */
  variant: 'favorites' | 'lists';
  /**
   * href to render within the navigation item, renders <Link> by default
   */
  href?: ElementType<LinkProps>;
  /**
   * imageLink
   */
  imageLink?: string;
  /**
   * Callback function for editList menu item click
   */
  onEdit?: (id: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback function for deleteList menu item click
   */
  onDelete?: (id: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Function to modify strings for lot string translation
   */
  formatlotStr?: (count: number, lotText?: string) => string;
}

/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/rIefa3bRPyZbZmtyV9PSQv/My-Account?node-id=61-14355&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-FavoritesCollectionTile--overview)
 */
const FavoritesCollectionTile = memo(
  forwardRef<HTMLDivElement, FavoritesCollectionTileProps>(
    (
      {
        id,
        className,
        count,
        name,
        listImageUrl,
        variant,
        href: Component = Link,
        imageLink,
        emptyFavoritesText = 'You have not added any objects to your Favorites yet.',
        emptyListsText = 'You have not added any objects to your List yet.',
        blankListText = 'Create your first List.',
        editListText = 'Edit List',
        deleteListText = 'Delete List',
        onEdit,
        onDelete,
        formatlotStr = (count, lotText = count > 1 ? 'LOTS' : 'LOT') => `${count} ${lotText}`,
        ...props
      },
      ref,
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'FavoritesCollectionTile');
      const imageRef = useRef<HTMLDivElement>(null);
      const hasListData = name && count !== null && count !== undefined;
      const isCountEmpty = count === 0;

      return (
        <div {...commonProps} className={classnames(baseClassName, className)} ref={ref} id={id}>
          <div className={`${baseClassName}__content`}>
            <div className={`${baseClassName}__header`}>
              <div className={`${baseClassName}__info`}>
                {hasListData && (
                  <Text element="span" className={`${baseClassName}__count`} variant={TextVariants.body3}>
                    {formatlotStr && hasListData && formatlotStr(count)}
                  </Text>
                )}
                {
                  <Text element="h3" className={`${baseClassName}__title`} variant={TextVariants.heading5}>
                    {name}
                  </Text>
                }
              </div>
              <>
                {hasListData && (variant === 'lists' || (variant === 'favorites' && !isCountEmpty)) && (
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <div
                        className={`${baseClassName}__actions`}
                        data-testid="menu-trigger"
                        tabIndex={0}
                        role="button"
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            event.stopPropagation();
                            (event.target as HTMLElement).click();
                          }
                        }}
                      >
                        <Icon
                          icon="Icon"
                          width={24}
                          height={24}
                          color="$dark-gray"
                          className={`${baseClassName}__icon-rotate`}
                        />
                      </div>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content sideOffset={5} className={`${baseClassName}__popover-content`}>
                        <div className={`${baseClassName}__dropdown`} data-testid={`dropdown-menu`}>
                          <button
                            className={`${baseClassName}__dropdown--item`}
                            onClick={(event) => onEdit?.(id, event)}
                            type="button"
                          >
                            {editListText}
                          </button>
                          <button
                            className={`${baseClassName}__dropdown--item`}
                            onClick={(event) => onDelete?.(id, event)}
                            type="button"
                          >
                            {deleteListText}
                          </button>
                        </div>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                )}
              </>
            </div>

            <Component href={imageLink} className={`${baseClassName}__media-link`} tabIndex={0}>
              {isCountEmpty && variant === 'favorites' && (
                <div className={`${baseClassName}__media-container`} data-testid="favorites" aria-label="Favorites">
                  <div className={classnames(`${baseClassName}__empty`, `${baseClassName}__empty--favorites`)}>
                    <div className={`${baseClassName}__empty__content`}>
                      <Icon
                        icon="Favorite"
                        width={24}
                        height={24}
                        color="$dark-gray"
                        className={`${baseClassName}__icon`}
                      />
                      <div className={`${baseClassName}__text`}>{emptyFavoritesText}</div>
                    </div>
                  </div>
                </div>
              )}

              {(isCountEmpty || !hasListData) && variant === 'lists' && (
                <div className={`${baseClassName}__media-container`} data-testid="list" aria-label="Lists">
                  <div className={classnames(`${baseClassName}__empty`, `${baseClassName}__empty--list`)}>
                    <div className={`${baseClassName}__empty__content`}>
                      <Icon
                        icon={hasListData && isCountEmpty ? 'Favorite' : 'Add'}
                        width={24}
                        height={24}
                        color="$dark-gray"
                        className={`${baseClassName}__icon`}
                      />
                      <div className={`${baseClassName}__text`}>
                        {hasListData && isCountEmpty ? emptyListsText : blankListText}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!isCountEmpty && hasListData && (
                <div className={`${baseClassName}__media-container`} ref={imageRef}>
                  <SeldonImage
                    alt={name}
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

export default FavoritesCollectionTile;
