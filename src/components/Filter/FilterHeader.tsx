import { ComponentProps, Dispatch, SetStateAction, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import ChevronNextIcon from '../../assets/chevronNext.svg?react';

export interface FilterHeaderProps extends ComponentProps<'div'> {
  // Text to display as the header
  label: string;

  // Whether the show all back button should be displayed (when viewing all filters)
  showBack?: boolean;

  // Setter function for info to be displayed in View All
  setViewAllFilter?: Dispatch<SetStateAction<[]>>;
}
/**
 * ## Overview
 *
 * The header of a filter
 */
const FilterHeader = forwardRef<HTMLDivElement, FilterHeaderProps>(
  ({ className, label, showBack = false, setViewAllFilter, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'FilterHeader');

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Text variant={TextVariants.heading4} className={`${baseClassName}__label`}>
          {label}
        </Text>
        {showBack ? (
          <Button
            variant={ButtonVariants.tertiary}
            onClick={() => {
              setViewAllFilter && setViewAllFilter([]);
            }}
          >
            <ChevronNextIcon className={`${baseClassName}__chevron`} />
            {`Back to all`}
          </Button>
        ) : null}
      </div>
    );
  },
);

FilterHeader.displayName = 'FilterHeader';

export default FilterHeader;
