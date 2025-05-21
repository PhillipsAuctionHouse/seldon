import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';
import React, { useEffect } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import * as iconComponents from '../../assets/formatted';
import { getCommonProps } from '../../utils';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';

export interface ComboBoxOption {
  /**
   * The label or display text
   */
  label?: string;
  /**
   * The option value (used for selection)
   */
  value: string;
  /**
   * Display value shown in input when selected (defaults to label)
   */
  displayValue?: string;
  /**
   * Additional terms for filtering
   */
  filterTerms?: string[];
}

export interface ComboBoxProps {
  /**
   * Boolean to specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;
  /**
   * List of options to be displayed in the ComboBox.
   */
  options: ComboBoxOption[];
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
   * Current selected value (e.g., 'US')
   */
  value?: string;
  /**
   * Function called when selected value changes
   */
  onChange?: (value: string, option: ComboBoxOption | null) => void;
  /**
   * Current input value shown in the input field
   */
  inputValue: string;
  /**
   * Function to update the input value
   */
  setInputValue: (value: string) => void;
  /**
   * Function to get display text for an option
   * Similar to MUI's getOptionLabel
   */
  getOptionLabel?: (option: ComboBoxOption) => string;
  /**
   * Function to render custom option content
   * Similar to MUI's renderOption
   */
  renderOption?: (option: ComboBoxOption) => React.ReactNode;
  /**
   * Allow free text input that doesn't match any option
   * Similar to MUI's allowCustomValue
   * @default false
   */
  allowCustomValue?: boolean;
  /**
   * Sets the invalid state of the input
   * @default false
   */
  invalid?: boolean;
  /**
   * Text to display when input is invalid
   */
  invalidText?: string;
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
   * @default true
   */
  autoClearInput?: boolean;
  /**
   * popoverContainer ref for the ComboBox
   */
  popoverContainerRef?: React.RefObject<HTMLElement>;
  /**
   * No options message translation
   * @default "No Options."
   */
  noOptionsMessage?: string;
}

/**
 * ## Overview
 *
 * This is a ComboBox component that allows users to select from a list of options or enter a custom value.
 *
 * [Figma Link](https://www.figma.com/design/rIefa3bRPyZbZmtyV9PSQv/My-Account?node-id=1-3&p=f&m=dev)
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
    value,
    onChange,
    inputValue = '',
    setInputValue,
    getOptionLabel = (option) => option.label || option.value,
    renderOption,
    allowCustomValue = false,
    ariaLabelDropdown,
    ariaLabelInput,
    ariaLabelClear,
    ariaLabelContent,
    hideLabel = false,
    autoClearInput = true,
    popoverContainerRef,
    noOptionsMessage = 'No Options.',
    invalid = false,
    invalidText,
    ...props
  },
  ref,
) {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'ComboBox');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<ComboBoxOption | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const DropdownIcon = iconComponents['ChevronDown'];
  const CloseIcon = iconComponents['CloseX'];
  const containerRef = React.useRef<HTMLDivElement>(null);
  const justSelectedRef = React.useRef(false);

  // Initialize selected option from props
  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value);
      if (option) {
        setSelectedOption(option);
      } else if (allowCustomValue) {
        setSelectedOption(null);
      }
    } else {
      setSelectedOption(null);
    }
  }, [value, options, allowCustomValue]);

  // Filtering with support for filterTerms and getOptionLabel
  const filteredOptions = React.useMemo(() => {
    if (!inputValue) {
      return options;
    }

    const searchTerm = inputValue.toLowerCase().trim();

    return options.filter((option) => {
      // Check label using getOptionLabel
      const labelMatch = getOptionLabel(option).toLowerCase().includes(searchTerm);

      // Check value
      const valueMatch = option.value.toLowerCase().includes(searchTerm);

      // Check displayValue if available
      const displayValueMatch = option.displayValue?.toLowerCase().includes(searchTerm) || false;

      // Check filterTerms if available
      let filterTermsMatch = false;
      if (option.filterTerms && option.filterTerms.length > 0) {
        filterTermsMatch = option.filterTerms.some((term) => term.toLowerCase().includes(searchTerm));
      }

      return labelMatch || valueMatch || displayValueMatch || filterTermsMatch;
    });
  }, [options, inputValue, getOptionLabel]);

  // Handle option selection
  const handleOptionSelect = (option: ComboBoxOption) => {
    // Move these updates before closing the dropdown
    setSelectedOption(option);

    const displayText = option.displayValue || getOptionLabel(option);
    setInputValue(displayText);

    if (onChange) {
      onChange(option.value, option);
    }

    // Close dropdown last
    setIsOpen(false);

    // Focus input after selection
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setSelectedOption(null);
    setInputValue('');
    if (onChange) {
      onChange('', null);
    }
    inputRef.current?.focus();
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    inputRef.current?.focus();
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    // Open dropdown if we have options
    if (filteredOptions.length > 0) {
      setIsOpen(true);
    }

    // Handle selection clearing if input doesn't match selected option
    if (selectedOption) {
      const displayText = selectedOption.displayValue || getOptionLabel(selectedOption);
      if (displayText !== value) {
        setSelectedOption(null);

        // In allowCustomValue mode, update value as user types
        if (allowCustomValue && onChange) {
          onChange(value, null);
        }
      }
    } else if (allowCustomValue && onChange) {
      onChange(value, null);
    }
  };

  // Handle clicks outside the component
  useOnClickOutside(containerRef, (event) => {
    // Don't handle clicks on dropdown items or the input itself
    if (
      (event.target as HTMLElement).closest(`.${baseClassName}__item`) ||
      (event.target as HTMLElement).closest(`.${baseClassName}__content`) ||
      inputRef.current?.contains(event.target as Node) ||
      event.target === inputRef.current
    ) {
      return;
    }

    // Check if input value matches any option
    const matchedOption = options.find((option) => {
      const optionLabel = getOptionLabel(option).toLowerCase();
      const optionValue = option.value.toLowerCase();
      const optionDisplay = option.displayValue?.toLowerCase();
      const inputLower = inputValue.toLowerCase();

      return optionLabel === inputLower || optionValue === inputLower || optionDisplay === inputLower;
    });

    if (matchedOption) {
      // If match found, select it
      handleOptionSelect(matchedOption);
    } else if (!allowCustomValue) {
      // In non-allowCustomValue mode, restore previous selection
      if (selectedOption) {
        const displayText = selectedOption.displayValue || getOptionLabel(selectedOption);
        setInputValue(displayText);
      } else if (autoClearInput) {
        setInputValue('');
      }
    } else if (allowCustomValue && onChange) {
      // In allowCustomValue mode, keep current input
      onChange(inputValue, null);
    }

    // Close dropdown
    setIsOpen(false);
  });

  return (
    <div ref={ref} className={classnames(baseClassName, className)} id={id} {...commonProps} {...props}>
      <div ref={containerRef}>
        <label
          htmlFor={`${id}-input`}
          className={classnames(`${baseClassName}__label`, {
            [`${baseClassName}__label--hidden`]: hideLabel,
            [`${baseClassName}__label--invalid`]: invalid,
          })}
          data-testid={`${id}-label`}
        >
          {labelText}
        </label>

        <Command shouldFilter={false} loop={true} className={`${baseClassName}__command-wrapper`}>
          <Popover.Root
            open={isOpen}
            modal={false}
            onOpenChange={(open) => {
              if (!open) {
                setIsOpen(false);
              } else if (filteredOptions.length > 0) {
                setIsOpen(true);
              }
            }}
          >
            <Popover.Trigger asChild>
              <div
                className={classnames(`${baseClassName}__input-wrapper`, {
                  [`${baseClassName}__input-wrapper--invalid`]: invalid,
                })}
              >
                <CommandInput
                  ref={inputRef}
                  id={`${id}-input`}
                  placeholder={placeholder}
                  value={inputValue}
                  onValueChange={handleInputChange}
                  onFocus={() => {
                    if (filteredOptions.length > 0 && !justSelectedRef.current) {
                      setIsOpen(true);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (filteredOptions.length > 0 && !justSelectedRef.current) {
                      setIsOpen(true);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                      setIsOpen(false);
                    } else if (e.key === 'Enter' && !isOpen) {
                      // Only handle Enter when dropdown is closed
                      if (allowCustomValue) {
                        if (onChange) {
                          onChange(inputValue, null);
                        }
                      } else if (filteredOptions.length === 1) {
                        handleOptionSelect(filteredOptions[0]);
                      } else if (filteredOptions.length > 0) {
                        // Open dropdown if we have options
                        setIsOpen(true);
                        e.preventDefault();
                      }
                    } else if (e.key === 'Escape') {
                      setIsOpen(false);
                      e.preventDefault();
                    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isOpen) {
                      if (filteredOptions.length > 0) {
                        setIsOpen(true);
                        e.preventDefault();
                      }
                    }
                  }}
                  className={classnames(`${baseClassName}__input`, {
                    [`${baseClassName}__input--invalid`]: invalid,
                  })}
                  aria-label={ariaLabelInput ? ariaLabelInput : `${id}-input`}
                  data-testid={`${id}-input`}
                />

                {/* Clear button */}
                {inputValue && (
                  <IconButton
                    className={`${baseClassName}__close-button`}
                    data-testid={`${id}-clear-button`}
                    onClick={handleClear}
                    aria-label={ariaLabelClear ? ariaLabelClear : `${id}-clear`}
                    tabIndex={-1}
                    variant={ButtonVariants.tertiary}
                  >
                    <CloseIcon
                      color="currentColor"
                      height={18}
                      width={18}
                      className={`${baseClassName}__icon-button`}
                      title={ariaLabelClear ? ariaLabelClear : `${id}-clear`}
                    />
                  </IconButton>
                )}

                {/* Dropdown toggle button */}
                <IconButton
                  aria-label={ariaLabelDropdown ? ariaLabelDropdown : `${id}-dropdown`}
                  className={classnames(`${baseClassName}__dropdown-button`, {
                    [`${baseClassName}__dropdown-button--open`]: isOpen,
                  })}
                  onClick={handleToggleDropdown}
                  data-testid={`${id}-dropdown`}
                  tabIndex={-1}
                  variant={ButtonVariants.tertiary}
                >
                  <DropdownIcon
                    color="currentColor"
                    height={18}
                    width={18}
                    className={`${baseClassName}__icon-button`}
                    title={ariaLabelDropdown ? ariaLabelDropdown : `${id}-dropdown`}
                  />
                </IconButton>
              </div>
            </Popover.Trigger>

            {/* The dropdown content */}
            {isOpen && (
              <Popover.Portal container={popoverContainerRef?.current || document.body}>
                <Popover.Content
                  className={`${baseClassName}__content`}
                  aria-label={ariaLabelContent ? ariaLabelContent : `${id}-content`}
                  side="bottom"
                  sideOffset={-5}
                  align="start"
                  alignOffset={0}
                  style={{
                    width: containerRef.current?.offsetWidth || '100%',
                  }}
                >
                  <CommandList className={`${baseClassName}__list`}>
                    {filteredOptions.length > 0 ? (
                      <CommandGroup className={`${baseClassName}__group`}>
                        {filteredOptions.map((option) => (
                          <CommandItem
                            className={classnames(`${baseClassName}__item`, {
                              [`${baseClassName}__item--selected`]: selectedOption?.value === option.value,
                            })}
                            key={option.value}
                            value={option.value}
                            onSelect={() => {
                              // Set the ref flag before doing anything else
                              justSelectedRef.current = true;

                              // Handle selection
                              const selectedOpt = option;
                              setSelectedOption(selectedOpt);
                              setInputValue(selectedOpt.displayValue || getOptionLabel(selectedOpt));

                              if (onChange) {
                                onChange(selectedOpt.value, selectedOpt);
                              }

                              // Close dropdown
                              setIsOpen(false);

                              // Focus input but reset flag after DOM updates
                              requestAnimationFrame(() => {
                                inputRef.current?.focus();
                                // Clear the flag after the current execution completes
                                justSelectedRef.current = false;
                              });
                            }}
                          >
                            {renderOption ? renderOption(option) : getOptionLabel(option)}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ) : (
                      <div className={`${baseClassName}__no-options`}>{noOptionsMessage}</div>
                    )}
                  </CommandList>
                </Popover.Content>
              </Popover.Portal>
            )}
          </Popover.Root>
        </Command>

        {/* Invalid message */}
        {invalid && invalidText && (
          <div className={`${baseClassName}__invalid-text`} data-testid={`${id}-invalid-text`}>
            {invalidText}
          </div>
        )}
      </div>
    </div>
  );
});

ComboBox.displayName = 'ComboBox';

export default ComboBox;
