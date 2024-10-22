import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { px } from '../../utils';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import ChevronRight from '../../assets/chevronRight.svg?react';

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
    * List of tags to render
    */
    tagsList: string[]
    /**
    * `onRemove` callback removes the clicked tag from the list
    */
    onRemove: (tag: string) => void;
    /**
    * `onClear` callback removes all the string and set the list to empty
    */
    onClear: () => void;
}

export interface TagsProps {
    /**
    * Base class for TagsList component.
    */
    className?: string;
    /**
    * `onRemove` callback removes the clicked tag from the list
    */
    onRemove: (tag: string) => void;
    /**
    * tag is a string render within tag component
    */
    tag: string;
}

const Tags = ({
    className,
    onRemove,
    tag,
}: TagsProps) => {
    return <Button className={className}>
        <>
            <div>{tag}</div>
            <div onClick={() => onRemove(tag)}>
                <IconButton className={``}>
                    <span>X</span>
                </IconButton>
            </div>
        </>
    </Button>
}

const TagsList = ({
    className,
    onRemove,
    onClear,
    tagsList = [],
    ...props
}: TagsListProps) => {
    const type = 'tagsList';
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TagsList');
    const { id } = props;

    return <div className={classnames(`${px}-${type}`, { [`${baseClassName}__wrapper`]: baseClassName }, className)}
        {...commonProps}
        {...props}
        data-testid={`${id}-tagsList`}
    >
        {tagsList.map((tag) => {
            return <Tags tag={tag} onRemove={onRemove} />
        })}
        <Button onClick={onClear} data-testid={`${id}-onClear-button`}>
            <IconButton className={`${px}-left-arrow`}>
                <ChevronRight />
            </IconButton>
            Clear All
        </Button>
    </div>
}

export default TagsList;
