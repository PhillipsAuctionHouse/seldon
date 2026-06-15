import { fireEvent, render, screen } from '@testing-library/react';
import CarouselDots from './CarouselDots';
import { useCarousel } from './utils';
import { Mock, vi } from 'vitest';

vi.mock('./utils', () => ({
  useCarousel: vi.fn(),
}));

vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn() }),
}));

describe('CarouselDots navigation', () => {
  const mockScrollTo = vi.fn();
  const mockOnSlideChange = vi.fn();

  const mockApi = {
    scrollTo: mockScrollTo,
    scrollSnapList: () => [0, 1, 2],
    selectedScrollSnap: () => 0,
    on: vi.fn().mockReturnThis(),
    off: vi.fn().mockReturnThis(),
  };

  beforeEach(() => {
    (useCarousel as Mock).mockReturnValue({
      api: mockApi,
      onSlideChange: mockOnSlideChange,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('jumps instantly by default when a dot is clicked', () => {
    render(<CarouselDots id="test-carousel-dots" numberOfSlides={3} />);

    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(mockScrollTo).toHaveBeenCalledWith(2, true);
    expect(mockOnSlideChange).toHaveBeenCalledWith(2);
  });

  it('animates when carousel navigation animation is enabled', () => {
    (useCarousel as Mock).mockReturnValue({
      api: mockApi,
      onSlideChange: mockOnSlideChange,
      shouldAnimateNavigation: true,
    });
    render(<CarouselDots id="test-carousel-dots" numberOfSlides={3} />);

    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(mockScrollTo).toHaveBeenCalledWith(2, false);
  });
});
