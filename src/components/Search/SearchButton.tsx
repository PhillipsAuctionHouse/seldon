import { Icon } from '../Icon';
import { SearchProps } from './Search';
import { ComponentProps } from 'react';

export const SearchButton = ({
  state,
  isSearchExpanded,
  setIsSearchExpanded,
  searchButtonText,
  className,
  testId,
  onCancel,
  ...props
}: {
  testId: string;
  isSearchExpanded: boolean;
  setIsSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>;
} & Pick<SearchProps, 'state' | 'searchButtonText' | 'onCancel'> &
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
        <Icon icon="Search" data-testid={`${testId}-button-icon`} className={`${className}__button__icon`} />
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
          onCancel?.();
          setIsSearchExpanded(false);
          event.stopPropagation();
        }}
      >
        <Icon icon="CloseX" data-testid={`${testId}-form-icon`} className={`${className}__button__icon`} />
      </button>
    );
  }
  return null;
};
