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
   * Lot create first list text en/zh
   */
  createFirstListText?: string;
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
   * Preview image for the list
   */
  imageSrc: string;
  /**
   * Whether this card is in favorites view or lists view
   */
  variant: 'favorites' | 'lists' | 'create';
  /**
   * React component to render within the navigation item, renders <Link> by default
   */
  element?: ElementType<LinkProps>;
  /**
   * Link to navigate to when the tile is clicked
   */
  href?: string;
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
  /**
   * Custom class name for the Link component
   */
  linkClassName?: string;
  /**
   * Custom icon size for the icon in the tile
   */
  iconSize?: number;
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
        imageSrc,
        variant,
        element: Component = Link,
        href,
        emptyFavoritesText = 'You have not added any objects to your Favorites yet.',
        emptyListsText = 'You have not added any objects to your List yet.',
        createFirstListText = 'Create your first List.',
        editListText = 'Edit List',
        deleteListText = 'Delete List',
        onEdit,
        onDelete,
        formatlotStr = (count, lotText = count === 1 ? 'LOT' : 'LOTS') => `${count} ${lotText}`,
        linkClassName,
        iconSize = 22,
        ...props
      },
      ref,
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'FavoritesCollectionTile');
      const imageRef = useRef<HTMLDivElement>(null);
      const hasListData = name && count !== null && count !== undefined;
      const isCountEmpty = count === 0;
      const isListVariant = variant === 'lists';
      const isCreateVariant = variant === 'create';
      const isHasListAndCountEmpty = hasListData && isCountEmpty;

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
                {name && (
                  <Text element="h3" className={`${baseClassName}__title`} variant={TextVariants.heading5}>
                    {name}
                  </Text>
                )}
              </div>
              <>
                {hasListData && isListVariant && (
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <div
                        className={`${baseClassName}__actions`}
                        data-testid="menu-trigger"
                        tabIndex={0}
                        role="button"
                        aria-label="Manage List"
                        aria-haspopup="menu"
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            event.stopPropagation();
                            (event.target as HTMLElement).click();
                          }
                        }}
                      >
                        <div className={`${baseClassName}__icon-rotate`}>
                          <Icon
                            icon="Icon"
                            width={iconSize}
                            height={iconSize}
                            color="$dark-gray"
                            className={`${baseClassName}__icon-button`}
                            title="Manage List"
                          />
                        </div>
                      </div>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        avoidCollisions={true}
                        collisionPadding={10}
                        sideOffset={5}
                        align="start"
                        alignOffset={5}
                        className={`${baseClassName}__popover-content`}
                      >
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
            {isCreateVariant ? (
              <>
                <div className={`${baseClassName}__create-spacing`}></div>
                <div
                  className={`${baseClassName}__media-container`}
                  data-testid="list"
                  aria-label="Lists"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      props.onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
                    }
                  }}
                >
                  <div
                    className={classnames(`${baseClassName}__empty`, {
                      [`${baseClassName}__empty--create-list`]: !hasListData,
                    })}
                  >
                    <div className={`${baseClassName}__empty__content`}>
                      <Icon
                        icon="Add"
                        width={iconSize}
                        height={iconSize}
                        color="$dark-gray"
                        className={classnames(`${baseClassName}__icon`, {
                          [`${baseClassName}__icon-circle`]: !hasListData,
                        })}
                        title="Create List"
                      />
                      <div className={`${baseClassName}__text`}>{createFirstListText}</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Component href={href} className={classnames(`${baseClassName}__media-link`, linkClassName)} tabIndex={0}>
                {isCountEmpty && variant === 'favorites' && (
                  <div className={`${baseClassName}__media-container`} data-testid="favorites" aria-label="Favorites">
                    <div className={classnames(`${baseClassName}__empty`, `${baseClassName}__empty--bg`)}>
                      <div className={`${baseClassName}__empty__content`}>
                        <Icon
                          icon="Favorite"
                          width={iconSize}
                          height={iconSize}
                          color="$dark-gray"
                          className={`${baseClassName}__icon`}
                          title="Favorites"
                        />
                        <div className={`${baseClassName}__text`}>{emptyFavoritesText}</div>
                      </div>
                    </div>
                  </div>
                )}

                {isHasListAndCountEmpty && isListVariant && (
                  <div className={`${baseClassName}__media-container`} data-testid="list" aria-label="Lists">
                    <div
                      className={classnames(`${baseClassName}__empty`, {
                        [`${baseClassName}__empty--create-list`]: !hasListData,
                        [`${baseClassName}__empty--bg`]: isCountEmpty,
                      })}
                    >
                      <div className={`${baseClassName}__empty__content`}>
                        <Icon
                          icon="Favorite"
                          width={iconSize}
                          height={iconSize}
                          color="$dark-gray"
                          className={classnames(`${baseClassName}__icon`, {
                            [`${baseClassName}__icon-circle`]: !hasListData,
                          })}
                          title="Favorite"
                        />
                        <div className={`${baseClassName}__text`}>{emptyListsText}</div>
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
                      objectFit="contain"
                      src={imageSrc}
                      style={{
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                )}
              </Component>
            )}
          </div>
        </div>
      );
    },
  ),
);

export default FavoritesCollectionTile;
