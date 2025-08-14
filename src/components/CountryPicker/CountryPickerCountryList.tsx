import React, { useCallback } from 'react';
import Text from '../Text/Text';
import { TextVariants } from '../Text';
import { CountryPickerOption } from './CountryPickerOption';
import { Country, VariantConfig } from './types';

type CountryPickerCountryListProps = {
  filteredPrioritized: Country[];
  groupedCountries: Record<string, Country[]>;
  baseClassName?: string;
  modalTitle: string;
  listRef: React.RefObject<HTMLDivElement>;
  variantConfig: VariantConfig;
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
  const { isPhone, countryValue } = variantConfig;

  const renderCountryOptions = useCallback(
    (list: Country[]) =>
      list.map(({ name, code }) => (
        <CountryPickerOption
          key={code}
          code={code}
          name={name}
          isChecked={countryValue === (isPhone ? code : name)}
          inputName={inputName}
          baseClassName={baseClassName}
          variantConfig={variantConfig}
        />
      )),
    [countryValue, isPhone, inputName, baseClassName, variantConfig],
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
