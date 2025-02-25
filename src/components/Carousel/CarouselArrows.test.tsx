import { render, screen, fireEvent } from '@testing-library/react';
import CarouselArrows from './CarouselArrows';
import { useCarousel } from './utils';
import { vi, Mock } from 'vitest';

vi.mock('./utils', () => ({
  useCarousel: vi.fn(),
}));

describe('CarouselArrows', () => {
  const mockScrollPrev = vi.fn();
  const mockScrollNext = vi.fn();

  beforeEach(() => {
    (useCarousel as Mock).mockReturnValue({
      api: {
        scrollPrev: mockScrollPrev,
        scrollNext: mockScrollNext,
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
    render(<CarouselArrows />);
    fireEvent.click(screen.getByTestId('prev-arrow'));
    expect(mockScrollPrev).toHaveBeenCalledWith(true);
  });

  it('calls scrollNext on next arrow click', () => {
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
});
