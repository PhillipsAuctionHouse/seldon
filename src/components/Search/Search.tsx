import React, { useEffect } from 'react';
import { encodeURLSearchParams, getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import Input from '../Input/Input';

import Link from '../Link/Link';
import SearchResults, { type SearchResultsProps } from './SearchResults/SearchResults';
import { Text, TextVariants } from '../Text';
import { useOnClickOutside } from 'usehooks-ts';
import { HeaderContext } from '../Header/Header';
import { SearchButton } from './SearchButton';
import { CSSTransition } from 'react-transition-group';

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

  useOnClickOutside(searchContainerRef, () => showSearch(false));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value && value.length > 2) {
        const allResultsLink = encodeURLSearchParams(getAllResultsLink(value));
        window.location.href = allResultsLink;
      }
      if (e.currentTarget instanceof HTMLAnchorElement) {
        e.currentTarget.click();
      }
    }
    if (e.key === 'Escape') {
      headerContext.setIsSearchExpanded(false);
      searchFormRef.current?.reset();
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
    headerContext.setIsSearchExpanded(isSearchExpanded);
    searchFormRef.current?.reset();
  };

  return (
    <div className={`${baseClassName}__container`}>
      <div
        onClick={() => headerContext.setIsSearchExpanded(true)}
        className={`${baseClassName}__container__inner`}
        ref={searchContainerRef}
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
                  onChange={
                    onSearch
                      ? (e: { target: { value: string } }) => {
                          onSearch(e.target.value);
                        }
                      : undefined
                  }
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
              />
            </div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
