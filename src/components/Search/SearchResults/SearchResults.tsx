import * as React from 'react';
import { px } from '../../../utils';
import Link from '../../Link/Link';

export interface SearchResultsProps extends React.HTMLAttributes<HTMLElement> {
  autoCompleteResults?: { id: string; url: string; label: string }[];
  isLoading?: boolean;
  children?: React.ReactNode;
  loadingText?: string;
}

const SearchResults = ({
  autoCompleteResults = [],
  isLoading,
  children,
  loadingText = 'Loading...',
}: React.PropsWithChildren<SearchResultsProps>) => {
  return (
    <ul data-testid="search-results" className={`${px}-search__results`}>
      {isLoading ? <li className={`${px}-search__result`}>{loadingText}</li> : null}
      {Array.isArray(autoCompleteResults) &&
        autoCompleteResults.length > 0 &&
        autoCompleteResults.map((result) => {
          return (
            <li key={result.id} className={`${px}-search__result`}>
              <Link href={result.url}>
                <p>{result.label}</p>
              </Link>
            </li>
          );
        })}
      {children}
    </ul>
  );
};

export default SearchResults;
