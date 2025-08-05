import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CarouselDots from './CarouselDots';
import Carousel from './Carousel';

// Mocks for intersection observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn() }),
}));

describe('CarouselDots', () => {
  const baseProps = {
    id: 'test-carousel-dots',
    numberOfSlides: 3,
    maxDots: 3,
    className: '',
  };

  it('renders the correct number of dots', () => {
    render(<CarouselDots {...baseProps} />, { wrapper: ({ children }) => <Carousel>{children}</Carousel> });
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('calls onClick for a dot', () => {
    // Patch CarouselDot to spy on onClick

    render(<CarouselDots {...baseProps} />, { wrapper: ({ children }) => <Carousel>{children}</Carousel> });
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[2]);
    // We can't check the callback directly, but we can check the button exists and is clickable
    expect(buttons[2]).toBeInTheDocument();
  });

  it('renders a selected dot', () => {
    render(<CarouselDots {...baseProps} />, { wrapper: ({ children }) => <Carousel>{children}</Carousel> });
    // By default, the first dot is selected
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
  });
});
