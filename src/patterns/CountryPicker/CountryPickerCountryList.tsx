import React, { useCallback } from 'react';
import Text from '../../components/Text/Text';
import { TextVariants } from '../../components/Text';
import { CountryPickerOption } from './CountryPickerOption';
import { CommonProps, Country } from './types';

/**
 * Props for the country list in the picker modal.
 * Includes prioritized and grouped countries, styling, and refs for keyboard navigation.
 */
type CountryPickerCountryListProps = CommonProps & {
  /**
   * List of prioritized countries to display first (e.g., US, GB).
   */
  filteredPrioritized: Country[];
  /**
   * Grouped countries by first letter for display with headers.
   */
  groupedCountries: Record<string, Country[]>;
  /**
   * Base class name for styling.
   */
  baseClassName?: string;
  /**
   * Title for the modal, used for aria-label.
   */
  modalTitle: string;
  /**
   * Ref to the list container for keyboard navigation.
   */
  listRef: React.RefObject<HTMLDivElement>;
  /**
   * Name attribute for radio inputs.
   */
  inputName: string;
};

export const CountryPickerCountryList = ({
  filteredPrioritized,
  groupedCountries,
  baseClassName,
  modalTitle,
  listRef,
  variantConfig,
  inputName,
}: CountryPickerCountryListProps) => {
  // Destructure discriminated union for type-safe access
  const { isPhone, value } = variantConfig;

  const renderCountryOptions = useCallback(
    (list: Country[]) =>
      list.map(({ name, code }) => (
        <CountryPickerOption
          key={code}
          code={code}
          name={name}
          isChecked={value === (isPhone ? code : name)}
          inputName={inputName}
          baseClassName={baseClassName}
          variantConfig={variantConfig}
        />
      )),
    [value, isPhone, inputName, baseClassName, variantConfig],
  );

  // Keyboard navigation: focus moves with arrow keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!listRef.current) return;
    const radios = Array.from(listRef.current.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];
    const current = radios.findIndex((r) => r === document.activeElement);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (current + 1) % radios.length;
      radios[next]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (current - 1 + radios.length) % radios.length;
      radios[prev]?.focus();
    }
  };

  return (
    <div
      className={`${baseClassName}__list`}
      ref={listRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      role="radiogroup"
      aria-label={modalTitle}
    >
      {/* Render prioritized countries first, no header */}
      {renderCountryOptions(filteredPrioritized)}

      {/* Then render grouped countries with letter headers */}
      {Object.entries(groupedCountries).map(([letter, group]) => (
        <div key={letter} className={`${baseClassName}__group`}>
          <div className={`${baseClassName}__letter-header`}>
            <Text variant={TextVariants.heading2} className={`${baseClassName}__letter-text`}>
              {letter}
            </Text>
            <div className={`${baseClassName}__letter-line`} />
          </div>
          {renderCountryOptions(group)}
        </div>
      ))}
    </div>
  );
};
