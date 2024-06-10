import * as React from 'react';
import { px } from '../../utils';
import classnames from 'classnames';
import Input from '../Input/Input';
import SearchIcon from '../../assets/search.svg?react';

export interface SearchProps extends React.HTMLAttributes<HTMLElement> {
  altText?: string;
  useIcon?: boolean;
}

const Search = ({ altText = 'Search', useIcon = true }: React.PropsWithChildren<SearchProps>) => {
  const [overlayEnabled, setOverlayEnabled] = React.useState(false);

  const showSearch = () => {
    setOverlayEnabled(!overlayEnabled);
  };

  return (
    <div className={`${px}-search`}>
      <div
        data-testid="search-overlay"
        className={classnames(`${px}-search__overlay`, { [`${px}-search__overlay--active`]: overlayEnabled })}
        onClick={showSearch}
      />
      <button data-testid="search-button" className={`${px}-search__button`} onClick={showSearch}>
        {useIcon ? <SearchIcon className={`${px}-search__button__icon`} /> : `Search`}
      </button>
      <div
        className={classnames(
          `${px}-search__input-wrapper`,
          { [`${px}-search__input-wrapper--active`]: overlayEnabled },
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
        />
      </div>
    </div>
  );
};

export default Search;
