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
  /**
   * ARIA label for the popover menu trigger
   */
  menuAriaLabel?: string;
  /**
   * ARIA label for the create variant container
   */
  favoritesAriaLabel?: string;
  /**
   * ARIA label for the lists empty state
   */
  emptyListAriaLabel?: string;
  /**
   * ARIA label for list
   */
  listAriaLabel?: string;
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

// --- Variant Components ---

const CreateVariant = ({
  baseClassName,
  iconSize,
  createFirstListText,
  onClick,
}: {
  baseClassName: string;
  iconSize: number;
  createFirstListText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type="button"
      className={`${baseClassName}__create-variant`}
      data-testid="create-list"
      aria-label={createFirstListText}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      <span className={classnames(`${baseClassName}__empty`, `${baseClassName}__empty--create-list`)}>
        <span className={`${baseClassName}__empty__content`}>
          <Icon
            icon="Add"
            width={iconSize}
            height={iconSize}
            color="$gray-75"
            className={classnames(`${baseClassName}__icon`, `${baseClassName}__icon-circle`)}
            aria-hidden="true"
          />
          <span className={`${baseClassName}__text`}>{createFirstListText}</span>
        </span>
      </span>
    </button>
  );
};

const EmptyVariant = ({
  baseClassName,
  iconSize,
  text,
  ariaLabel,
  dataTestId,
}: {
  baseClassName: string;
  iconSize: number;
  text: string;
  ariaLabel: string;
  dataTestId: string;
}) => {
  return (
    <div className={`${baseClassName}__media-container`} data-testid={dataTestId} aria-label={ariaLabel} role="region">
      <div className={classnames(`${baseClassName}__empty`, `${baseClassName}__empty--bg`)}>
        <div className={`${baseClassName}__empty__content`}>
          <Icon
            icon="Favorite"
            width={iconSize}
            height={iconSize}
            color="$gray-75"
            className={classnames(`${baseClassName}__icon`)}
            aria-hidden="true"
          />
          <div className={`${baseClassName}__text`}>{text}</div>
        </div>
      </div>
    </div>
  );
};

const ListImageVariant = ({
  baseClassName,
  imageRef,
  listAriaLabel,
  name,
  imageSrc,
}: {
  baseClassName: string;
  imageRef: React.RefObject<HTMLDivElement>;
  listAriaLabel: string;
  name: string;
  imageSrc: string;
  iconSize: number;
}) => {
  return (
    <div
      className={`${baseClassName}__media-container`}
      ref={imageRef}
      aria-label={listAriaLabel}
      data-testid="list"
      role="region"
    >
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
  );
};

// --- Main Component ---

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
        menuAriaLabel = 'Manage List',
        favoritesAriaLabel = 'Favorites',
        emptyListAriaLabel = 'Empty List',
        listAriaLabel = 'List',
        ...props
      },
      ref,
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'FavoritesCollectionTile');
      const imageRef = useRef<HTMLDivElement>(null);
      const hasListNameAndCount = name && count !== null && count !== undefined;
      const isEmpty = count === 0;
      const isListsView = variant === 'lists';
      const isCreateView = variant === 'create';
      const isFavoritesEmpty = variant === 'favorites' && isEmpty;
      const isListEmpty = hasListNameAndCount && isEmpty && isListsView;

      const renderMediaSection = () => {
        if (isCreateView) {
          return (
            <CreateVariant
              baseClassName={baseClassName}
              iconSize={iconSize}
              createFirstListText={createFirstListText}
              onClick={props.onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
            />
          );
        }

        // For all other variants, wrap in <Component>
        return (
          <Component href={href} className={classnames(`${baseClassName}__media-link`, linkClassName)} tabIndex={0}>
            {isFavoritesEmpty && (
              <EmptyVariant
                baseClassName={baseClassName}
                iconSize={iconSize}
                text={emptyFavoritesText}
                ariaLabel={favoritesAriaLabel}
                dataTestId="favorites"
              />
            )}

            {isListEmpty && (
              <EmptyVariant
                baseClassName={baseClassName}
                iconSize={iconSize}
                text={emptyListsText}
                ariaLabel={emptyListAriaLabel}
                dataTestId="empty-list"
              />
            )}

            {!isEmpty && hasListNameAndCount && (
              <ListImageVariant
                baseClassName={baseClassName}
                imageRef={imageRef}
                listAriaLabel={listAriaLabel}
                name={name}
                imageSrc={imageSrc}
                iconSize={iconSize}
              />
            )}
          </Component>
        );
      };

      return (
        <div {...commonProps} className={classnames(baseClassName, className)} ref={ref} id={id}>
          <div className={`${baseClassName}__content`}>
            <div className={`${baseClassName}__header`}>
              <div className={`${baseClassName}__info`}>
                {hasListNameAndCount && (
                  <Text element="span" className={`${baseClassName}__count`} variant={TextVariants.body3}>
                    {formatlotStr && hasListNameAndCount && formatlotStr(count)}
                  </Text>
                )}
                {name && (
                  <Text element="h3" className={`${baseClassName}__title`} variant={TextVariants.heading5}>
                    {name}
                  </Text>
                )}
              </div>
              {hasListNameAndCount && isListsView && (
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <div
                      className={`${baseClassName}__actions`}
                      data-testid="menu-trigger"
                      tabIndex={0}
                      role="button"
                      aria-label={menuAriaLabel}
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
                          color="$gray-75"
                          className={`${baseClassName}__icon-button`}
                          aria-hidden="true"
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
            </div>
            {renderMediaSection()}
          </div>
        </div>
      );
    },
  ),
);

export default FavoritesCollectionTile;
