import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { px } from '../../utils';
import { runCommonTests } from '../../utils/testUtils';

describe('Search component', () => {
  runCommonTests((props) => <Search {...props} />, 'Search');

  it('should toggle overlay when button is clicked', async () => {
    const { getByTestId } = render(<Search />);
    const button = getByTestId('search-button');
    const overlay = getByTestId('search-overlay');

    expect(overlay).not.toHaveClass(`${px}-search__overlay--active`);

    await userEvent.click(button);

    expect(overlay).toHaveClass(`${px}-search__overlay--active`);

    await userEvent.click(button);

    expect(overlay).not.toHaveClass(`${px}-search__overlay--active`);
  });

  it('should render search button with icon when useIcon is true', () => {
    const { getByTestId } = render(<Search useIcon={true} />);
    const button = getByTestId('search-button');
    const icon = getByTestId('search-button-icon');

    expect(button).toContainElement(icon);
  });

  it('should render search button without icon when useIcon is false', () => {
    const { getByTestId, queryByTestId } = render(<Search useIcon={false} />);
    const button = getByTestId('search-button');
    const icon = queryByTestId('search-button-icon');

    expect(button).not.toContainElement(icon);
  });

  it('should render search input with icon when useIcon is true', () => {
    const { getByTestId } = render(<Search useIcon={true} />);
    const input = getByTestId('search-form');
    const icon = getByTestId('search-form-icon');

    expect(input).toContainElement(icon);
  });

  it('should render search input without icon when useIcon is false', () => {
    const { getByTestId, queryByTestId } = render(<Search useIcon={false} />);
    const input = getByTestId('search-form');
    const icon = queryByTestId('search-form-icon');

    expect(input).not.toContainElement(icon);
  });
  it('check is loading state', async () => {
    render(<Search state="loading" loadingText="Pending..." defaultValue="My Value" />);
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('Pending...')).toBeInTheDocument();
  });
  it('check is invalid state', () => {
    render(<Search state="invalid" invalidText="Invalid regex" />);
    expect(screen.getByText('Invalid regex')).toBeInTheDocument();
  });
  it('should focus in input after showing', async () => {
    render(<Search />);
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveFocus();
  });
  it('should use external search value', async () => {
    render(<Search defaultValue="My Value" />);
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('My Value');
  });
  it('should use external search value', async () => {
    render(<Search defaultValue="My Value" />);
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('My Value');
  });
  it('should callback onSearch', async () => {
    const onSearch = vitest.fn();
    render(<Search onSearch={onSearch} />);
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    await userEvent.keyboard('My Value');
    expect(onSearch).toHaveBeenCalledWith('My Value');
  });
  describe('allResults', () => {
    it('should render all results link default', async () => {
      render(<Search defaultValue="My Value" />);
      const button = screen.getByRole('button', { name: 'Search' });
      await userEvent.click(button);
      expect(screen.getByRole('link', { name: 'View all results for My Value' })).toHaveAttribute(
        'href',
        '/Search?Search=My%20Value',
      );
    });
    it('should render all results link custom', async () => {
      render(<Search defaultValue="My Value" getAllResultsLink={(value) => `www.cnn.com?Search=${value}`} />);
      const button = screen.getByRole('button', { name: 'Search' });
      await userEvent.click(button);
      expect(screen.getByRole('link', { name: 'View all results for My Value' })).toHaveAttribute(
        'href',
        'www.cnn.com?Search=My%20Value',
      );
    });
    it('should render all results text default', async () => {
      render(<Search defaultValue="My Value" />);
      const button = screen.getByRole('button', { name: 'Search' });
      await userEvent.click(button);
      expect(screen.getByRole('link', { name: 'View all results for My Value' })).toBeInTheDocument();
    });
    it('should render all results text custom', async () => {
      render(<Search defaultValue="custom" getAllResultsText={(value) => `my custom text: ${value}`} />);
      const button = screen.getByRole('button', { name: 'Search' });
      await userEvent.click(button);
      expect(screen.getByRole('link', { name: 'my custom text: custom' })).toBeInTheDocument();
    });
  });
  describe('otherCustomText', () => {
    it('should render placeholder', async () => {
      render(<Search defaultValue="My Value" placeholder="My Placeholder" />);
      const button = screen.getByRole('button', { name: 'Search' });
      await userEvent.click(button);
      expect(screen.getByRole('textbox', { name: 'Search' })).toHaveAttribute('placeholder', 'My Placeholder');
    });
    it('should render searchButtonText', () => {
      render(<Search defaultValue="My Value" searchButtonText="My Search Button" />);
      expect(screen.getByRole('button', { name: 'My Search Button' })).toBeInTheDocument();
    });
  });
});
