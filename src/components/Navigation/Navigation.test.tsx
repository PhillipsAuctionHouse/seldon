import { render, screen } from '@testing-library/react';
import Navigation, { NavigationProps } from './Navigation';
import Search from '../Search/Search';
import NavigationList from './NavigationList/NavigationList';
import NavigationItem from './NavigationItem/NavigationItem';
import { LanguageSelector } from '../../patterns/LanguageSelector';
import { HeaderContext, HeaderContextType } from '../../site-furniture/Header/Header';
import { defaultHeaderContext } from '../../site-furniture/Header/utils';

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
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Auctions').length).toBeGreaterThanOrEqual(1);
  });
  it('renders search component if passed', () => {
    renderNavigation();
    expect(screen.getAllByLabelText('Search').length).toBeGreaterThanOrEqual(1);
  });
  it('renders language selector component if passed', () => {
    renderNavigation();
    expect(screen.getByText('English')).toBeInTheDocument();
  });
  it('hide nav list if search expanded', () => {
    renderNavigation({}, { isSearchExpanded: true });
    // Lists are offscreen (aria-hidden) when search expanded, so no visible list
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
