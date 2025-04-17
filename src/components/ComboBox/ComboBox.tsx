import React, { useEffect } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Command, CommandInput, CommandList, CommandItem, CommandGroup } from 'cmdk';

export interface ComboBoxProps {
  options: string[];
  id?: string; // Add the id property
  className?: string; // Add the className property
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
  { options, className, id, ...props },
  ref,
) {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'ComboBox');
  const [inputValue, setInputValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  console.log('isOpen', isOpen);

  return (
    <div
      ref={ref}
      className={classnames(baseClassName, className)}
      id={id}
      {...commonProps}
      {...props}
      style={{
        position: 'relative',
      }}
    >
      <Command
        loop
        filter={(value, search) => {
          if (value.includes(search)) return 1;
          return 0;
        }}
      >
        <CommandInput
          placeholder="Search framework..."
          value={inputValue}
          onValueChange={setInputValue}
          onFocus={() => setIsOpen(true)}
        />
        {
          <CommandList hidden={!isOpen}>
            <Command.Empty>No Options.</Command.Empty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    setInputValue(currentValue);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        }
      </Command>
    </div>
  );
});

ComboBox.displayName = 'ComboBox';

export default ComboBox;
