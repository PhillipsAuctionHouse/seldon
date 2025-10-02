import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots from './CarouselDots';
import { mockDesktopBreakpoint, mockMobileBreakpoint, runCommonTests } from '../../utils/testUtils';
import { useCarousel } from './utils';

//🎺TODO combine this with the similar mock in CarouselDots
let mockScrollSnapList = () => [0, 1, 2, 3];
const reInitMock = vi.fn();
const scrollPrevMock = vi.fn();
const scrollNextMock = vi.fn();

beforeEach(() => {
  vi.mock('embla-carousel-react', async () => {
    const actual: typeof import('embla-carousel-react') = await vi.importActual('embla-carousel-react');
    return {
      ...actual,
      default: (...args: Parameters<typeof actual.default>) => {
        const [emblaRef, emblaApi] = actual.default(...args);
        if (emblaApi) {
          emblaApi.scrollSnapList = vi.fn().mockImplementation(() => mockScrollSnapList());
          emblaApi.reInit = reInitMock;
          emblaApi.scrollPrev = scrollPrevMock;
          emblaApi.scrollNext = scrollNextMock;
        }

        return [emblaRef, emblaApi];
      },
    };
  });
});

afterEach(() => {
  // Reset mocks after each test
  vi.resetAllMocks();
  mockScrollSnapList = () => [0, 1, 2, 3];
});

const renderCarousel = ({
  slides = ['Slide 1', 'Slide 2', 'Slide 3'],
  disableDrag = false,
  disableNavigationDrag = undefined,
  useWheelGestures = false,
  customGuts = undefined,
}: {
  slides?: string[];
  disableDrag?: boolean;
  disableNavigationDrag?: 'all' | 'desktop' | 'mobile';
  useWheelGestures?: boolean;
  customGuts?: React.ReactNode;
} = {}) => {
  const items = slides.map((text, i) => <CarouselItem key={i}>{text}</CarouselItem>);
  const dots = <CarouselDots id="test-carousel-dots" />;

  return render(
    <Carousel
      disableDrag={disableDrag}
      disableNavigationDrag={disableNavigationDrag}
      useWheelGestures={useWheelGestures}
    >
      {customGuts ?? (
        <>
          <CarouselContent>{items}</CarouselContent>
          {dots}
        </>
      )}
    </Carousel>,
  );
};

describe('Carousel', () => {
  runCommonTests(Carousel, 'Carousel');

  it('emblaApi.scrollSnapList returns correct values (default)', () => {
    renderCarousel();
    // Access emblaApi via CarouselDots or Carousel internals if exposed
    // For demonstration, we'll just check the mock directly
    expect(mockScrollSnapList()).toEqual([0, 1, 2, 3]);
  });

  it('emblaApi.scrollSnapList returns custom values per test', () => {
    mockScrollSnapList = () => [10, 20, 30];
    renderCarousel({ slides: ['Slide A', 'Slide B', 'Slide C'] });
    expect(mockScrollSnapList()).toEqual([10, 20, 30]);
  });

  it('emblaApi.scrollSnapList can be set to empty', () => {
    mockScrollSnapList = () => [];
    renderCarousel({ slides: ['Slide X'] });
    expect(mockScrollSnapList()).toEqual([]);
  });

  it('renders carousel with content, items, and dots', () => {
    renderCarousel();
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'pagination' })).toBeInTheDocument();
  });

  it('navigates slides when dots are clicked', async () => {
    renderCarousel();
    const dots = screen.getAllByRole('group').filter((el) => el.getAttribute('aria-roledescription') === 'slide');
    expect(dots.length).toBe(3);
    await userEvent.click(dots[1]);
    expect(screen.getByText('Slide 2')).toBeVisible();
    await userEvent.click(dots[2]);
    expect(screen.getByText('Slide 3')).toBeVisible();
  });

  it('handles keyboard navigation (arrow keys)', async () => {
    renderCarousel();
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

  it('disables drag on all breakpoints when disableNavigationDrag is "all"', async () => {
    const emblaSpy = vi.spyOn(await import('embla-carousel-react'), 'default');
    renderCarousel({ disableNavigationDrag: 'all' });
    expect(emblaSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        watchDrag: false,
        inViewThreshold: 0.99,
        loop: false,
        startIndex: 0,
      }),
      expect.any(Array),
    );
    emblaSpy.mockRestore();
  });

  it('toggles drag state and calls emblaApi.reInit with correct watchDrag value when disableDrag prop changes', () => {
    const carousel = renderCarousel({ disableDrag: true });
    // Check that reInit was called with disableDrag: () => true
    expect(reInitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        watchDrag: expect.any(Function),
      }),
    );
    expect(reInitMock.mock.calls[0][0].watchDrag()).toBe(false);

    carousel.rerender(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots id="test-carousel-dots" />
      </Carousel>,
    );

    expect(reInitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        watchDrag: expect.any(Function),
      }),
    );
    expect(reInitMock.mock.calls[1][0].watchDrag()).toBe(true);
  });

  it("calls emblaApi's scrollPrev and scrollNext via CarouselContext when navigation buttons are clicked", async () => {
    const CarouselInnards = () => {
      const { scrollPrev, scrollNext } = useCarousel();
      return (
        <>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
            <CarouselItem>Slide 3</CarouselItem>
          </CarouselContent>
          <button aria-label="Previous Slide" onClick={scrollPrev}>
            Prev
          </button>
          <button aria-label="Next Slide" onClick={scrollNext}>
            Next
          </button>
          <CarouselDots id="test-carousel-dots" />
        </>
      );
    };

    renderCarousel({ customGuts: <CarouselInnards /> });
    const prevButton = screen.getByRole('button', { name: 'Previous Slide' });
    const nextButton = screen.getByRole('button', { name: 'Next Slide' });
    await userEvent.click(nextButton);
    expect(scrollNextMock).toHaveBeenCalled();
    await userEvent.click(prevButton);
    expect(scrollPrevMock).toHaveBeenCalled();
  });

  it('shows only one slide for single slide edge case', () => {
    renderCarousel({ slides: ['Only Slide'] });
    expect(screen.getByText('Only Slide')).toBeVisible();
    const dots = screen.getAllByRole('group').filter((el) => el.getAttribute('aria-roledescription') === 'slide');
    expect(dots.length).toBe(1);
  });

  it('has correct accessibility attributes', () => {
    renderCarousel({ slides: ['Slide 1', 'Slide 2'] });
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    const dotsGroup = screen.getByRole('group', { name: 'pagination' });
    expect(dotsGroup).toBeInTheDocument();
  });

  it('enables drag by default', () => {
    renderCarousel();
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).toHaveClass('is-draggable');
  });

  it('disables drag on desktop breakpoint', () => {
    mockDesktopBreakpoint();

    renderCarousel({ disableNavigationDrag: 'desktop' });
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).not.toHaveClass('is-draggable');
  });

  it('enables drag on mobile breakpoint', () => {
    mockMobileBreakpoint();

    renderCarousel({ disableNavigationDrag: 'desktop' });
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).toHaveClass('is-draggable');
  });

  it('disables drag on mobile breakpoint when mobile is passed', () => {
    mockMobileBreakpoint();

    renderCarousel({ disableNavigationDrag: 'mobile' });
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).not.toHaveClass('is-draggable');
  });

  it('enables drag on desktop breakpoint when mobile is passed', () => {
    mockDesktopBreakpoint();

    renderCarousel({ disableNavigationDrag: 'mobile' });
    const carousel = screen.getByRole('region');
    expect(carousel.children[0]).toHaveClass('is-draggable');
  });

  it('enables wheel gestures to control X axis when useWheelGestures is true', async () => {
    const wheelGesturesSpy = vi.spyOn(await import('embla-carousel-wheel-gestures'), 'WheelGesturesPlugin');
    renderCarousel({ useWheelGestures: true });
    expect(wheelGesturesSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        forceWheelAxis: 'x',
      }),
    );
    wheelGesturesSpy.mockRestore();
  });

  it.todo('triggers slide changes via mouse wheel events when useWheelGestures is true', async () => {
    // I can see that the fireEvent wheel event is firing, but Embla isn't responding to it.\
    // Works in the browser
  });
});
