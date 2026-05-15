import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ImageBanner from './ImageBanner';

describe('ImageBanner', () => {
  it('renders wordmark, tagline lines, and button inside the link when href is set', () => {
    render(
      <ImageBanner
        href="https://dropshop.example.com"
        wordmark="DROPSHOP"
        tagline={`Exclusive Drops\nBy Creators. For Collectors.`}
        buttonLabel="Discover"
      />,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://dropshop.example.com');
    expect(link).toHaveTextContent('DROPSHOP');
    expect(link).toHaveTextContent(/Exclusive Drops/);
    expect(link).toHaveTextContent(/By Creators\. For Collectors\./);
    expect(screen.getByText('Discover')).toBeInTheDocument();
  });

  it('renders without a link wrapper when href is omitted', () => {
    const { container } = render(<ImageBanner wordmark="HERO" />);
    expect(container.querySelector('a')).toBeNull();
    expect(screen.getByText('HERO')).toBeInTheDocument();
  });
});
