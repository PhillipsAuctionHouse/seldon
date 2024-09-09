import * as React from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { px } from '../../utils';

import Select from '../Select/Select';
import Button from '../Button/Button';
import chevronRight from '../../assets/chevronRight.svg';

export interface PaginationProps {
  /**
   * Unique id for component testing
   */
  id: string;
  /**
   * Base class for Pagination component.
   */
  className?: string;
  /**
   * Child element pass in to display as options to select from.
   */
  children?: React.ReactNode;
  /**
   * Boolean to specify whether the `<Pagination>` should be disabled
   */
  isDisabled?: boolean;
  /**
   * Optional text to display when disable is true
   */
  disabledText?: string;
  /**
   * Optional `onClick` handler that is called whenever the `<Pagination>` value is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Optional `onChange` handler that is called whenever the `<Pagination>` value is changed
   */
  onChange?: (selectedValue: string) => void;
  /**
   * Specify the value of the `<Pagination>`
   */
  value?: string | undefined;
  /**
   * The default Inline style to apply to the `<Pagination>` Select component
   */
  variant?: 'inline';
}

/**
 * ## Overview
 *
 * A component for adding a Pagination component.
 *
 * [Figma Link](https://www.figma.com/design/hxqgsE26wM7hII0WaUaDfF/RW---TIMED-Lot-Details-(PDP)?node-id=1-2&node-type=CANVAS&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-pagination--overview)
 */

const Pagination = ({
  className,
  onChange,
  onClick,
  variant = 'inline',
  disabledText = 'Lot',
  children,
  ...props
}: PaginationProps) => {
  const type = 'pagination';
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Pagination');
  const { id, value, isDisabled } = props;
  const [selectedValue, setSelectedValue] = React.useState(value);
  const selectRef = React.useRef<HTMLSelectElement>(null);

  const paginationClick = (e: React.MouseEvent<HTMLElement>) => {
    const buttonType = e.currentTarget.dataset.testid;
    const selectedIndex = selectRef.current?.selectedIndex;
    const firstIndexValue = selectRef.current?.options[0]?.value;
    const lastIndex = selectRef.current?.childElementCount ? selectRef.current?.childElementCount - 1 : 0;
    const lastIndexValue = selectRef.current?.options[lastIndex]?.value;
    if (selectedIndex !== undefined && firstIndexValue && lastIndexValue) {
      const prevValue = selectRef.current?.options[selectedIndex - 1]?.value;
      const nextValue = selectRef.current?.options[selectedIndex + 1]?.value;
      if (buttonType === `${id}-previous-button`)
        prevValue ? setSelectedValue(prevValue) : setSelectedValue(lastIndexValue);
      else if (buttonType === `${id}-next-button`)
        nextValue ? setSelectedValue(nextValue) : setSelectedValue(firstIndexValue);
    }
  };
  const paginationSelect = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setSelectedValue(target.value);
  };

  React.useEffect(() => {
    selectedValue && onChange && onChange(selectedValue);
  }, [onChange, selectedValue]);

  return (
    <div
      className={classnames(`${px}-${type}`, { [`${baseClassName}__wrapper`]: baseClassName }, className)}
      {...commonProps}
      id={props?.id}
      onClick={onClick}
    >
      <Button
        className={classnames(`${px}__pagination-button`, `${px}-left-arrow`)}
        onClick={(e) => paginationClick(e)}
        data-testid={`${id}-previous-button`}
        isDisabled={isDisabled}
        aria-label="Previous"
      >
        <img src={chevronRight} className={`${px}-button-icon`} />
      </Button>

      <Select
        className={variant === 'inline' && `${px}--inline-pagination`}
        value={selectedValue || ''}
        onChange={paginationSelect}
        data-testid={`${id}-select-button`}
        hideLabel
        ref={selectRef}
        disabled={isDisabled}
      >
        {isDisabled || !children ? <option>{disabledText}</option> : children}
      </Select>

      <Button
        className={`${px}__pagination-button`}
        onClick={(e) => paginationClick(e)}
        data-testid={`${id}-next-button`}
        isDisabled={isDisabled}
        aria-label="Next"
      >
        <img src={chevronRight} className={`${px}-button-icon`} />
      </Button>
    </div>
  );
};

export default Pagination;
