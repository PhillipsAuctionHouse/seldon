import { SearchProps } from './Search';
import SearchIcon from '../../assets/search.svg?react';
import CloseIcon from '../../assets/close.svg?react';
import { ComponentProps } from 'react';

export const SearchButton = ({
  state,
  isSearchExpanded,
  setIsSearchExpanded,
  searchButtonText,
  className,
  testId,
  ...props
}: {
  testId: string;
  isSearchExpanded: boolean;
  setIsSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>;
} & Pick<SearchProps, 'state' | 'searchButtonText'> &
  ComponentProps<'button'>) => {
  if (!isSearchExpanded) {
    return (
      <button
        {...props}
        type="button"
        data-testid={`${testId}-button`}
        aria-label={searchButtonText}
        className={`${className}__button ${className}__button--search`}
        onClick={(event) => {
          setIsSearchExpanded(true);
          event.stopPropagation();
        }}
      >
        <SearchIcon data-testid={`${testId}-button-icon`} className={`${className}__button__icon`} />
      </button>
    );
  }

  if (isSearchExpanded) {
    return (
      <button
        {...props}
        type="button"
        data-testid={`${testId}-close-button`}
        aria-label="Close Search"
        className={`${className}__button ${className}__button--close`}
        onClick={(event) => {
          setIsSearchExpanded(false);
          event.stopPropagation();
        }}
      >
        <CloseIcon data-testid={`${testId}-form-icon`} className={`${className}__button__icon`} />
      </button>
    );
  }
  return null;
};
