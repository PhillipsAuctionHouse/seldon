import * as React from 'react';
import { px } from '../../../utils';
import Link from '../../Link/Link';
import { LinkVariants } from '../../Link';

export interface SearchResult {
  id: string;
  url: string;
  label: string;
}

export interface SearchResultsProps extends React.HTMLAttributes<HTMLElement> {
  autoCompleteResults?: SearchResult[];
  isLoading?: boolean;
  children?: React.ReactNode;
  loadingText?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
  userInputValue?: string;
  closeSearch: (value: boolean) => void;
}

const SearchResults = ({
  autoCompleteResults = [],
  isLoading,
  children,
  loadingText = 'Loading...',
  onKeyDown,
  userInputValue = '',
  closeSearch,
}: React.PropsWithChildren<SearchResultsProps>) => {
  const hasResults = Array.isArray(autoCompleteResults) && autoCompleteResults.length > 0;

  function formatSearchLabel(label: string, searchQuery: string): React.ReactNode {
    const parts = label.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLocaleLowerCase() === searchQuery.toLocaleLowerCase() ? <strong key={index}>{part}</strong> : part,
    );
  }

  return (
    <div className={`${px}-search__results`}>
      <ul
        data-testid="search-results"
        className={`${px}-search__results-container ${isLoading || hasResults ? 'visible' : ''}`}
      >
        {isLoading ? <li className={`${px}-search__result`}>{loadingText}</li> : null}
        {hasResults &&
          autoCompleteResults.map((result, i) => {
            return (
              <li key={result.id} className={`${px}-search__result`}>
                <Link
                  href={result.url}
                  onKeyDown={onKeyDown}
                  onClick={() => closeSearch(false)}
                  variant={LinkVariants.snwFlyoutLink}
                >
                  <span data-testid={`search-result-${i}`} className="${px}-search__result__label">
                    {formatSearchLabel(result.label, userInputValue)}
                  </span>
                </Link>
              </li>
            );
          })}
        {children}
      </ul>
    </div>
  );
};

export default SearchResults;
