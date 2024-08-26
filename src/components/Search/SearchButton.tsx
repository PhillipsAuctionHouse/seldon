import { SearchProps } from './Search';
import SearchIcon from '../../assets/search.svg?react';
import CloseIcon from '../../assets/close.svg?react';
import LoadingSpinner from '../../assets/loading_spinner.svg?react';
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
  const renderSpinner = state === 'loading' || state === 'submitting';

  if (!isSearchExpanded) {
    return (
      <button
        {...props}
        type="button"
        data-testid={`${testId}-button`}
        aria-label={searchButtonText}
        className={`${className}__button ${className}__button--search`}
        onClick={() => setIsSearchExpanded((isSearchExpanded) => !isSearchExpanded)}
      >
        <SearchIcon data-testid={`${testId}-button-icon`} className={`${className}__button__icon`} />
      </button>
    );
  }

  if (isSearchExpanded && state === 'idle') {
    return (
      <button
        {...props}
        type="button"
        data-testid={`${testId}-close-button`}
        aria-label="Close Search"
        className={`${className}__button ${className}__button--close`}
        onClick={() => setIsSearchExpanded((isSearchExpanded) => !isSearchExpanded)}
      >
        <CloseIcon data-testid={`${testId}-form-icon`} className={`${className}__button__icon`} />
      </button>
    );
  }

  if (isSearchExpanded && renderSpinner) {
    return (
      <LoadingSpinner
        data-testid={`${testId}-form-icon`}
        className={`${className}__button__icon ${className}__input-status-icon`}
      />
    );
  }
  return null;
};
