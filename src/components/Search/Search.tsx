import * as React from 'react';
import { px } from '../../utils';
import classnames from 'classnames';
import Input from '../Input/Input';
import SearchIcon from '../../assets/search.svg?react';

export interface SearchProps extends React.HTMLAttributes<HTMLElement> {
  altText?: string;
  useIcon?: boolean;
  // onSearch: (query: string) => void;
}

const Search = ({ altText = 'Search', useIcon = true }: React.PropsWithChildren<SearchProps>) => {
  const [query, setQuery] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [overlayEnabled, setOverlayEnabled] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // const handleSearch = () => {
  //   onSearch(query);
  // };

  const showSearch = () => {
    setOverlayEnabled(!overlayEnabled);
    setSearching(!searching);
  };

  return (
    <div className={`${px}-search`}>
      <div
        className={classnames(`${px}-search__overlay`, { [`${px}-search__overlay--active`]: overlayEnabled })}
        onClick={showSearch}
      />
      <button className={`${px}-search__button`} onClick={showSearch}>
        {useIcon ? <SearchIcon className={`${px}-search__button__icon`} /> : `Search`}
      </button>
      <div
        className={classnames(
          `${px}-search__input-wrapper`,
          { [`${px}-search__input-wrapper--active`]: searching },
          { [`${px}-search__input-wrapper--use-icon`]: useIcon },
        )}
      >
        {useIcon ? <SearchIcon className={`${px}-search__input-wrapper__icon`} /> : null}
        <Input
          className={`${px}-search__input`}
          alt={altText}
          hideLabel={true}
          placeholder={`Type to search`}
          type="text"
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Search;
