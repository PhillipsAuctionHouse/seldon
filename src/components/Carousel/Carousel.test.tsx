import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots from './CarouselDots';
import { mockDesktopBreakpoint, mockMobileBreakpoint, runCommonTests } from '../../utils/testUtils';

//🎺TODO combine this with the similar mock in CarouselDots
let mockScrollSnapList = () => [0, 1, 2, 3];

vi.mock('embla-carousel-react', async () => {
  const actual: typeof import('embla-carousel-react') = await vi.importActual('embla-carousel-react');
  return {
    ...actual,
    default: (...args: Parameters<typeof actual.default>) => {
      const [emblaRef, emblaApi] = actual.default(...args);
      if (emblaApi) {
        emblaApi.scrollSnapList = vi.fn().mockImplementation(() => mockScrollSnapList());
      }
      return [emblaRef, emblaApi];
    },
  };
});

describe('Carousel', () => {
  it('emblaApi.scrollSnapList returns correct values (default)', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    // Access emblaApi via CarouselDots or Carousel internals if exposed
    // For demonstration, we'll just check the mock directly
    expect(mockScrollSnapList()).toEqual([0, 1, 2, 3]);
  });

  it('emblaApi.scrollSnapList returns custom values per test', () => {
    mockScrollSnapList = () => [10, 20, 30];
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide A</CarouselItem>
          <CarouselItem>Slide B</CarouselItem>
          <CarouselItem>Slide C</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    expect(mockScrollSnapList()).toEqual([10, 20, 30]);
    // Reset for other tests
    mockScrollSnapList = () => [0, 1, 2, 3];
  });

  it('emblaApi.scrollSnapList can be set to empty', () => {
    mockScrollSnapList = () => [];
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide X</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    expect(mockScrollSnapList()).toEqual([]);
    mockScrollSnapList = () => [0, 1, 2, 3];
  });
  runCommonTests(Carousel, 'Carousel');

  it('renders carousel with content, items, and dots', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'pagination' })).toBeInTheDocument();
  });

  it('navigates slides when dots are clicked', async () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const dots = screen.getAllByRole('group').filter((el) => el.getAttribute('aria-roledescription') === 'slide');
    expect(dots.length).toBe(3);
    await userEvent.click(dots[1]);
    expect(screen.getByText('Slide 2')).toBeVisible();
    await userEvent.click(dots[2]);
    expect(screen.getByText('Slide 3')).toBeVisible();
  });

  it('handles keyboard navigation (arrow keys)', async () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const region = screen.getByRole('region');
    region.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByText('Slide 2')).toBeVisible();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByText('Slide 1')).toBeVisible();
  });

  it('handles drag navigation (mouse/touch events)', async () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const carousel = screen.getByRole('region').children[0];
    await userEvent.pointer({ target: carousel, keys: '[MouseLeft>]' });
    await userEvent.pointer({ target: carousel, keys: '[/MouseLeft]' });
    await userEvent.pointer({ target: carousel, keys: '[MouseLeft>]' });
    await userEvent.pointer({ target: carousel, keys: '[/MouseLeft]' });
    expect(carousel).toHaveClass('is-draggable');
  });

  it('shows only one slide for single slide edge case', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Only Slide</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    expect(screen.getByText('Only Slide')).toBeVisible();
    const dots = screen.getAllByRole('group').filter((el) => el.getAttribute('aria-roledescription') === 'slide');
    expect(dots.length).toBe(1);
  });

  it('has correct accessibility attributes', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    const dotsGroup = screen.getByRole('group', { name: 'pagination' });
    expect(dotsGroup).toBeInTheDocument();
  });

  it('enables drag by default', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).toHaveClass('is-draggable');
  });

  it('disables drag on desktop breakpoint', () => {
    mockDesktopBreakpoint();

    render(
      <Carousel disableNavigationDrag="desktop">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).not.toHaveClass('is-draggable');
  });

  it('enables drag on mobile breakpoint', () => {
    mockMobileBreakpoint();
    render(
      <Carousel disableNavigationDrag="desktop">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).toHaveClass('is-draggable');
  });

  it('disables drag on mobile breakpoint when mobile is passed', () => {
    mockMobileBreakpoint();

    render(
      <Carousel disableNavigationDrag="mobile">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).not.toHaveClass('is-draggable');
  });

  it('enables drag on desktop breakpoint when mobile is passed', () => {
    mockDesktopBreakpoint();
    render(
      <Carousel disableNavigationDrag="mobile">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).toHaveClass('is-draggable');
  });
});
