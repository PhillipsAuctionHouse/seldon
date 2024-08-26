import * as React from 'react';
import { encodeURLSearchParams, getCommonProps } from '../../utils';
import classnames from 'classnames';
import Input from '../Input/Input';
import SearchIcon from '../../assets/search.svg?react';
import CloseIcon from '../../assets/close.svg?react';
import LoadingSpinner from '../../assets/loading_spinner.svg?react';
import Link from '../Link/Link';
import SearchResults, { type SearchResultsProps } from './SearchResults/SearchResults';
import { Text, TextVariants } from '../Text';

export interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   *
   * @param searchQuery called when the search input changes
   * @returns void
   */
  onSearch?: (searchQuery: string) => void;
  /**
   * The search results to display
   */
  searchResults?: SearchResultsProps['autoCompleteResults'];
  /**
   * additional state information
   */
  state?: 'loading' | 'submitting' | 'invalid' | 'idle';
  /**
   * allows override of the default placeholder (i.e. for internationalization)
   */
  placeholder?: string;
  /**
   * allows override of the search button label (i.e. for internationalization)
   */
  searchButtonText?: string;
  /**
   * allows override of the default loading text (i.e. for internationalization)
   */
  loadingText?: string;
  /**
   * allows override of the default allResults text (i.e. for internationalization)
   */
  getAllResultsText?: (searchQuery: string) => string;
  /**
   * allows override of the default allResults link in case this component should not launch not the default all results landing point
   */
  getAllResultsLink?: (searchQuery: string) => string;
  /**
   * allows override of the default invalid text (i.e. for internationalization)
   */
  invalidText?: string;
}

const Search = ({
  onSearch,
  searchResults = [],
  state = 'idle',
  defaultValue = '',
  className,
  placeholder,
  searchButtonText = 'Search',
  loadingText = 'Search In Progress...',
  invalidText = 'Invalid search',
  getAllResultsText = (searchValue) => `View all results for ${searchValue}`,
  getAllResultsLink = (searchValue) => `/Search?Search=${searchValue}`,
  ...props
}: React.PropsWithChildren<SearchProps>) => {
  const { className: baseClassName, 'data-testid': baseTestId, ...commonProps } = getCommonProps(props, 'Search');
  const [searchEnabled, setSearchEnabled] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchFormRef = React.useRef<HTMLFormElement>(null);
  const value = searchInputRef.current?.value;
  const renderSpinner = state === 'loading' || state === 'submitting';
  const showSearch = () => {
    setSearchEnabled(!searchEnabled);
    // means we're opening search
    if (searchEnabled) {
      searchFormRef.current?.reset();
      return;
    }
    searchInputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Escape') {
      setSearchEnabled(false);
      searchFormRef.current?.reset();
    }
  };

  return (
    <div
      {...commonProps}
      className={classnames(baseClassName, className)}
      data-testid={baseTestId}
      role="search"
      {...props}
    >
      <Text variant={TextVariants.heading3} className={`${baseClassName}__label`}>
        {searchButtonText}
      </Text>
      {!searchEnabled ? (
        <button
          type="button"
          data-testid={`${baseTestId}-button`}
          aria-label={searchButtonText}
          className={`${baseClassName}__button ${baseClassName}__button--search`}
          onClick={showSearch}
        >
          <SearchIcon data-testid={`${baseTestId}-button-icon`} className={`${baseClassName}__button__icon`} />
        </button>
      ) : null}
      {searchEnabled && state === 'idle' ? (
        <button
          type="button"
          data-testid={`${baseTestId}-close-button`}
          aria-label="Close Search"
          className={`${baseClassName}__button ${baseClassName}__button--close`}
          onClick={showSearch}
        >
          <CloseIcon data-testid={`${baseTestId}-form-icon`} className={`${baseClassName}__button__icon`} />
        </button>
      ) : null}
      {searchEnabled && renderSpinner ? (
        <LoadingSpinner
          data-testid={`${baseTestId}-form-icon`}
          className={`${baseClassName}__button__icon ${baseClassName}__input-status-icon`}
        />
      ) : null}
      <form
        data-testid={`${baseTestId}-form`}
        className={classnames(`${baseClassName}__form`, { [`${baseClassName}__form--active`]: searchEnabled })}
        aria-hidden={!searchEnabled}
        ref={searchFormRef}
      >
        <div className={classnames(`${baseClassName}__content-wrapper`)} role="combobox" aria-haspopup="listbox">
          <Input
            className={`${baseClassName}__input`}
            id="search-input"
            hideLabel
            labelText={searchButtonText}
            placeholder={placeholder ?? null}
            type="text"
            defaultValue={defaultValue}
            invalid={state === 'invalid'}
            invalidText={invalidText}
            onKeyDown={onKeyDown}
            onChange={
              onSearch
                ? (e: { target: { value: string } }) => {
                    onSearch(e.target.value);
                  }
                : undefined
            }
            ref={searchInputRef}
          />
          {value && value.length > 2 ? (
            <SearchResults
              autoCompleteResults={searchResults}
              isLoading={state === 'loading'}
              loadingText={loadingText}
              onKeyDown={onKeyDown}
            >
              <li key="viewAllSearchResults" className={`${baseClassName}__result`}>
                <Link
                  href={((value: string) => {
                    return encodeURLSearchParams(getAllResultsLink(value));
                  })(value)}
                >
                  <p>{getAllResultsText(value)}</p>
                </Link>
              </li>
            </SearchResults>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Search;
