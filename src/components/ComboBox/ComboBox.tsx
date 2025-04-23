import React from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Command, CommandInput, CommandList, CommandItem, CommandGroup } from 'cmdk';
import { Icon } from '../Icon';
import * as Popover from '@radix-ui/react-popover';
export interface ComboBoxProps {
  options: string[];
  id: string; // Add the id property
  className?: string; // Add the className property
  label: string; // Add the label property

  placeholder?: string; // Add the placeholder property

  inputValue: string; // Add the inputValue property
  setInputValue: (value: string) => void; // Add the setInputValue property
}

/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens-%2C-Components-%26-Patterns?node-id=11973-9589&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-ComboBox--overview)
 */

const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(function ComboBox(
  { options, className, id, label, placeholder, inputValue, setInputValue, ...props },
  ref,
) {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'ComboBox');
  const [isOpen, setIsOpen] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const sanitizedOptions = options.map((option) => String(option));
  const previousActiveDescendantRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popoverContent = document.querySelector(`.${baseClassName}__content`);
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popoverContent &&
        !popoverContent.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (!sanitizedOptions.some((option) => option.toLowerCase() === inputValue.toLowerCase())) {
          setInputValue('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputValue, sanitizedOptions, baseClassName, setInputValue]);

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={classnames(baseClassName, className)}
      id={id}
      {...commonProps}
      {...props}
      style={{
        position: 'relative',
      }}
    >
      <label htmlFor={`${id}-input`} className={`${baseClassName}__label`}>
        {label}
      </label>
      <Command
        loop
        shouldFilter={false}
        onKeyDown={(e) => {
          const commandElement = e.target as HTMLElement;
          const activeDescendantId = commandElement?.getAttribute('aria-activedescendant');

          if (previousActiveDescendantRef.current) {
            const previousActiveElement = document.getElementById(previousActiveDescendantRef.current);
            previousActiveElement?.classList.remove(`${baseClassName}__highlight`);
          }

          if (activeDescendantId) {
            const activeElement = document.getElementById(activeDescendantId);
            activeElement?.classList.add(`${baseClassName}__highlight`);
            previousActiveDescendantRef.current = activeDescendantId;
          }

          if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <Popover.Root open>
          <Popover.Trigger asChild>
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={(value) => {
                setInputValue(value);
                setIsOpen(true);
              }}
              onFocus={() => {
                setIsOpen(true);
                setInputValue(inputValue);
              }}
              className={`${baseClassName}__input`}
              tabIndex={0}
            />
          </Popover.Trigger>
          {inputValue.length > 0 && (
            <button
              className={`${baseClassName}__close-button`}
              data-testid={`${id}-item-close-button`}
              onClick={() => setInputValue('')}
              aria-label={`clear ${label}`}
              tabIndex={0}
            >
              <Icon color="$primary-black" icon="Close" height={18} width={18} className={`${baseClassName}__icon`} />
            </button>
          )}
          <button
            aria-label={`dropdown ${label}`}
            className={`${baseClassName}__dropdown-button`}
            onClick={() => setIsOpen((prev) => !prev)}
            tabIndex={0}
          >
            <Icon color="$pure-black" height={18} icon="ChevronDown" width={18} className={`${baseClassName}__icon`} />
          </button>
          <Popover.Portal>
            <Popover.Content className={`${baseClassName}__content`}>
              <CommandList className={`${baseClassName}__list`} hidden={!isOpen}>
                {sanitizedOptions.some((option) => option.toLowerCase().includes(inputValue.toLowerCase())) ? (
                  <CommandGroup>
                    {sanitizedOptions.map((option) =>
                      option.toLowerCase().includes(inputValue.toLowerCase()) ? (
                        <CommandItem
                          className={`${baseClassName}__item`}
                          key={`${option}-key`}
                          value={option}
                          ref={(el) => (itemRefs.current[option] = el)}
                          onSelect={(currentValue) => {
                            setInputValue(currentValue);
                            setIsOpen(false);
                          }}
                        >
                          {option}
                        </CommandItem>
                      ) : null,
                    )}
                  </CommandGroup>
                ) : (
                  <Command.Empty>No Options.</Command.Empty>
                )}
              </CommandList>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </Command>
    </div>
  );
});

ComboBox.displayName = 'ComboBox';

export default ComboBox;
