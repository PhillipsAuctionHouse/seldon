import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface FavoritingTileButtonProps extends ComponentProps<'button'> {
  /**
   * Text for when the object is not in the list and the user wants to add it
   */
  actionAddText?: string;
  /**
   * Text for when the object is in the list and the user wants to remove it
   */
  actionRemoveText?: string;
  /**
   *  If the selected lot is in the list of listTitle, controls border style and action text displayed on tile
   */
  isLotInList: boolean;
  /**
   *  List title shown on tile
   */
  listTitle: string;
  /**
   *  Number of objects in list to display on tile
   */
  numberOfObjects: string;
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=11973-9023&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-favoritingtilebutton--overview)
 */
const FavoritingTileButton = forwardRef<HTMLButtonElement, FavoritingTileButtonProps>(
  (
    {
      className,
      actionAddText = 'Add to',
      actionRemoveText = 'Remove from',
      isLotInList,
      listTitle,
      numberOfObjects,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'FavoritingTileButton');

    return (
      <button
        {...commonProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--lot-in-list`]: isLotInList,
        })}
        onClick={onClick}
        ref={ref}
        id={props?.id}
      >
        <div className={`${baseClassName}__text`}>
          <Text variant={TextVariants.button}>{isLotInList ? actionRemoveText : actionAddText}</Text>
          <Text variant={TextVariants.string2}>{listTitle}</Text>
        </div>
        <Text variant={TextVariants.button}>{numberOfObjects}</Text>
      </button>
    );
  },
);

FavoritingTileButton.displayName = 'FavoritingTileButton';

export default FavoritingTileButton;
