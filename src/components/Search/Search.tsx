import * as React from 'react';
import { encodeURLSearchParams, getCommonProps } from '../../utils';
import classnames from 'classnames';
import Input from '../Input/Input';
import SearchIcon from '../../assets/search.svg?react';
import Link from '../Link/Link';
import SearchResults, { type SearchResultsProps } from './SearchResults/SearchResults';

export interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true will show an icon instead of text in the button
   */
  useIcon?: boolean;

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
  useIcon = true,
  onSearch,
  searchResults = [],
  state = 'idle',
  defaultValue = '',
  className,
  placeholder = 'Type to search',
  searchButtonText = 'Search',
  loadingText = 'Loading...',
  invalidText = 'Invalid search',
  getAllResultsText = (searchValue) => `View all results for ${searchValue}`,
  getAllResultsLink = (searchValue) => `/Search?Search=${searchValue}`,
  ...props
}: React.PropsWithChildren<SearchProps>) => {
  const { className: baseClassName, 'data-testid': baseTestId, ...commonProps } = getCommonProps(props, 'Search');
  const [overlayEnabled, setOverlayEnabled] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const value = searchInputRef.current?.value;
  const showSearch = () => {
    setOverlayEnabled(!overlayEnabled);
    // means we're opening search
    if (!overlayEnabled) {
      searchInputRef.current?.focus();
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
      <div
        data-testid={`${baseTestId}-overlay`}
        className={classnames(`${baseClassName}__overlay`, { [`${baseClassName}__overlay--active`]: overlayEnabled })}
        onClick={showSearch}
      />
      <button
        data-testid={`${baseTestId}-button`}
        aria-label={searchButtonText}
        className={`${baseClassName}__button`}
        onClick={showSearch}
      >
        {useIcon ? (
          <SearchIcon data-testid={`${baseTestId}-button-icon`} className={`${baseClassName}__button__icon`} />
        ) : (
          searchButtonText
        )}
      </button>
      <form
        data-testid={`${baseTestId}-form`}
        className={classnames(`${baseClassName}__form`, { [`${baseClassName}__form--active`]: overlayEnabled })}
        aria-hidden={!overlayEnabled}
      >
        <div
          className={classnames(`${baseClassName}__input-wrapper`, {
            [`${baseClassName}__input-wrapper--use-icon`]: useIcon,
          })}
          role="combobox"
          aria-haspopup="listbox"
        >
          {useIcon ? (
            <SearchIcon data-testid={`${baseTestId}-form-icon`} className={`${baseClassName}__input-wrapper__icon`} />
          ) : null}
          <Input
            className={`${baseClassName}__input`}
            id="search-input"
            hideLabel
            labelText={searchButtonText}
            placeholder={placeholder}
            type="text"
            defaultValue={defaultValue}
            invalid={state === 'invalid'}
            invalidText={invalidText}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Escape') {
                setOverlayEnabled(false);
              }
            }}
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
