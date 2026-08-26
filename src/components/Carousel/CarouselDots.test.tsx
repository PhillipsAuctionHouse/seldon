import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useEffect } from 'react';
import { Mock, vi } from 'vitest';
import CarouselDots from './CarouselDots';
import { useCarousel } from './utils';

vi.mock('./utils', () => ({
  useCarousel: vi.fn(),
}));

// Mirrors how a naive `useInView` mock re-fires `onChange` whenever its
// identity changes between renders — the same shape of mock that let this
// loop hide in Remix's tests. A stable, idempotent `onInViewChange` must
// settle under this; a fresh inline callback recreated every render will not.
vi.mock('react-intersection-observer', () => ({
  useInView: ({ onChange }: { onChange?: (inView: boolean) => void }) => {
    useEffect(() => {
      onChange?.(true);
    }, [onChange]);
    return { ref: vi.fn() };
  },
}));

describe('CarouselDots', () => {
  const baseProps = {
    id: 'test-carousel-dots',
    numberOfSlides: 3,
    maxDots: 3,
    className: '',
  };

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

  it('renders the correct number of dots', () => {
    render(<CarouselDots {...baseProps} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('renders a selected dot', () => {
    render(<CarouselDots {...baseProps} />);
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
  });

  it('applies position class for position="on-content"', () => {
    render(<CarouselDots {...baseProps} position="on-content" />);
    const dotsRoot = screen.getByRole('group', { name: 'pagination' });
    expect(dotsRoot.className).toMatch(/-on-content$/);
  });

  it('applies position class for position="inline" (default)', () => {
    render(<CarouselDots {...baseProps} />);
    const dotsRoot = screen.getByRole('group', { name: 'pagination' });
    expect(dotsRoot.className).toMatch(/-inline$/);
  });

  it('uses default maxDots (9) and position (inline) when omitted', () => {
    render(<CarouselDots id="minimal-dots" numberOfSlides={1} />);
    const dotsRoot = screen.getByRole('group', { name: 'pagination' });
    expect(dotsRoot).toBeInTheDocument();
    expect(dotsRoot.className).toMatch(/-inline$/);
  });

  it('forwards the clicked dot to scrollTo and notifies onSlideChange', () => {
    render(<CarouselDots {...baseProps} />);

    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(mockScrollTo).toHaveBeenCalledWith(2);
    expect(mockOnSlideChange).toHaveBeenCalledWith(2);
  });

  it('does not enter an infinite update loop when a dot repeatedly reports the same inView state', () => {
    // Regression for a "Maximum update depth exceeded" loop: previously
    // setInViewDots/setScrollSnaps always allocated new arrays, so a dot
    // re-firing onChange(true) (e.g. on every re-render, as observed in
    // jsdom) never let React bail out of re-rendering.
    expect(() => render(<CarouselDots {...baseProps} />)).not.toThrow();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
});
