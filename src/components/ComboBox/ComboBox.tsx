import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import * as iconComponents from '../../assets/formatted';
import { getCommonProps } from '../../utils';
import { getScssVar } from '../../utils/scssUtils';

export interface ComboBoxProps {
  /**
   * Boolean to specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;
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
  /**
   * If true, the input will be cleared when the user clicks away when the input value is not in the options list.
   */
  autoClearInput?: boolean;
  /**
   * popoverContainer ref for the ComboBox
   */
  popoverContainerRef?: React.RefObject<HTMLElement>;
  /**
   * No options message translation
   */
  noOptionsMessage?: string;
}
/**
 * ## Overview
 *
 * This is a ComboBox component that allows users to select from a list of options or enter a custom value.
 *
 * [Figma Link] https://www.figma.com/design/rIefa3bRPyZbZmtyV9PSQv/My-Account?node-id=1-3&p=f&m=dev
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
    hideLabel = false,
    autoClearInput = true,
    popoverContainerRef,
    noOptionsMessage = 'No Options.',
    ...props
  },
  ref,
) {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'ComboBox');
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const DropdownIcon = iconComponents['ChevronDown'];
  const CloseIcon = iconComponents['CloseX'];
  const containerRef = React.useRef<HTMLDivElement>(null);

  const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const filteredOptions = options.filter(
    (option) =>
      option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
      (option.label && option.label.toLowerCase().includes(inputValue.toLowerCase())),
  );

  useOnClickOutside(containerRef, (event) => {
    if (
      (event.target as HTMLElement).closest(`.${baseClassName}__item`) ||
      (event.target as HTMLElement).closest(`.${baseClassName}__content`)
    ) {
      return;
    }

    const isInputValueInOptions = filteredOptions.some(
      (option) => option.value.toLowerCase() === inputValue.toLowerCase(),
    );

    if (!isInputValueInOptions && autoClearInput) {
      setInputValue('');
    }

    setIsOpen(false);
    event.stopPropagation();
  });

  return (
    <div ref={ref} className={classnames(baseClassName, className)} id={id} {...commonProps} {...props}>
      <div ref={containerRef}>
        <label
          htmlFor={`${id}-input`}
          className={classnames(`${baseClassName}__label`, {
            [`${baseClassName}__label--hidden`]: hideLabel,
          })}
          data-testid={`${id}-label`}
        >
          {labelText}
        </label>
        <Command
          loop
          onKeyDown={(e) => {
            setTimeout(() => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }, 0);
          }}
        >
          <Popover.Root open={true}>
            <div className={`${baseClassName}__input-wrapper`}>
              <Popover.Trigger asChild>
                <CommandInput
                  ref={inputRef}
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
                    setIsOpen((prev) => !prev);
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
                  <div className={`${baseClassName}__icon`}>
                    <CloseIcon
                      color={getScssVar('', '$primary-black')}
                      height={18}
                      width={18}
                      className={`${baseClassName}__icon-button`}
                    />
                  </div>
                </button>
              )}
              <button
                aria-label={ariaLabelDropdown ? ariaLabelDropdown : `${id}-dropdown`}
                className={`${baseClassName}__dropdown-button`}
                onClick={() => inputRef.current?.focus()}
                data-testid={`${id}-dropdown`}
                tabIndex={-1}
              >
                <div
                  className={classnames(`${baseClassName}__icon`, {
                    [`${baseClassName}__icon--flipped`]: isOpen,
                  })}
                >
                  <DropdownIcon
                    color={getScssVar('', '$pure-black')}
                    height={18}
                    width={18}
                    className={`${baseClassName}__icon-button`}
                  />
                </div>
              </button>
            </div>
            <Popover.Portal container={popoverContainerRef ? popoverContainerRef.current : null}>
              <Popover.Content
                className={`${baseClassName}__content`}
                aria-label={ariaLabelContent ? ariaLabelContent : `${id}-content`}
              >
                {isOpen && (
                  <CommandList className={`${baseClassName}__list`}>
                    {filteredOptions.some(
                      (option) =>
                        option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
                        (option.label && option.label.toLowerCase().includes(inputValue.toLowerCase())),
                    ) ? (
                      <CommandGroup>
                        {filteredOptions.map(
                          (option, ind) =>
                            (option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
                              (option.label && option.label.toLowerCase().includes(inputValue.toLowerCase()))) && (
                              <CommandItem
                                className={`${baseClassName}__item`}
                                key={`${option.value}-${ind}`}
                                value={option.label ? `${option.label} ${option.value}` : option.value}
                                ref={(el) => (itemRefs.current[option.value] = el)}
                                onSelect={(currentValue) => {
                                  setInputValue(currentValue);
                                  setIsOpen(false);
                                }}
                              >
                                {option.label ? `${option.label} ${option.value}` : option.value}
                              </CommandItem>
                            ),
                        )}
                      </CommandGroup>
                    ) : (
                      <Command.Empty>{noOptionsMessage}</Command.Empty>
                    )}
                  </CommandList>
                )}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </Command>
      </div>
    </div>
  );
});

ComboBox.displayName = 'ComboBox';

export default ComboBox;
