import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { px } from '../../utils';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import ChevronRight from '../../assets/chevronRight.svg?react';
import { ButtonVariants } from '../Button/types';

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
   * Individual Tag class
   */
  tagClassName?: string;
  /**
   * List of tags to render
   */
  tagsList: string[];
  /**
   * `onRemove` callback removes the clicked tag from the list
   */
  onRemove: (tag: string) => void;
  /**
   * `onRemove` callback provides the tag that is to be removed as a string
   */
  onClear: () => void;
}

export interface TagsProps {
  /**
   * Unique id for component testing
   */
  id: string;
  /**
   * Unique index for component testing
   */
  index: number;
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

const Tags = ({ id, index, className, onRemove, label }: TagsProps) => {
  return (
    <div className={classnames(`${px}-tag`, `${px}-button`, className)} aria-label="Close Tag">
      <>
        <div className={`${px}-tag-label`}>{label}</div>
        <div
          onClick={() => onRemove(label)}
          className={`${px}-close-button`}
          data-testid={`${id}-item-${index}-close-button`}
        >
          <IconButton className={`${px}-tag-x`}>
            <span>X</span>
          </IconButton>
        </div>
      </>
    </div>
  );
};

const TagsList = ({ className, tagClassName, onRemove, onClear, tagsList = [], ...props }: TagsListProps) => {
  const type = 'tags-list';
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TagsList');
  const { id } = props;

  return (
    <div
      className={classnames(`${px}-${type}`, baseClassName, className)}
      {...commonProps}
      {...props}
      data-testid={`${type}-${id}`}
    >
      {tagsList.map((tag, index) => {
        return (
          <Tags label={tag} onRemove={onRemove} key={`${tag}-key`} className={tagClassName} id={id} index={index} />
        );
      })}
      {tagsList.length > 0 && (
        <Button
          onClick={onClear}
          data-testid={`${id}-clear-all-button`}
          className={`${px}-${type}-clear-all-button`}
          aria-label="Clear All"
          variant={ButtonVariants.tertiary}
        >
          <div className={`${px}-left-arrow`}>
            <ChevronRight />
          </div>
          <div className={`${px}-label`}>Clear All</div>
        </Button>
      )}
    </div>
  );
};

export default TagsList;
