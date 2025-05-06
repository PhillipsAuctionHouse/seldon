import { useClickOutside } from '@mantine/hooks';
import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';
import React from 'react';
import { getCommonProps } from '../../utils';
import { Icon } from '../Icon';

export interface ComboBoxProps {
  /**
   * List of options to be displayed in the ComboBox.
   */
  options: {
    label?: string;
    value: string;
  }[];
  /**
   * Unique id for the ComboBox.
   */
  id: string;
  /**
   * Optional className for custom styling.
   */
  className?: string;
  /**
   * Label for the ComboBox.
   */
  labelText: string;
  /**
   * Optional placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Input value for the ComboBox.
   */
  inputValue: string;
  /**
   * Passed in function to handle input value changes.
   */
  setInputValue: (value: string) => void;
  /**
   * aria-label optional input label
   */
  ariaLabelInput?: string;
  /**
   * aria-label for the clear button
   */
  ariaLabelClear?: string;
  /**
   * aria-label for the dropdown button
   */
  ariaLabelDropdown?: string;
  /**
   * aria-label for content
   */
  ariaLabelContent?: string;
}
/**
 * ## Overview
 *
 * This is a ComboBox component that allows users to select from a list of options or enter a custom value.
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-comboBox--overview)
 */
const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(function ComboBox(
  {
    options = [],
    className,
    id,
    labelText,
    placeholder,
    inputValue = '',
    setInputValue,
    ariaLabelDropdown,
    ariaLabelInput,
    ariaLabelClear,
    ariaLabelContent,
    ...props
  },
  ref,
) {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'ComboBox');
  const [isOpen, setIsOpen] = React.useState(false);
  const [control, setControl] = React.useState<HTMLDivElement | null>(null);
  const [dropdown, setDropdown] = React.useState<HTMLDivElement | null>(null);

  const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const sanitizedOptions = options.map((option) => String(option.value).toLowerCase());

  useClickOutside(
    () => {
      if (!sanitizedOptions.some((option) => option === inputValue.toLowerCase())) {
        setIsOpen(false);
        setInputValue('');
      }
    },
    null,
    [control, dropdown],
  );

  return (
    <div ref={ref} className={classnames(baseClassName, className)} id={id} {...commonProps} {...props}>
      <label htmlFor={`${id}-input`} className={`${baseClassName}__label`} data-testid={`${id}-label`}>
        {labelText}
      </label>
      <Command
        loop
        shouldFilter={false}
        onKeyDown={(e) => {
          setTimeout(() => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }, 0);
        }}
        ref={setControl}
      >
        <Popover.Root open={true}>
          <Popover.Trigger asChild>
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={(value) => {
                setInputValue(value);
                setIsOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  setIsOpen(false);
                }
              }}
              onFocus={() => {
                setIsOpen(true);
                setInputValue(inputValue);
              }}
              className={`${baseClassName}__input`}
              tabIndex={0}
              aria-label={ariaLabelInput ? ariaLabelInput : `${id}-input`}
              data-testid={`${id}-input`}
            />
          </Popover.Trigger>
          {inputValue.length > 0 && (
            <button
              className={`${baseClassName}__close-button`}
              data-testid={`${id}-item-close-button`}
              onClick={() => setInputValue('')}
              aria-label={ariaLabelClear ? ariaLabelClear : `${id}-clear`}
              tabIndex={-1}
            >
              <Icon color="$primary-black" icon="CloseX" height={18} width={18} className={`${baseClassName}__icon`} />
            </button>
          )}
          <button
            aria-label={ariaLabelDropdown ? ariaLabelDropdown : `${id}-dropdown`}
            className={`${baseClassName}__dropdown-button`}
            onClick={() => setIsOpen((prev) => !prev)}
            data-testid={`${id}-dropdown`}
            tabIndex={-1}
          >
            <Icon color="$pure-black" height={18} icon="ChevronDown" width={18} className={`${baseClassName}__icon`} />
          </button>
          <Popover.Portal>
            <Popover.Content
              className={`${baseClassName}__content`}
              aria-label={ariaLabelContent ? ariaLabelContent : `${id}-content`}
            >
              {isOpen && (
                <CommandList className={`${baseClassName}__list`} ref={setDropdown}>
                  {sanitizedOptions.some((option) => option.toLowerCase().includes(inputValue.toLowerCase())) ? (
                    <CommandGroup>
                      {sanitizedOptions.map((option, ind) =>
                        option.toLowerCase().includes(inputValue.toLowerCase()) ? (
                          <CommandItem
                            className={`${baseClassName}__item`}
                            key={`${option}-${ind}-key`}
                            value={options[ind]?.label ? `${options[ind]?.label} ${option}` : option}
                            ref={(el) => (itemRefs.current[option] = el)}
                            onSelect={(currentValue) => {
                              setInputValue(currentValue);
                              setIsOpen(false);
                            }}
                          >
                            {options[ind]?.label ? `${options[ind]?.label} ${option}` : option}
                          </CommandItem>
                        ) : null,
                      )}
                    </CommandGroup>
                  ) : (
                    <Command.Empty>No Options.</Command.Empty>
                  )}
                </CommandList>
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </Command>
    </div>
  );
});

ComboBox.displayName = 'ComboBox';

export default ComboBox;
