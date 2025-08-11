import { useState, useMemo, useRef, forwardRef } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import Text from '../Text/Text';
import { TextVariants } from '../Text';
import { assignType, Country, ModalBaseProps } from './types';
import { countries } from './constants';
import { getSafeCountryCallingCode } from './utils';
import { CountryPickerOption } from './CountryPickerOption';
import { ButtonVariants } from '../Button/types';
import Icon from '../Icon/Icon';

export type CountryPickerModalProps = {
  /**
   * The title displayed at the top of the modal.
   */
  modalTitle: string;

  /**
   * The label for the search input field.
   */
  searchLabel: string;

  /**
   * Placeholder text for the search input field.
   */
  searchPlaceholder: string;

  /**
   * Label for the button used to confirm the selection.
   */
  selectButtonLabel: string;

  /**
   * The name attribute for a hidden input field, if applicable.
   */
  inputName?: string;
};

const PRIORITIZED_CODES: readonly Country['code'][] = ['US', 'GB', 'HK', 'CH'];

// Filtering helper
const filterCountries = (list: Country[], filter: string) => {
  if (!filter) return list;
  // Escape regex special characters
  const sanitizedFilter = filter.replace(/[.*?^${}()|[\]\\]/g, '\\$&');
  // Remove + for matching (but keep original for display)
  const pattern = sanitizedFilter.replace(/\+/g, '');
  if (!pattern) return list;
  const f = new RegExp(pattern, 'gi');
  return list.filter((country) => {
    const name = country.name;
    const code = country.code;
    const callingCode = getSafeCountryCallingCode(code);
    const callingCodeNoPlus = callingCode.replace(/\+/g, '');
    return f.test(name) || f.test(code) || f.test(callingCodeNoPlus) || f.test('+' + callingCodeNoPlus);
  });
};

const CountryPickerModal = forwardRef<HTMLDivElement, ModalBaseProps<CountryPickerModalProps>>(
  ({
    isOpen = false,
    onClose,
    modalTitle,
    searchLabel,
    searchPlaceholder,
    selectButtonLabel,
    inputName = 'countryValue',
    baseClassName,
    variantConfig,
  }) => {
    const config = assignType(variantConfig);
    const { isPhone, countryValue } = config;

    const [filter, setFilter] = useState('');
    const selectButtonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Split out prioritized countries and the rest
    const [prioritized, rest] = useMemo(() => {
      const prioritized = PRIORITIZED_CODES.map((code) => countries.filter((country) => country.code === code)).flat();
      const rest = countries.filter((country) => !PRIORITIZED_CODES.includes(country.code));
      return [
        prioritized, // keep original order for prioritized
        rest.sort((a, b) => a.name.localeCompare(b.name)),
      ];
    }, []);

    // Filtering
    const filteredPrioritized = useMemo(() => filterCountries(prioritized, filter), [prioritized, filter]);

    const filteredRest = useMemo(() => filterCountries(rest, filter), [rest, filter]);

    // Group rest by first letter
    const groupedCountries = useMemo(() => {
      const groups: Record<string, Country[]> = {};
      filteredRest.forEach((country) => {
        const letter = country.name[0].toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(country);
      });
      return groups;
    }, [filteredRest]);

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

    // Render country options
    const renderCountryOptions = (list: Country[]) =>
      list.map(({ name, code }) => (
        <CountryPickerOption
          key={code}
          code={code}
          name={name}
          isChecked={countryValue === (isPhone ? code : name)}
          inputName={inputName}
          baseClassName={baseClassName}
          variantConfig={config}
        />
      ));

    return (
      <Modal isOpen={isOpen} onClose={onClose} data-testid="country-picker-modal" className={`${baseClassName}__modal`}>
        <form className={`${baseClassName}__form`}>
          {/* Hidden input for form submission */}
          <input type="hidden" name={inputName} value={countryValue ?? ''} data-testid="country-picker-hidden-input" />

          {/* Modal header and search */}
          <div className={`${baseClassName}__header`}>
            <Text variant={TextVariants.heading3} className={`${baseClassName}__header-text`}>
              {modalTitle}
            </Text>
            <div className={`${baseClassName}__input-wrapper`}>
              <span className={`${baseClassName}__input-icon`} aria-hidden="true">
                <Icon icon="Search" width={16} height={16} color="currentColor" />
              </span>
              <Input
                id="countrySearch"
                type="search"
                labelText={searchLabel}
                placeholder={searchPlaceholder}
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                autoFocus
                className={`${baseClassName}__input`}
              />
            </div>
          </div>

          {/* Scrollable country list */}
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

          {/* Select button pinned at bottom */}
          <div className={`${baseClassName}__button-container`}>
            <Button
              onClick={onClose}
              className={`${baseClassName}__button`}
              data-testid="country-picker-modal-select-button"
              ref={selectButtonRef}
              type="button"
              variant={ButtonVariants.secondary}
              isDisabled={!countryValue}
            >
              {selectButtonLabel}
            </Button>
          </div>
        </form>
      </Modal>
    );
  },
);

CountryPickerModal.displayName = 'CountryPickerModal';

export default CountryPickerModal;
