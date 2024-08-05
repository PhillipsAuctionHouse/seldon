import * as React from 'react';
import { px } from '../../../utils';
import Link from '../../Link/Link';

export interface SearchResultsProps extends React.HTMLAttributes<HTMLElement> {
  autoCompleteResults?: { id: string; url: string; label: string }[];
  resultsPending?: boolean;
  children?: React.ReactNode;
}

const SearchResults = ({
  autoCompleteResults = [],
  resultsPending,
  children,
}: React.PropsWithChildren<SearchResultsProps>) => {
  return (
    <ul data-testid="search-results" className={`${px}-search__results`}>
      {resultsPending ? <li className={`${px}-search__result`}>Loading...</li> : null}
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
