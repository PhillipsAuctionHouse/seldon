import { render, screen } from '@testing-library/react';
import Navigation, { NavigationProps } from './Navigation';
import Search from '../Search/Search';
import NavigationList from './NavigationList/NavigationList';
import NavigationItem from './NavigationItem/NavigationItem';
import { LanguageSelector } from '../LanguageSelector';
import { HeaderContext, HeaderContextType } from '../Header/Header';
import { defaultHeaderContext } from '../Header/utils';

const defaultProps: NavigationProps = {
  id: 'phillips-nav',
  visible: true,
};
const renderNavigation = (props: NavigationProps = defaultProps, context?: Partial<HeaderContextType>) =>
  render(
    <HeaderContext.Provider value={{ ...defaultHeaderContext, ...context }}>
      <Navigation {...props}>
        <Search />
        <NavigationList id="test-nav">
          <NavigationItem label="Auctions" />
        </NavigationList>
        <LanguageSelector />
      </Navigation>
      ,
    </HeaderContext.Provider>,
  );

describe('Navigation', () => {
  it('renders without error', () => {
    render(<Navigation {...defaultProps} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
  it('renders nav list component if passed', () => {
    renderNavigation();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Auctions')).toBeInTheDocument();
  });
  it('renders search component if passed', () => {
    renderNavigation();
    expect(screen.getAllByLabelText('Search').length).toBeGreaterThanOrEqual(1);
  });
  it('renders language selector component if passed', () => {
    renderNavigation();
    expect(screen.getByRole('combobox', { name: 'English' })).toBeInTheDocument();
  });
  it('hide nav list if search expanded', () => {
    renderNavigation({}, { isSearchExpanded: true });
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
