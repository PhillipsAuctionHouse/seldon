import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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

  it('goes back when prev arrow is clicked from the first slide (wraps)', () => {
    render(<HeroCarousel slides={SLIDES} autoplayMs={0} />);
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('jumps via pagination dot click', () => {
    render(<HeroCarousel slides={SLIDES} autoplayMs={0} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Slide 3' }));
    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('navigates with left/right arrow keys', () => {
    render(<HeroCarousel slides={SLIDES} autoplayMs={0} />);
    const region = screen.getByLabelText('Hero carousel');
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    let tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('ignores arrow keys when there is only one slide', () => {
    const oneSlide = [SLIDES[0]];
    render(<HeroCarousel slides={oneSlide} autoplayMs={0} />);
    const region = screen.getByLabelText('Hero carousel');
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    expect(screen.queryByRole('tab')).toBeNull();
  });

  it('returns null with zero slides', () => {
    const { container } = render(<HeroCarousel slides={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a slide as a plain link when no auction card is present', () => {
    render(
      <HeroCarousel
        slides={[{ key: 'k', imageSrc: '/x.jpg', href: '/dest' }]}
        autoplayMs={0}
      />
    );
    expect(document.querySelector('a[href="/dest"]')).not.toBeNull();
  });
});
