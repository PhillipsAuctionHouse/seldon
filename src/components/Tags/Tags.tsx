import React, { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { px } from '../../utils';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import { Text, TextVariants } from '../Text';

export interface I18nObject {
  clearAllLabel?: string;
}

export interface TagsListProps extends ComponentProps<'ul'> {
  /**
   * Unique id for component testing
   */
  id: string;
  /**
   * Base class for TagsList component.
   */
  className?: string;
  /**
   * Child element pass in to display as item content.
   */
  children?: React.ReactNode;
  /**
   * `onRemove` callback provides the tag that is to be removed as a string
   */
  onClear: () => void;
  /**
   * Clear All label is translatable
   */
  clearAllLabel?: string;
}

export interface TagProps {
  /**
   * Unique id for component testing
   */
  id: string;
  /**
   * Base class for TagsList component.
   */
  className?: string;
  /**
   * `onRemove` callback provides the tag that is to be removed as a string
   */
  onRemove: (tag: string) => void;
  /**
   * Tag item label.
   */
  label: string;
  /**
   * Tag button aria-label
   */
  removeText?: string;
}

export const Tag = ({ id, className, onRemove, label, removeText = 'Remove' }: TagProps) => {
  return (
    <Button
      className={classnames(`${px}-tag`, `${px}-button`, className)}
      aria-label={`${removeText} ${label}`}
      onClick={() => onRemove(label)}
      variant={ButtonVariants.tertiary}
    >
      <Text variant={TextVariants.labelSmall}>{label}</Text>
      <div className={`${px}-tag__button`} data-testid={`${id}-item-close-button`}>
        <Icon icon="CloseX" height={8} width={8} color="currentColor" className={`${px}-tag__icon`} />
      </div>
    </Button>
  );
};

/**
 * ## Overview
 *
 * Overview of Tags component
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=11648-3225&node-type=canvas&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-tags--overview)
 */
const TagsList = forwardRef<HTMLUListElement, TagsListProps>(
  ({ className, children, clearAllLabel = 'Clear All', onClear, ...props }, ref) => {
    const type = 'tags-list';
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TagsList');
    const { id } = props;
    return (
      <ul
        className={classnames(`${px}-${type}`, baseClassName, className)}
        {...commonProps}
        {...props}
        tabIndex={0}
        data-testid={`${type}-${id}`}
        ref={ref}
      >
        {Array.isArray(children)
          ? React.Children.map(children, (child) => <li key={child.props.id}>{child}</li>)
          : children}
        {Array.isArray(children) && children.length > 0 && (
          <li>
            <Button
              onClick={onClear}
              data-testid={`${id}-clear-all-button`}
              className={`${px}-${type}--clear`}
              aria-label={clearAllLabel}
              variant={ButtonVariants.tertiary}
            >
              <Icon icon="ArrowLeft" color="currentColor" height={24} width={24} />
              <Text variant={TextVariants.labelSmall}>{clearAllLabel}</Text>
            </Button>
          </li>
        )}
      </ul>
    );
  },
);

TagsList.displayName = 'Tags';

export default TagsList;
