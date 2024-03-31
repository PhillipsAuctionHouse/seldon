import Button from '../Button/Button';

// Try to not pass complex objects into components
type User = {
  name: string;
};

interface NavProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

const Navbar = ({ user, onLogin, onLogout, onCreateAccount }: NavProps) => (
  <header>
    <div className="phillips-nav">
      <div className="phillips-nav__topbar">
        <div className="phillips-nav__topbar__right">
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
        <div className="phillips-nav__topbar__left">
          <a href="/">Home</a>
        </div>
      </div>
      <div className='phillips-nav__bottombar'>
        <div className='phillips-nav__bottombar__logo'>
          <a href="/">
            <img src="/images/logo.svg" alt="Phillips" />
          </a>
        </div>
        <div className='phillips-nav__bottombar__navitems'>
          <div className='phillips-nav__bottombar__navitems__item'>
            <a href="/">Auctions</a>
          </div>
        </div>
        <div className='phillips-nav__bottombar__search'>
          <input type="search" placeholder="Search" />
          <button>Search</button>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
