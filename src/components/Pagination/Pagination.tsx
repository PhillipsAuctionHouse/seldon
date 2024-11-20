import React, { ComponentProps } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { px } from '../../utils';

import Select from '../Select/Select';
import ChevronRight from '../../assets/chevronRight.svg?react';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { determineOptionValue, findOptionFromSelectString } from './utils';
import { usePendingState } from '../../utils/hooks';

export type PaginationOptionValue = string | number;

export interface PaginationOption {
  /**
   * label is translatable
   */
  label: string;
  /*
   * Each Pagination Option value must be unique within the Pagination
   */
  value: string | number;
}

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
  options: (PaginationOption | PaginationOptionValue)[];
  /**
   * Boolean to specify whether the `<Pagination>` should be disabled
   */
  isDisabled?: boolean;
  /**
   * Current value of the `<Pagination>` component
   */
  value: PaginationOptionValue;
  /**
   * `onChange` handler that is called whenever the `<Pagination>` value is changed
   */
  onChange: (selectedValue: PaginationOptionValue, event?: React.ChangeEvent<HTMLSelectElement>) => void;
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
  /**
   * Option select aria-label
   */
  selectLabel?: string;
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
  selectLabel = 'Select',
  ...props
}: PaginationProps) => {
  const type = 'pagination';
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Pagination');
  const { id } = props;
  // Necessary unfortunately to have the Select value update in realtime, this is needed for slow page transitions since the lot wouldn't update until the page transition is finished
  const { pendingState, setPendingState } = usePendingState(determineOptionValue(value));

  const valueWithPendingState = pendingState || value;

  const handlePageChange = (
    option: PaginationOption | PaginationOptionValue,
    event?: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPage = determineOptionValue(option);
    setPendingState(newPage);
    onChange(newPage, event);
  };

  return (
    <div
      className={classnames(`${px}-${type}`, { [`${baseClassName}__wrapper`]: baseClassName }, className)}
      {...commonProps}
      {...props}
    >
      <IconButton
        className={classnames(`${px}__pagination-button`, `${px}-left-arrow`)}
        onClick={() => {
          const prevIndex = options.findIndex((option) => determineOptionValue(option) === valueWithPendingState) - 1;
          const prevOption = options.at(prevIndex) || '';
          handlePageChange(prevOption);
        }}
        data-testid={`${id}-previous-button`}
        isDisabled={isDisabled}
        aria-label={previousLabel}
        variant={ButtonVariants.tertiary}
      >
        <ChevronRight />
      </IconButton>

      <Select
        className={variant === 'inline' && `${px}--inline-pagination`}
        aria-label={selectLabel}
        value={valueWithPendingState}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedOption = findOptionFromSelectString(options, event?.currentTarget.value);
          if (selectedOption) {
            handlePageChange(selectedOption, event);
          }
        }}
        data-testid={`${id}-select-button`}
        hideLabel
        disabled={isDisabled}
        showIcon={false}
      >
        {options.map((option) => {
          const optionValue = determineOptionValue(option);
          return (
            <option key={optionValue} value={optionValue}>
              {typeof option === 'string' || typeof option === 'number' ? option : option.label}
            </option>
          );
        })}
      </Select>

      <IconButton
        className={`${px}__pagination-button`}
        onClick={() => {
          const nextIndex =
            (options.findIndex((option) => determineOptionValue(option) === valueWithPendingState) + 1) %
            options.length;
          const nextOption = options[nextIndex];
          handlePageChange(nextOption);
        }}
        data-testid={`${id}-next-button`}
        isDisabled={isDisabled}
        aria-label={nextLabel}
        variant={ButtonVariants.tertiary}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};

export default Pagination;
