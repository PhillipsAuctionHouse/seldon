import { render, screen } from '@testing-library/react';
import Article from './Article';
import { Link } from '../Link';
import { runCommonTests } from '../../utils/testUtils';

describe('Article', () => {
  runCommonTests(Article, 'Article');

  it('renders correctly with all props', () => {
    render(
      <Article
        imageSrc="test-image.jpg"
        label="Test Label"
        header="Test Header"
        description="Test Description"
        linkElement={Link}
        linkLabel="Test Link"
        linkHref="https://example.com"
      />,
    );

    expect(screen.getByAltText('bull')).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Link').parentElement?.parentElement).toHaveAttribute('href', 'https://example.com');
  });

  it('renders correctly without optional props', () => {
    render(<Article header="Test Header" />);

    expect(screen.queryByAltText('bull')).toBeNull();
    expect(screen.queryByText('Test Label')).toBeNull();
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).toBeNull();
    expect(screen.queryByText('Test Link')).toBeNull();
  });
});
