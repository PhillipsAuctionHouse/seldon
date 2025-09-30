import { render, screen } from '@testing-library/react';
import Navigation, { NavigationProps } from './Navigation';
import Search from '../Search/Search';
import NavigationList from './NavigationList/NavigationList';
import NavigationItem from './NavigationItem/NavigationItem';
import { LanguageSelector } from '../../patterns/LanguageSelector';
import { HeaderContext, HeaderContextType } from '../../site-furniture/Header/Header';
import { defaultHeaderContext } from '../../site-furniture/Header/utils';
import { createRef, ReactNode, RefObject } from 'react';

const renderNavigation = (contextProps: Partial<HeaderContextType>, navProps: Partial<NavigationProps>) =>
  render(
    <HeaderContext.Provider value={{ ...defaultHeaderContext, ...contextProps }}>
      <Navigation id="phillips-nav" {...navProps}>
        <Search />
        <NavigationList id="test-nav">
          <NavigationItem label="Auctions" />
        </NavigationList>
        <LanguageSelector />
      </Navigation>
    </HeaderContext.Provider>,
  );

describe('Navigation', () => {
  it.each([
    [
      'renders without error',
      {},
      {},
      () => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      },
    ],
    [
      'renders nav list component if passed',
      {},
      {},
      () => {
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByText('Auctions')).toBeInTheDocument();
      },
    ],
    [
      'renders search component if passed',
      {},
      {},
      () => {
        expect(screen.getAllByLabelText('Search').length).toBeGreaterThanOrEqual(1);
      },
    ],
    [
      'renders language selector component if passed',
      {},
      {},
      () => {
        expect(screen.getByText('English')).toBeInTheDocument();
      },
    ],
    [
      'hide nav list if search expanded',
      { isSearchExpanded: true },
      {},
      () => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      },
    ],
    [
      'applies  "--visible: hidden" when given visible = false',
      {},
      { visible: false },
      () => {
        screen.debug();
        expect(screen.getByTestId('phillips-nav')).toHaveStyle({ '--visible': 'hidden' });
      },
    ],
  ])('%s', (_desc, contextProps, navProps, assertion) => {
    renderNavigation(contextProps, navProps);
    assertion();
  });

  describe('Navigation', () => {
    it.each([
      [
        'renders without error',
        {},
        {},
        () => {
          expect(screen.getByRole('navigation')).toBeInTheDocument();
        },
      ],
      [
        'renders nav list component if passed',
        {},
        {},
        () => {
          expect(screen.getByRole('list')).toBeInTheDocument();
          expect(screen.getByText('Auctions')).toBeInTheDocument();
        },
      ],
      [
        'renders search component if passed',
        {},
        {},
        () => {
          expect(screen.getAllByLabelText('Search').length).toBeGreaterThanOrEqual(1);
        },
      ],
      [
        'renders language selector component if passed',
        {},
        {},
        () => {
          expect(screen.getByText('English')).toBeInTheDocument();
        },
      ],
      [
        'hide nav list if search expanded',
        { isSearchExpanded: true },
        {},
        () => {
          expect(screen.queryByRole('list')).not.toBeInTheDocument();
        },
      ],
      [
        'applies  "--visible: hidden" when given visible = false',
        {},
        { visible: false },
        () => {
          expect(screen.getByTestId('phillips-nav')).toHaveStyle({ '--visible': 'hidden' });
        },
      ],
    ])('%s', (_desc, contextProps, navProps, assertion) => {
      renderNavigation(contextProps, navProps);
      assertion();
    });

    it('skips rendering NavigationList if it is not a valid React element', () => {
      const ConfusedNavigationList = () => ({ $$typeof: Symbol('oops, sorry react') });

      render(
        <HeaderContext.Provider value={defaultHeaderContext}>
          <Navigation id="phillips-nav">
            <Search />
            {ConfusedNavigationList as unknown as ReactNode}
            <LanguageSelector />
          </Navigation>
        </HeaderContext.Provider>,
      );
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      renderNavigation({}, { className: 'sudan-archives' });
      expect(screen.getByRole('navigation')).toHaveClass('sudan-archives');
    });

    it('forwards ref to nav element', () => {
      const ref: RefObject<HTMLDivElement> = createRef();
      render(
        <HeaderContext.Provider value={defaultHeaderContext}>
          <Navigation ref={ref} id="phillips-nav">
            <Search />
            <NavigationList id="test-nav">
              <NavigationItem label="Auctions" />
            </NavigationList>
            <LanguageSelector />
          </Navigation>
        </HeaderContext.Provider>,
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('NAV');
    });
  });
});
