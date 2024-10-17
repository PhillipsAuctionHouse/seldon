import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

const showSearchResultsMock = vi.fn();
const autoCompleteResults = [
  { id: '1', url: '#', label: 'Page 1' },
  { id: '2', url: '#', label: 'Page 2' },
];
describe('SearchResults', () => {
  it('renders loading message when results are pending', () => {
    render(<SearchResults isLoading={true} showSearchResults={showSearchResultsMock} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders search results when autoCompleteResults are provided', () => {
    render(<SearchResults autoCompleteResults={autoCompleteResults} showSearchResults={showSearchResultsMock} />);
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });

  it('renders children components', () => {
    render(
      <SearchResults showSearchResults={showSearchResultsMock}>
        <li>Child Component 1</li>
        <li>Child Component 2</li>
      </SearchResults>,
    );
    expect(screen.getByText('Child Component 1')).toBeInTheDocument();
    expect(screen.getByText('Child Component 2')).toBeInTheDocument();
  });
});
it('renders custom loading text when provided', () => {
  render(<SearchResults isLoading={true} loadingText="Please wait..." showSearchResults={showSearchResultsMock} />);
  expect(screen.getByText('Please wait...')).toBeInTheDocument();
});

it('calls showSearchResults with false when a result is clicked', () => {
  render(<SearchResults autoCompleteResults={autoCompleteResults} showSearchResults={showSearchResultsMock} />);
  screen.getByText('Page 1').click();
  expect(showSearchResultsMock).toHaveBeenCalledWith(false);
});

it('formats search label correctly based on user input', () => {
  const autoCompleteResult = [{ id: '1', url: '/page1', label: 'Page 1' }];
  render(
    <SearchResults
      autoCompleteResults={autoCompleteResult}
      userInputValue="Page"
      showSearchResults={showSearchResultsMock}
    />,
  );
  expect(screen.getByTestId('search-result-1').innerHTML).toContain('<strong>Page</strong> 1');
});
