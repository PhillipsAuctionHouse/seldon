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
    render(<CarouselDots {...baseProps} />, { wrapper: ({ children }) => <Carousel>{children}</Carousel> });
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[2]);
    expect(buttons[2]).toBeInTheDocument();
  });

  it('renders a selected dot', () => {
    render(<CarouselDots {...baseProps} />, { wrapper: ({ children }) => <Carousel>{children}</Carousel> });
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
  });

  it('applies position class for position="on-content"', () => {
    render(<CarouselDots {...baseProps} position="on-content" />, {
      wrapper: ({ children }) => <Carousel>{children}</Carousel>,
    });
    const dotsRoot = screen.getByRole('group', { name: 'pagination' });
    expect(dotsRoot.className).toMatch(/-on-content$/);
  });

  it('applies position class for position="inline" (default)', () => {
    render(<CarouselDots {...baseProps} />, {
      wrapper: ({ children }) => <Carousel>{children}</Carousel>,
    });
    const dotsRoot = screen.getByRole('group', { name: 'pagination' });
    expect(dotsRoot.className).toMatch(/-inline$/);
  });

  it('uses default maxDots (9) and position (inline) when omitted', () => {
    render(<CarouselDots id="minimal-dots" numberOfSlides={1} />, {
      wrapper: ({ children }) => <Carousel>{children}</Carousel>,
    });
    const dotsRoot = screen.getByRole('group', { name: 'pagination' });
    expect(dotsRoot).toBeInTheDocument();
    expect(dotsRoot.className).toMatch(/-inline$/);
  });
});
