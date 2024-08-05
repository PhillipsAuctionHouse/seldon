import { render, screen } from '@testing-library/react';

import { px } from '../../utils';
import HTMLParser from './HTMLParser';
import { runCommonTests } from '../../utils/testUtils';

describe('HTMLParser', () => {
  runCommonTests(HTMLParser, 'HTMLParser', { html: '<h1>Hello, <strong>World!</strong></h1>' });

  it('renders the HTML content with the proper variant', () => {
    const html =
      '<h1>Hello, <strong>World!</strong></h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><blockquote>Blockquote</blockquote>';
    render(<HTMLParser html={html} />);
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toHaveClass(`${px}-text--display1`);
    const h2Element = screen.getByRole('heading', { level: 2 });
    expect(h2Element).toHaveClass(`${px}-text--heading2`);
    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element).toHaveClass(`${px}-text--heading3`);
    const h4Element = screen.getByRole('heading', { level: 4 });
    expect(h4Element).toHaveClass(`${px}-text--heading4`);
    const blockquoteElement = screen.getByText('Blockquote');
    expect(blockquoteElement).toHaveClass(`${px}-text--blockquote`);
  });

  it('sanitizes the HTML content', () => {
    const html = '<div data-testid="cleanHTML"><script>alert("Hello, World!")</script></div>';
    render(<HTMLParser html={html} />);
    const scriptElement = screen.queryByText('Hello, World!');
    const cleanElement = screen.queryByTestId('cleanHTML');
    expect(scriptElement).toBeNull();
    expect(cleanElement).toBeInTheDocument();
    expect(cleanElement?.childElementCount).toBe(0);
  });

  it('renders the sanitized HTML without transforming to use variants when isOnlySanitize is true', () => {
    const html =
      '<h1>Hello, <strong>World!</strong></h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><blockquote>Blockquote</blockquote> <script>alert("Hello, World!")</script>';
    render(<HTMLParser html={html} isOnlySanitize={true} />);
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).not.toHaveClass(`${px}-text--display1`);
    const h2Element = screen.getByRole('heading', { level: 2 });
    expect(h2Element).not.toHaveClass(`${px}-text--heading2`);
    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element).not.toHaveClass(`${px}-text--heading3`);
    const h4Element = screen.getByRole('heading', { level: 4 });
    expect(h4Element).not.toHaveClass(`${px}-text--heading4`);
    const blockquoteElement = screen.getByText('Blockquote');
    expect(blockquoteElement).not.toHaveClass(`${px}-text--blockquote`);
    const scriptElement = screen.queryByText('Hello, World!');
    expect(scriptElement).toBeNull();
  });
});
