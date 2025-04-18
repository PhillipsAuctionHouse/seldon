import React from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Command, CommandInput, CommandList, CommandItem, CommandGroup } from 'cmdk';

export interface ComboBoxProps {
  options: string[];
  id: string; // Add the id property
  className?: string; // Add the className property
  label: string; // Add the label property
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
  { options, className, id, label, ...props },
  ref,
) {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'ComboBox');
  const [inputValue, setInputValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const sanitizedOptions = options.map((option) => String(option));

  const handleValueChange = (value: string) => {
    setInputValue(value);

    Object.values(itemRefs.current).forEach((item) => {
      if (item) {
        item.classList.remove(`${baseClassName}__highlight`);
      }
    });

    const matchingItem = itemRefs.current[value];
    if (matchingItem) {
      matchingItem.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      matchingItem.classList.add(`${baseClassName}__highlight`);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <Command loop shouldFilter={false}>
        <CommandInput
          placeholder="Type to search..."
          value={inputValue}
          onValueChange={handleValueChange}
          onFocus={() => {
            setIsOpen(true);
            handleValueChange(inputValue);
          }}
          className={`${baseClassName}__input`}
        />
        <CommandList className={`${baseClassName}__list`} hidden={!isOpen}>
          {sanitizedOptions.some((option) => option.toLowerCase().includes(inputValue.toLowerCase())) ? (
            <CommandGroup>
              {sanitizedOptions.map((option) =>
                option.toLowerCase().includes(inputValue.toLowerCase()) ? (
                  <CommandItem
                    className={`${baseClassName}__item`}
                    key={option}
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
      </Command>
    </div>
  );
});

ComboBox.displayName = 'ComboBox';

export default ComboBox;
