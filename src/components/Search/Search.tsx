import * as React from 'react';
import { px } from '../../utils';
import classnames from 'classnames';
import Input from '../Input/Input';
import SearchIcon from '../../assets/search.svg?react';
import Link from '../Link/Link';
import SearchResults, { type SearchResultsProps } from './SearchResults/SearchResults';

export interface SearchProps extends React.HTMLAttributes<HTMLElement> {
  altText?: string;
  useIcon?: boolean;
  onSearch?: (searchQuery: string) => void;
  searchResults?: SearchResultsProps['autoCompleteResults'];
}

const Search = ({
  altText = 'Search',
  useIcon = true,
  onSearch,
  searchResults = [],
}: React.PropsWithChildren<SearchProps>) => {
  const [overlayEnabled, setOverlayEnabled] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const showSearch = () => {
    setOverlayEnabled(!overlayEnabled);
  };

  return (
    <div data-testid="header-search" className={`${px}-search`} role="search">
      <div
        data-testid="search-overlay"
        className={classnames(`${px}-search__overlay`, { [`${px}-search__overlay--active`]: overlayEnabled })}
        onClick={showSearch}
      />
      <button data-testid="search-button" className={`${px}-search__button`} onClick={showSearch}>
        {useIcon ? (
          <SearchIcon data-testid={`search-button-icon`} className={`${px}-search__button__icon`} />
        ) : (
          `Search`
        )}
      </button>
      <form
        data-testid="search-form"
        className={classnames(`${px}-search__form`, { [`${px}-search__form--active`]: overlayEnabled })}
      >
        <div
          className={classnames(`${px}-search__input-wrapper`, { [`${px}-search__input-wrapper--use-icon`]: useIcon })}
          role="combobox"
          aria-haspopup="listbox"
        >
          {useIcon ? (
            <SearchIcon data-testid={`search-form-icon`} className={`${px}-search__input-wrapper__icon`} />
          ) : null}
          <Input
            className={`${px}-search__input`}
            alt={altText}
            hideLabel={true}
            placeholder={`Type to search`}
            type="text"
            onChange={
              onSearch
                ? (e: { target: { value: string } }) => {
                    console.log('e.target.value', e.target.value);
                    onSearch(e.target.value);
                  }
                : undefined
            }
            ref={searchInputRef}
          />
          {searchInputRef.current?.value && searchInputRef.current?.value.length > 2 ? (
            <SearchResults autoCompleteResults={searchResults}>
              <li key="viewAllSearchResults" className={`${px}-search__result`}>
                <Link href={`/Search?Search=${encodeURIComponent(searchInputRef.current?.value)}`}>
                  <p>{`View all results for ${searchInputRef.current?.value}`}</p>
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
