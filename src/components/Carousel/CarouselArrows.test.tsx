import { render, screen, fireEvent } from '@testing-library/react';
import CarouselArrows from './CarouselArrows';
import { useCarousel } from './utils';
import { vi, Mock } from 'vitest';

vi.mock('./utils', () => ({
  useCarousel: vi.fn(),
}));

describe('CarouselArrows', () => {
  it('adds always-visible class to prev and next arrows when areArrowsAlwaysVisible is true', () => {
    render(<CarouselArrows areArrowsAlwaysVisible={true} />);
    const prevArrow = screen.getByTestId('prev-arrow');
    const nextArrow = screen.getByTestId('next-arrow');
    expect(prevArrow.className).toMatch(/--always-visible/);
    expect(nextArrow.className).toMatch(/--always-visible/);
  });
  const mockScrollPrev = vi.fn();
  const mockScrollNext = vi.fn();
  const mockScrollTo = vi.fn();
  const mockCanScrollPrev = vi.fn();
  const mockCanScrollNext = vi.fn();
  const mockOn = vi.fn();

  beforeEach(() => {
    (useCarousel as Mock).mockReturnValue({
      api: {
        scrollPrev: mockScrollPrev,
        scrollNext: mockScrollNext,
        canScrollPrev: mockCanScrollPrev,
        canScrollNext: mockCanScrollNext,
        on: mockOn,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<CarouselArrows />);
    expect(screen.getByTestId('prev-arrow')).toBeInTheDocument();
    expect(screen.getByTestId('next-arrow')).toBeInTheDocument();
  });

  it('calls scrollPrev on prev arrow click', () => {
    (useCarousel as Mock).mockReturnValue({
      api: {
        slidesInView: () => [0],
        scrollPrev: mockScrollPrev,
        scrollNext: mockScrollNext,
        canScrollPrev: mockCanScrollPrev,
        canScrollNext: mockCanScrollNext,
        on: mockOn,
      },
    });
    render(<CarouselArrows />);
    fireEvent.click(screen.getByTestId('prev-arrow'));
    expect(mockScrollPrev).toHaveBeenCalledWith(true);
  });

  it('calls scrollNext on next arrow click', () => {
    (useCarousel as Mock).mockReturnValue({
      api: {
        slidesInView: () => [0],
        scrollPrev: mockScrollPrev,
        scrollNext: mockScrollNext,
        canScrollPrev: mockCanScrollPrev,
        canScrollNext: mockCanScrollNext,
        on: mockOn,
      },
    });
    render(<CarouselArrows />);
    fireEvent.click(screen.getByTestId('next-arrow'));
    expect(mockScrollNext).toHaveBeenCalledWith(true);
  });

  it('does not call scrollPrev if api is not available', () => {
    (useCarousel as Mock).mockReturnValue({ api: null });
    render(<CarouselArrows />);
    fireEvent.click(screen.getByTestId('prev-arrow'));
    expect(mockScrollPrev).not.toHaveBeenCalled();
  });

  it('does not call scrollNext if api is not available', () => {
    (useCarousel as Mock).mockReturnValue({ api: null });
    render(<CarouselArrows />);
    fireEvent.click(screen.getByTestId('next-arrow'));
    expect(mockScrollNext).not.toHaveBeenCalled();
  });

  it('scrolls to previous page when multiple slides are in view for prev arrow', () => {
    (useCarousel as Mock).mockReturnValue({
      api: {
        slidesInView: () => [2, 3, 4],
        scrollPrev: mockScrollPrev,
        scrollNext: mockScrollNext,
        scrollTo: mockScrollTo,
        canScrollPrev: mockCanScrollPrev,
        canScrollNext: mockCanScrollNext,
        on: mockOn,
      },
    });
    render(<CarouselArrows />);
    fireEvent.click(screen.getByTestId('prev-arrow'));
    expect(mockScrollTo).toHaveBeenCalledWith(0);
  });

  it('scrolls to next page when multiple slides are in view for next arrow', () => {
    (useCarousel as Mock).mockReturnValue({
      api: {
        slidesInView: () => [2, 3, 4],
        scrollPrev: mockScrollPrev,
        scrollNext: mockScrollNext,
        scrollTo: mockScrollTo,
        canScrollPrev: mockCanScrollPrev,
        canScrollNext: mockCanScrollNext,
        on: mockOn,
      },
    });
    render(<CarouselArrows />);
    fireEvent.click(screen.getByTestId('next-arrow'));
    expect(mockScrollTo).toHaveBeenCalledWith(5);
  });

  it('adds disabled class to prev button when canScrollPrev returns false', () => {
    mockCanScrollPrev.mockReturnValue(false);
    mockCanScrollNext.mockReturnValue(true);

    render(<CarouselArrows />);

    const prevArrow = screen.getByTestId('prev-arrow');
    expect(prevArrow.className).toContain('seldon-carousel-arrows-prev-btn--disabled');
  });

  it('does not add disabled class to prev button when canScrollPrev returns true', () => {
    mockCanScrollPrev.mockReturnValue(true);
    mockCanScrollNext.mockReturnValue(true);

    render(<CarouselArrows />);

    const prevArrow = screen.getByTestId('prev-arrow');
    expect(prevArrow.className).not.toContain('seldon-carousel-arrows-prev-btn--disabled');
  });
});
