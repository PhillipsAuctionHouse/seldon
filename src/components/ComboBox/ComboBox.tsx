import * as Popover from '@radix-ui/react-popover';
import classnames from 'classnames';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import * as iconComponents from '../../assets/formatted';
import { getCommonProps, useNormalizedInputProps } from '../../utils';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { ComboBoxOption } from './types';

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
   * Name attribute for form submission
   */
  name?: string;
  /**
   * Value for the selected option for controlled usage.
   */
  value?: string;
  /**
   * Handler for value changes for controlled usage
   */
  onChange?: (value: string, option: ComboBoxOption | null) => void;
  getOptionLabel?: (option: ComboBoxOption) => string;
  /**
   * Function to render custom option content
   * Similar to MUI's renderOption
   */
  renderOption?: (option: ComboBoxOption) => React.ReactNode;
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

  /**
   * Handler called when the combobox loses focus
   */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * When true, preserve the explicitly selected option value
   * even when the display value matches multiple options
   * @default false
   */
  preserveExplicitSelection?: boolean;
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
    name,
    value: externalValue,
    onChange,
    onBlur,
    getOptionLabel = (option) => option.label || option.value,
    renderOption,
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
    preserveExplicitSelection = true,
    ...props
  },
  ref,
) {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'ComboBox');
  const DropdownIcon = iconComponents['ChevronDown'];
  const CloseIcon = iconComponents['CloseX'];
  const inputProps = useNormalizedInputProps({
    id,
    invalid,
    invalidText,
    type: 'text',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  /**
   * to support setting an input display value that's different from the label from a selected option
   */
  const [inputValue, setInputValue] = useState(() => {
    if (externalValue !== undefined) {
      const option = options.find((opt) => opt.value === externalValue);
      return option ? option.displayValue || getOptionLabel(option) : '';
    }
    return ''; // default to empty if uncontrolled
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const justSelectedRef = useRef(false);
  const selectedOptionRef = useRef<HTMLDivElement>(null);

  const memoizedGetOptionLabel = useCallback((option: ComboBoxOption) => getOptionLabel(option), [getOptionLabel]);

  // Determine if component is controlled
  const isValueControlled = externalValue !== undefined;

  // Use either controlled or uncontrolled values
  const value = isValueControlled ? externalValue : internalValue;

  // Find the selected option based on value
  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) || null;
  }, [options, value]);

  // Filtering with support for filterTerms and getOptionLabel
  const filteredOptions = useMemo(() => {
    if (!inputValue) {
      return options;
    }

    const searchTerm = inputValue.toLowerCase().trim();

    return options.filter((option) => {
      const labelMatch = memoizedGetOptionLabel(option).toLowerCase().includes(searchTerm);

      const valueMatch = option.value.toLowerCase().includes(searchTerm);

      const displayValueMatch = option.displayValue?.toLowerCase().includes(searchTerm) || false;

      let filterTermsMatch = false;
      if (option.filterTerms && option.filterTerms.length > 0) {
        filterTermsMatch = option.filterTerms.some((term) => term.toLowerCase().includes(searchTerm));
      }

      return labelMatch || valueMatch || displayValueMatch || filterTermsMatch;
    });
  }, [options, inputValue, memoizedGetOptionLabel]);

  // Handle option selection
  const handleOptionSelect = (option: ComboBoxOption) => {
    // Update internal state if uncontrolled
    if (!isValueControlled) {
      setInternalValue(option.value);
    }

    // Update input display value
    const displayText = option.displayValue || memoizedGetOptionLabel(option);
    setInputValue(displayText);

    // Call external onChange
    if (onChange) {
      onChange(option.value, option);
    }

    // Close dropdown
    handleOpen(false);

    // Focus input after selection
    justSelectedRef.current = true;
    requestAnimationFrame(() => {
      justSelectedRef.current = false;
    });
  };

  // Handle clearing the input
  const handleClear = (e) => {
    handleOpen(false);
    // don't reopen the dropdown when cleared
    justSelectedRef.current = true;
    // stop the popover trigger from reopening dropdown
    e.preventDefault();
    e.stopPropagation();

    // Call onChange with empty values
    if (onChange && isValueControlled) {
      onChange('', null);
    }
    setInputValue('');
    // Focus the container
    inputRef.current?.focus();
    requestAnimationFrame(() => {
      justSelectedRef.current = false;
    });
  };

  // Handle toggling the dropdown
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    inputRef.current?.focus();
  };

  const handleInputChange = (newValue: string) => {
    // Always update display value
    setInputValue(newValue);

    // Open dropdown when we have matching options
    if (newValue !== '' && filteredOptions.length > 0) {
      handleOpen(true);
    }
  };

  // Handle blur event
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    // If we're in the middle of a selection, don't trigger blur
    if (justSelectedRef.current) {
      return;
    }

    // Call the provided onBlur handler
    if (onBlur) {
      onBlur(event);
    }
  };

  const inputDisplayValue = useMemo(() => {
    /** calculate initial input value if the externalValue or options wasn't set when the setState was called */
    if (isValueControlled && !selectedOption) {
      const option = options.find((opt) => opt.value === externalValue);
      if (!option) {
        return inputValue; // no match found, bogus external value
      }
      return option.displayValue ?? memoizedGetOptionLabel(option);
    }
    return inputValue;
  }, [inputValue, isValueControlled, selectedOption, options, memoizedGetOptionLabel, externalValue]);

  const handleOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (isOpen && selectedOption && filteredOptions.length > 5) {
      /**
       * Wait for dropdown to render before scrolling
       * to ensure the selected option is visible
       */
      requestAnimationFrame(() => {
        if (selectedOptionRef.current) {
          selectedOptionRef.current.scrollIntoView({
            block: 'nearest',
            behavior: 'auto',
          });
        }
      });
    }
  };

  // Handle clicks outside the component
  useOnClickOutside(containerRef, (event) => {
    // Don't handle clicks on dropdown items or the input itself
    if (
      (event.target as HTMLElement).closest(`.${baseClassName}__item`) ||
      (event.target as HTMLElement).closest(`.${baseClassName}__content`) ||
      containerRef.current?.contains(event.target as Node) ||
      event.target === containerRef.current
    ) {
      return;
    }

    // Check if input value matches any option
    const matchedOption = options.find((option) => {
      const optionLabel = memoizedGetOptionLabel(option).toLowerCase();
      const optionValue = option.value.toLowerCase();
      const optionDisplay = option.displayValue?.toLowerCase();
      const inputLower = inputValue.toLowerCase();

      return optionLabel === inputLower || optionValue === inputLower || optionDisplay === inputLower;
    });

    // If preserving explicit selections and we have a selected option
    if (preserveExplicitSelection && selectedOption) {
      const displayText = selectedOption.displayValue || memoizedGetOptionLabel(selectedOption);

      // If the input value matches our selected option's display value,
      // just restore the display value and don't change the selection
      if (displayText.toLowerCase() === inputValue.toLowerCase()) {
        setInputValue(displayText);
        handleOpen(false);
        return;
      }
    }

    if (matchedOption) {
      // If match found, select it
      handleOptionSelect(matchedOption);
    } else {
      // Always allow custom input values, regardless of selection state
      if (selectedOption && autoClearInput) {
        const displayText = selectedOption.displayValue || memoizedGetOptionLabel(selectedOption);
        setInputValue(displayText);
      } else if (autoClearInput && !inputValue.trim()) {
        setInputValue('');
      } else if (onChange) {
        // Always keep custom values
        onChange(inputValue, null);
      }
    }

    // Close dropdown
    handleOpen(false);
  });

  return (
    <div ref={ref} className={classnames(baseClassName, className)} id={id} {...commonProps} {...props}>
      {/* Hidden input for form integration */}
      {name && (
        <input
          type="hidden"
          name={name}
          id={name}
          value={value || ''}
          ref={(el) => {
            // If ref is a callback ref, forward it to the hidden input
            if (typeof ref === 'function' && el) {
              ref(el);
            }
          }}
        />
      )}
      <div ref={containerRef} onBlur={handleBlur} className={`${baseClassName}__wrapper`}>
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

        <Command
          loop
          onKeyDown={(e) => {
            setTimeout(() => {
              if (e.key === 'Escape') {
                handleOpen(false);
              }
            }, 0);
          }}
          shouldFilter={false}
          className={`${baseClassName}__command-wrapper`}
        >
          <Popover.Root open={isOpen} modal={false}>
            <Popover.Trigger asChild>
              <div
                className={classnames(`${baseClassName}__input-wrapper`, {
                  [`${baseClassName}__input-wrapper--invalid`]: invalid,
                })}
              >
                {/** this input doesn't get used by the form it's just for display **/}
                <CommandInput
                  id={`${id}-input`}
                  placeholder={placeholder}
                  value={inputDisplayValue}
                  onValueChange={handleInputChange}
                  tabIndex={0}
                  onFocus={() => {
                    if (filteredOptions.length > 0 && !justSelectedRef.current && !isOpen) {
                      handleOpen(true);
                    }
                  }}
                  onClick={(e) => {
                    e.preventDefault();

                    // Focus the input to allow typing
                    e.currentTarget.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                      handleOpen(false);
                    } else if (e.key === 'Enter' && !isOpen) {
                      // Only handle Enter when dropdown is closed
                      // Always allow submitting the current input value
                      if (onChange) {
                        onChange(inputValue, null);
                      }
                      // If exactly one match, select it
                      if (filteredOptions.length === 1) {
                        handleOptionSelect(filteredOptions[0]);
                      } else if (filteredOptions.length > 0) {
                        // Open dropdown if we have options
                        handleOpen(true);
                        e.preventDefault();
                      }
                    } else if (e.key === 'Escape') {
                      handleOpen(false);
                      e.preventDefault();
                    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isOpen) {
                      if (filteredOptions.length > 0) {
                        handleOpen(true);
                        e.preventDefault();
                      }
                    }
                  }}
                  className={classnames(`${baseClassName}__input`, {
                    [`${baseClassName}__input--invalid`]: invalid,
                  })}
                  aria-label={ariaLabelInput ? ariaLabelInput : `${id}-input`}
                  data-testid={`${id}-input`}
                  ref={inputRef}
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
                  onFocus={() => {
                    // Popover keeps trying to steal focus when it opens from our input so this fixes that
                    if (document.activeElement !== inputRef.current) {
                      inputRef.current?.focus();
                    }
                  }}
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
                            onSelect={() => handleOptionSelect(option)}
                            {...(selectedOption?.value === option.value ? { ref: selectedOptionRef } : {})}
                          >
                            {renderOption ? renderOption(option) : memoizedGetOptionLabel(option)}
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
        {inputProps.validation ? (
          inputProps.validation
        ) : (
          <p className={classnames(`${baseClassName}__validation`)}>&nbsp;</p>
        )}
      </div>
    </div>
  );
});

ComboBox.displayName = 'ComboBox';

export default ComboBox;
