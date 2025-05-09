import React, { useEffect } from 'react';
import { encodeURLSearchParams, getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import Input from '../Input/Input';

import Link from '../Link/Link';
import SearchResults, { type SearchResultsProps } from './SearchResults/SearchResults';
import { Text, TextVariants } from '../Text';
import { useOnClickOutside } from 'usehooks-ts';
import { HeaderContext } from '../../site-furniture/Header/Header';
import { SearchButton } from './SearchButton';
import { CSSTransition } from 'react-transition-group';
import { RemoveScroll } from 'react-remove-scroll';

export interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   *
   * @param searchQuery called when the search input changes
   * @returns void
   */
  onSearch?: (searchQuery: string) => void;
  /**
   * called when the search is cancelled
   */
  onCancel?: () => void;
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
  onCancel,
  searchResults = [],
  state = 'idle',
  defaultValue = '',
  className,
  placeholder = '',
  searchButtonText = 'Search',
  loadingText = 'Search In Progress...',
  invalidText = 'Invalid search',
  getAllResultsText = (searchValue) => `View all results for ${searchValue}`,
  getAllResultsLink = (searchValue) => `/Search?Search=${searchValue}`,
  ...props
}: React.PropsWithChildren<SearchProps>) => {
  const { className: baseClassName, 'data-testid': baseTestId, ...commonProps } = getCommonProps(props, 'Search');
  const headerContext = React.useContext(HeaderContext);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchFormRef = React.useRef<HTMLFormElement>(null);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const isSearchExpanded = headerContext.isSearchExpanded;
  const value = searchInputRef.current?.value;
  const [shouldShowResults, setShouldShowResults] = React.useState(true);

  const onInputChange = onSearch
    ? (e: { target: { value: string } }) => {
        onSearch(e.target.value);
      }
    : undefined;

  useOnClickOutside(searchContainerRef, (event) => {
    onCancel?.();
    showSearch(false);
    event.stopPropagation();
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value && value.length > 2) {
        const allResultsLink = encodeURLSearchParams(getAllResultsLink(value));
        setShouldShowResults(false);
        window.location.href = allResultsLink;
      }
      if (e.currentTarget instanceof HTMLAnchorElement) {
        setShouldShowResults(false);
        e.currentTarget.click();
      }
    }
    if (e.key === 'Escape') {
      searchFormRef.current?.reset();
      headerContext.setIsSearchExpanded(false);
    }
  };

  useEffect(() => {
    // means we're opening search
    if (isSearchExpanded) {
      searchInputRef.current?.focus();
      return;
    }
  }, [isSearchExpanded]);

  const showSearch: typeof headerContext.setIsSearchExpanded = (isSearchExpanded) => {
    searchFormRef.current?.reset();
    headerContext.setIsSearchExpanded(isSearchExpanded);
  };

  return (
    <RemoveScroll enabled={isSearchExpanded} allowPinchZoom removeScrollBar={false}>
      <div className={`${baseClassName}__container`}>
        <div
          className={`${baseClassName}__container__inner`}
          ref={searchContainerRef}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            if (!isSearchExpanded) {
              showSearch(true);
              event.stopPropagation();
            }
          }}
        >
          <Text variant={TextVariants.heading4} className={`${baseClassName}__container__inner__label`}>
            {searchButtonText}
          </Text>
          <div
            {...commonProps}
            className={classnames(baseClassName, className, { [`${baseClassName}--active`]: isSearchExpanded })}
            data-testid={baseTestId}
            role="search"
            {...props}
          >
            <form
              data-testid={`${baseTestId}-form`}
              className={classnames(`${baseClassName}__form`, {
                [`${baseClassName}__form--active`]: isSearchExpanded,
              })}
              ref={searchFormRef}
            >
              <div
                className={classnames(`${baseClassName}__content-wrapper`, {
                  [`${baseClassName}__content-wrapper--active`]: isSearchExpanded,
                })}
                role="combobox"
                aria-haspopup="listbox"
              >
                <CSSTransition
                  in={isSearchExpanded}
                  classNames={`${px}-input`}
                  addEndListener={() => {
                    return;
                  }}
                >
                  <Input
                    aria-hidden={!isSearchExpanded}
                    className={`${baseClassName}__input`}
                    id="search-input"
                    hideLabel
                    labelText={searchButtonText}
                    placeholder={isSearchExpanded ? placeholder : ''}
                    type="text"
                    defaultValue={defaultValue}
                    invalid={state === 'invalid'}
                    invalidText={invalidText}
                    onKeyDown={onKeyDown}
                    onChange={onInputChange}
                    ref={searchInputRef}
                  />
                </CSSTransition>
                <SearchButton
                  className={baseClassName}
                  searchButtonText={searchButtonText}
                  state={state}
                  testId={baseTestId}
                  isSearchExpanded={isSearchExpanded}
                  setIsSearchExpanded={showSearch}
                  onCancel={onCancel}
                />
              </div>
              {isSearchExpanded && shouldShowResults && value && value.length > 2 ? (
                <SearchResults
                  autoCompleteResults={searchResults}
                  isLoading={state === 'loading'}
                  loadingText={loadingText}
                  onKeyDown={onKeyDown}
                  userInputValue={value}
                  closeSearch={setShouldShowResults}
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
            </form>
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default Search;
