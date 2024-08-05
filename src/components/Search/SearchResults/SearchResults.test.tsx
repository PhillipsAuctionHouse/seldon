import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  it('renders loading message when results are pending', () => {
    render(<SearchResults resultsPending={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders search results when autoCompleteResults are provided', () => {
    const autoCompleteResults = [
      { id: '1', url: '/page1', label: 'Page 1' },
      { id: '2', url: '/page2', label: 'Page 2' },
    ];
    render(<SearchResults autoCompleteResults={autoCompleteResults} />);
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });

  it('renders children components', () => {
    render(
      <SearchResults>
        <li>Child Component 1</li>
        <li>Child Component 2</li>
      </SearchResults>,
    );
    expect(screen.getByText('Child Component 1')).toBeInTheDocument();
    expect(screen.getByText('Child Component 2')).toBeInTheDocument();
  });
});
