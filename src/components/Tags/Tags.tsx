import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { px } from '../../utils';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import ChevronRight from '../../assets/chevronRight.svg?react';
import { ButtonVariants } from '../Button/types';
import CloseIcon from '../../assets/close.svg?react';

export interface I18nObject {
  clearAllLabel?: string;
}

export interface TagsListProps {
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
   * Individual Tag class
   */
  tagClassName?: string;
  /**
   * `onRemove` callback provides the tag that is to be removed as a string
   */
  onClear: () => void;
  /**
   * Clear All label is translatable
   */
  i18n?: I18nObject;
}

export interface TagsProps {
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
}

export const Tags = ({ id, className, onRemove, label }: TagsProps) => {
  return (
    <div className={classnames(`${px}-tag`, `${px}-button`, className)} aria-label="Close Tag">
      <div className={`${px}-tag__label`}>{label}</div>
      <div onClick={() => onRemove(label)} className={`${px}-close-button`} data-testid={`${id}-item-close-button`}>
        <IconButton className={`${px}-close-button__close`}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

const TagsList = ({
  className,
  children,
  tagClassName,
  i18n = { clearAllLabel: 'Clear All' },
  onClear,
  ...props
}: TagsListProps) => {
  const type = 'tags-list';
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TagsList');
  const { id } = props;
  const { clearAllLabel } = i18n;

  return (
    <div
      className={classnames(`${px}-${type}`, baseClassName, className)}
      {...commonProps}
      {...props}
      data-testid={`${type}-${id}`}
    >
      {children}
      {Array.isArray(children) && children.length > 0 && (
        <Button
          onClick={onClear}
          data-testid={`${id}-clear-all-button`}
          className={`${px}-${type}--clear`}
          aria-label={clearAllLabel}
          variant={ButtonVariants.tertiary}
        >
          <div className={`${px}-left-arrow`}>
            <ChevronRight />
          </div>
          <div className={`${px}-label`}>{clearAllLabel}</div>
        </Button>
      )}
    </div>
  );
};

export default TagsList;
