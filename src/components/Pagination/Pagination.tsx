import React, { ComponentProps } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { px } from '../../utils';

import Select from '../Select/Select';
import Button from '../Button/Button';
import ChevronRight from '../../assets/chevronRight.svg?react';

export interface PaginationProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  /**
   * Unique id for component testing
   */
  id: string;
  /**
   * Base class for Pagination component.
   */
  className?: string;
  /**
   * Options Array of string
   */
  options?: string[];
  /**
   * Boolean to specify whether the `<Pagination>` should be disabled
   */
  isDisabled?: boolean;
  /**
   * Current value of the `<Pagination>` component
   */
  value: string | number;
  /**
   * `onChange` handler that is called whenever the `<Pagination>` value is changed
   */
  onChange: (selectedValue: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Specify the variant style of the `<Pagination>`
   */
  variant?: 'inline';
  /**
   * Option previous label
   */
  previousLabel?: string;
  /**
   * Option next label
   */
  nextLabel?: string;
}

/**
 * ## Overview
 *
 * A controlled component that supports selecting a new page and moving next and previous through pages. It expects consumers to keep track of the current value and update it by listening to the `onChange` event.
 *
 * [Figma Link](https://www.figma.com/design/hxqgsE26wM7hII0WaUaDfF/RW---TIMED-Lot-Details-(PDP)?node-id=1-2&node-type=CANVAS&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-pagination--overview)
 */

const Pagination = ({
  className,
  onChange,
  variant = 'inline',
  options = [],
  value,
  isDisabled,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  ...props
}: PaginationProps) => {
  const type = 'pagination';
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Pagination');
  const { id } = props;

  return (
    <div
      className={classnames(`${px}-${type}`, { [`${baseClassName}__wrapper`]: baseClassName }, className)}
      {...commonProps}
      {...props}
    >
      <Button
        className={classnames(`${px}__pagination-button`, `${px}-left-arrow`)}
        onClick={() => onChange(options.at(options.findIndex((option) => option === value) - 1) || '')}
        data-testid={`${id}-previous-button`}
        isDisabled={isDisabled}
        aria-label={previousLabel}
      >
        <ChevronRight />
      </Button>

      <Select
        className={variant === 'inline' && `${px}--inline-pagination`}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event?.currentTarget.value, event)}
        data-testid={`${id}-select-button`}
        hideLabel
        disabled={isDisabled}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>

      <Button
        className={`${px}__pagination-button`}
        onClick={() => onChange(options[(options.findIndex((option) => option === value) + 1) % options.length] || '')}
        data-testid={`${id}-next-button`}
        isDisabled={isDisabled}
        aria-label={nextLabel}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
