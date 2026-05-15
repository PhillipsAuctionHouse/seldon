import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MediaCard from './MediaCard';

describe('MediaCard', () => {
  it('renders eyebrow, title, meta, and links the entire card', () => {
    render(
      <MediaCard
        href="/v1"
        imageSrc="https://example.com/thumb.jpg"
        eyebrow="Modern & Contemporary Art"
        title="Gallery Tour | London"
        meta="May 2026"
        showPlayOverlay
      />,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/v1');
    expect(screen.getByText('Modern & Contemporary Art')).toBeInTheDocument();
    expect(screen.getByText('Gallery Tour | London')).toBeInTheDocument();
    expect(screen.getByText('May 2026')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/thumb.jpg');
  });

  it('omits the play overlay when showPlayOverlay is false', () => {
    const { container } = render(<MediaCard href="/v1" title="t" />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
