import * as React from 'react';
import { px } from '../../../utils';
import Link from '../../Link/Link';
import { LinkVariants } from '../../Link';
import { HTMLParser } from '../../HTMLParser';

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
}

const SearchResults = ({
  autoCompleteResults = [],
  isLoading,
  children,
  loadingText = 'Loading...',
  onKeyDown,
  userInputValue = '',
}: React.PropsWithChildren<SearchResultsProps>) => {
  const hasResults = Array.isArray(autoCompleteResults) && autoCompleteResults.length > 0;

  function formatSearchLabel(label: string, searchQuery: string): React.ReactNode {
    return (
      <HTMLParser
        html={`<span class='${px}-search__result__label'>${label.replace(new RegExp(searchQuery, 'gi'), (match) => `<strong>${match}</strong>`)}</span>`}
      />
    );
  }

  return (
    <div className={`${px}-search__results`}>
      <ul data-testid="search-results" className={`${px}-search__results-container`}>
        {isLoading ? <li className={`${px}-search__result`}>{loadingText}</li> : null}
        {hasResults &&
          autoCompleteResults.map((result) => {
            return (
              <li key={result.id} className={`${px}-search__result`}>
                <Link href={result.url} onKeyDown={onKeyDown} variant={LinkVariants.snwFlyoutLink}>
                  {formatSearchLabel(result.label, userInputValue)}
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
