import { ComponentProps, Dispatch, SetStateAction, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';

export interface FilterHeaderProps extends ComponentProps<'div'> {
  // Text to display as the header
  heading: string;

  // Whether the show all back button should be displayed (when viewing all filters)
  isViewingAll?: boolean;

  // Setter function for name of Filter to be displayed in View All
  setViewAllFilter?: Dispatch<SetStateAction<null>>;

  // Setter to apply closing transition to view all filter
  setIsClosing?: Dispatch<SetStateAction<boolean>>;
}
/**
 * ## Overview
 *
 * The header of a filter
 */
const FilterHeader = forwardRef<HTMLDivElement, FilterHeaderProps>(
  ({ className, heading, isViewingAll = false, setViewAllFilter, setIsClosing, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'FilterHeader');

    const handleClose = () => {
      setIsClosing?.(true);
      setTimeout(() => {
        setViewAllFilter?.(null);
        setIsClosing?.(false);
        // if this timeout changes, be sure to change $default-transition-duration in _filter.scss
      }, 300);
    };

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Text
          variant={TextVariants.heading4}
          className={`${baseClassName}__heading`}
          element={(props) => <legend {...props}>{heading}</legend>}
        />
        {isViewingAll ? (
          <Button variant={ButtonVariants.tertiary} onClick={handleClose} className={`${baseClassName}__back`}>
            <Icon icon="ChevronNext" className={`${baseClassName}__chevron`} />
            Back to all
          </Button>
        ) : null}
      </div>
    );
  },
);

FilterHeader.displayName = 'FilterHeader';

export default FilterHeader;
