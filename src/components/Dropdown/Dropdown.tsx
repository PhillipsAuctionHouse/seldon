import React, { useState, ComponentPropsWithoutRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import * as DropdownSelect from '@radix-ui/react-select';
import ChevronDownIcon from '../../assets/chevronDown.svg?react';
import { DropdownItem } from './types';

export interface DropdownProps
  extends Omit<DropdownSelect.SelectProps, 'defaultValue' | 'dir'>,
    ComponentPropsWithoutRef<'div'> {
  /**
   * All options to be listed in the dropdown
   */
  options: DropdownItem[];
  /**
   * Current selected value
   */
  value: DropdownSelect.SelectProps['defaultValue'];
  /**
   * Pass a call back that triggers once a new value is selected
   */
  onValueChange: (value: string) => void;
  /**
   * Aria-label for specific dropdown use, e.g. Select your language
   */
  label: string;
}

/**
 * ## Overview
 *
 * Overview of this component
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10570-6295&t=EnYSS6Hk58EiWaVg-4)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-dropdown--overview)
 */
const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  ({ options, value, onValueChange, label, className, id, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'Dropdown');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={classnames(baseClassName, className)} id={id} {...commonProps} {...props}>
        <DropdownSelect.Root
          value={value}
          onValueChange={(value) => {
            onValueChange(value);
          }}
          onOpenChange={setIsOpen}
        >
          <DropdownSelect.Trigger className={`${baseClassName}__trigger`} aria-label={label} ref={ref}>
            <DropdownSelect.Value placeholder={value} />
            <DropdownSelect.Icon>
              {<ChevronDownIcon className={classnames({ [`${baseClassName}__trigger-icon-expanded`]: isOpen })} />}
            </DropdownSelect.Icon>
          </DropdownSelect.Trigger>
          <DropdownSelect.Portal>
            <DropdownSelect.Content
              className={classnames(`${baseClassName}__content`, `${baseClassName}__content-${id}`)}
              position="popper"
            >
              <DropdownSelect.ScrollUpButton className={`${baseClassName}__scroll-button__up`}>
                <ChevronDownIcon />
              </DropdownSelect.ScrollUpButton>
              <DropdownSelect.Viewport
                className={classnames(`${baseClassName}__viewport`, `${baseClassName}__viewport-${id}`)}
              >
                {options.map((option) => (
                  <DropdownSelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.value === value}
                    className={baseClassName}
                  >
                    {option.label}
                  </DropdownSelectItem>
                ))}
              </DropdownSelect.Viewport>
              <DropdownSelect.ScrollDownButton className={`${baseClassName}__scroll-button`}>
                <ChevronDownIcon />
              </DropdownSelect.ScrollDownButton>
            </DropdownSelect.Content>
          </DropdownSelect.Portal>
        </DropdownSelect.Root>
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';

const DropdownSelectItem = React.forwardRef<HTMLDivElement, DropdownSelect.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <DropdownSelect.Item className={`${className}__item`} {...props} ref={forwardedRef}>
      <DropdownSelect.ItemText>{children}</DropdownSelect.ItemText>
    </DropdownSelect.Item>
  ),
);

DropdownSelectItem.displayName = 'DropdownSelectItem';

export default Dropdown;
