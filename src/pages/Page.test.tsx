import { render, screen } from '@testing-library/react';
import Page from './Page';

test('renders the page title', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { level: 2, name: /Pages in Storybook/i })).toBeInTheDocument();
});

test('renders unordered list items', () => {
  render(<Page />);
  expect(screen.getByText(/Use a higher-level connected component/i)).toBeInTheDocument();
  expect(screen.getByText(/Assemble data in the page component from your services/i)).toBeInTheDocument();
});

test('renders links with correct hrefs', () => {
  render(<Page />);
  expect(screen.getByRole('link', { name: /component-driven/i })).toHaveAttribute(
    'href',
    'https://componentdriven.org',
  );
  expect(screen.getByRole('link', { name: /Storybook tutorials/i })).toHaveAttribute(
    'href',
    'https://storybook.js.org/tutorials/',
  );
  expect(screen.getByRole('link', { name: /docs/i })).toHaveAttribute('href', 'https://storybook.js.org/docs');
});
