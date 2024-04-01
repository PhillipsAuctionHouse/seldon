// import * as React from 'react';
import classnames from 'classnames';

import { px } from '../../utils';
import Button from '../Button/Button';

// Try to not pass complex objects into components
type User = {
  name: string;
};

// export interface I18nObject {
//
// }

interface NavProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

const Navbar = ({ 
  user,
  onLogin,
  onLogout,
  onCreateAccount
}: NavProps) => {

  return (
    <div className={classnames(`${px}-navbar`)}>
      <div className={classnames(`${px}-navbar__topbar`)}>
        <div className={classnames(`${px}-navbar__topbar__right`)}>
          {user ? (
            <>
              <span>{user.name}</span>
              <Button onClick={onLogout}>Log out</Button>
            </>
          ) : (
            <>
              <Button onClick={onLogin}>Log in</Button>
              <Button onClick={onCreateAccount}>Create account</Button>
            </>
          )}
        </div>
        <div className={classnames(`${px}-navbar__topbar__left`)}>
          <a href="/">Home</a>
        </div>
      </div>
      <div className={classnames(`${px}-navbar__bottombar`)}>
        <div className={classnames(`${px}-navbar__bottombar__logo`)}>
          <a href="/">
            <img src="/images/LogoBlack.svg" alt="Phillips" />
          </a>
        </div>
        <div className={classnames(`${px}-navbar__bottombar__navitems`)}>
          <div className={classnames(`${px}-navbar__bottombar__navitems__item`)}>
            <a href="/">Auctions</a>
          </div>
        </div>
        <div className={classnames(`${px}-navbar__bottombar__search`)}>
          <input type="search" placeholder="Search" />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
