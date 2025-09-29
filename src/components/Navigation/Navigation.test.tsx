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
const renderNavigation = (contextProps: Partial<HeaderContextType>) =>
  render(
    <HeaderContext.Provider value={{ ...defaultHeaderContext, ...contextProps }}>
      <Navigation {...defaultProps}>
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
  it.each([
    [
      'renders without error',
      {},
      () => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      },
    ],
    [
      'renders nav list component if passed',
      {},
      () => {
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByText('Auctions')).toBeInTheDocument();
      },
    ],
    [
      'renders search component if passed',
      {},
      () => {
        expect(screen.getAllByLabelText('Search').length).toBeGreaterThanOrEqual(1);
      },
    ],
    [
      'renders language selector component if passed',
      {},
      () => {
        expect(screen.getByText('English')).toBeInTheDocument();
      },
    ],
    [
      'hide nav list if search expanded',

      { isSearchExpanded: true },
      () => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      },
    ],
  ])('%s', (_desc, contextProps, assertion) => {
    renderNavigation(contextProps);
    assertion();
  });
});
