import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeroCarousel from './HeroCarousel';

const SLIDES = [
  {
    key: 'a',
    imageSrc: '/a.jpg',
    auctionCard: {
      saleTypeLabel: 'Live Auction',
      title: 'Slide A title',
      primaryCta: { label: 'Browse', href: '/browse-a' },
    },
  },
  { key: 'b', imageSrc: '/b.jpg', auctionCard: { title: 'Slide B title' } },
  { key: 'c', imageSrc: '/c.jpg', auctionCard: { title: 'Slide C title' } },
];

describe('HeroCarousel', () => {
  it('renders all slides, marking the first as active by default', () => {
    render(<HeroCarousel slides={SLIDES} autoplayMs={0} />);
    expect(screen.getByText('Slide A title')).toBeInTheDocument();
    expect(screen.getByText('Slide B title')).toBeInTheDocument();
    expect(screen.getByText('Slide C title')).toBeInTheDocument();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('advances when next arrow is clicked', () => {
    render(<HeroCarousel slides={SLIDES} autoplayMs={0} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('jumps via pagination dot click', () => {
    render(<HeroCarousel slides={SLIDES} autoplayMs={0} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Slide 3' }));
    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('returns null with zero slides', () => {
    const { container } = render(<HeroCarousel slides={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
