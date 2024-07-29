import * as React from 'react';
import { px } from '../../../utils';
import Link from '../../Link/Link';

export interface SearchResultsProps extends React.HTMLAttributes<HTMLElement> {
  autoCompleteResults?: { id: string; url: string; label: string }[];
  children?: React.ReactNode;
}

const SearchResults = ({ autoCompleteResults = [], children }: React.PropsWithChildren<SearchResultsProps>) => {
  React.useEffect(() => {
    console.log('AUTO COMPLETE RESULTS', autoCompleteResults);
  }, [autoCompleteResults]);

  const slugifyString = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <ul data-testid="search-results" className={`${px}-search__results`}>
      {Array.isArray(autoCompleteResults) &&
        autoCompleteResults.length > 0 &&
        autoCompleteResults.map((result) => {
          return (
            <li key={result.id} className={`${px}-search__result`}>
              <Link href={`/artist/${result.id}/${slugifyString(result.url)}`}>
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
