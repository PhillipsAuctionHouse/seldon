import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { runCommonTests } from '../../utils/testUtils';
import { px } from '../../utils';

describe('Search component', () => {
  runCommonTests((props) => <Search {...props} />, 'Search');
  it('check is loading state', async () => {
    render(<Search state="loading" loadingText="Pending..." defaultValue="My Value" />);
    await userEvent.click(screen.getByTestId('search-button'));
    expect(screen.getByText('Pending...')).toBeInTheDocument();
  });
  it('check is invalid state', () => {
    render(<Search state="invalid" invalidText="Invalid regex" />);
    expect(screen.getByText('Invalid regex')).toBeInTheDocument();
  });
  it('should focus in input after showing', async () => {
    render(<Search />);
    const button = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');
    await userEvent.click(button);
    expect(searchInput).toHaveFocus();
  });
  it.only('should close form when close button is clicked', async () => {
    render(<Search />);
    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');
    const searchForm = screen.getByTestId('search-form');
    await act(() => userEvent.click(searchButton));
    await waitFor(() => expect(screen.queryByTestId('search-close-button')).toBeInTheDocument());
    await new Promise((resolve) => setTimeout(resolve, 2000));
    screen.debug();
    const closeButton = screen.getByTestId('search-close-button');
    expect(closeButton).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
    expect(searchInput).toBeVisible();
    expect(searchInput).toHaveFocus();
    expect(searchForm).toHaveClass(`${px}-search__form--active`);
    await userEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
    expect(searchInput).not.toHaveFocus();
    expect(searchForm).not.toHaveClass(`${px}-search__form--active`);
  });
  it('should close form when esc key is pressed', async () => {
    render(<Search />);
    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');
    const searchForm = screen.getByTestId('search-form');
    await userEvent.click(searchButton);
    const closeButton = screen.getByTestId('search-close-button');
    await userEvent.type(closeButton, '{esc}');
    expect(closeButton).not.toBeInTheDocument();
    expect(searchInput).not.toHaveFocus();
    expect(searchForm).not.toHaveClass(`${px}-search__form--active`);
  });
  it('should reset form when close button is clicked', async () => {
    render(<Search />);
    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');
    await userEvent.click(searchButton);
    expect(searchInput).toHaveFocus();
    await userEvent.keyboard('My Value');
    expect(searchInput).toHaveValue('My Value');
    const closeButton = screen.getByTestId('search-close-button');
    await userEvent.click(closeButton);
    expect(searchInput).toHaveValue('');
  });
  it('should use external search value', async () => {
    render(<Search defaultValue="My Value" />);
    const button = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');
    await userEvent.click(button);
    expect(searchInput).toHaveValue('My Value');
  });
  it('should callback onSearch', async () => {
    const onSearch = vitest.fn();
    render(<Search onSearch={onSearch} />);
    const button = screen.getByTestId('search-button');
    await userEvent.click(button);
    await userEvent.keyboard('My Value');
    expect(onSearch).toHaveBeenCalledWith('My Value');
  });
  describe('allResults', () => {
    it('should render all results link default', async () => {
      render(<Search defaultValue="My Value" />);
      const button = screen.getByTestId('search-button');
      await userEvent.click(button);
      expect(screen.getByRole('link', { name: 'View all results for My Value' })).toHaveAttribute(
        'href',
        '/Search?Search=My%20Value',
      );
    });
    it('should render all results link custom', async () => {
      render(<Search defaultValue="My Value" getAllResultsLink={(value) => `www.example.com?Search=${value}`} />);
      const button = screen.getByTestId('search-button');
      await userEvent.click(button);
      expect(screen.getByRole('link', { name: 'View all results for My Value' })).toHaveAttribute(
        'href',
        'www.example.com?Search=My%20Value',
      );
    });
    it('should render all results text default', async () => {
      render(<Search defaultValue="My Value" />);
      const button = screen.getByTestId('search-button');
      await userEvent.click(button);
      expect(screen.getByRole('link', { name: 'View all results for My Value' })).toBeInTheDocument();
    });
    it('should render all results text custom', async () => {
      render(<Search defaultValue="custom" getAllResultsText={(value) => `my custom text: ${value}`} />);
      const button = screen.getByTestId('search-button');
      await userEvent.click(button);
      expect(screen.getByRole('link', { name: 'my custom text: custom' })).toBeInTheDocument();
    });
  });
  describe('otherCustomText', () => {
    it('should render placeholder', async () => {
      render(<Search defaultValue="My Value" placeholder="My Placeholder" />);
      const button = screen.getByTestId('search-button');
      await userEvent.click(button);
      expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'My Placeholder');
    });
    it('should render searchButtonText', () => {
      render(<Search defaultValue="My Value" searchButtonText="My Search Button" />);
      expect(screen.getByRole('button', { name: 'My Search Button' })).toBeInTheDocument();
    });
  });
});
