import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Carousel, { CarouselProps } from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots from './CarouselDots';
import { mockDesktopBreakpoint, mockMobileBreakpoint, runCommonTests } from '../../utils/testUtils';
import { useCarousel } from './utils';
import { mutables, reInitMock, scrollNextMock, scrollPrevMock } from '../../../config/vitest/mockEmblaCarousel';
import { updateInView, getSlides } from './carouselTestUtils';

// globalThis comes from the test environment

// shared helpers initialize DOM mocks and provide intersection helpers

export const beforeEach = () => {
  mutables.scrollSnapList = undefined;
  mutables.selectedScrollSnap = undefined;
  mutables.slidesInView = undefined;
};
type CustomRenderResult = ReturnType<typeof render> & {
  rerenderSame: () => void;
};

const onSlideChangeMock = vi.fn();
type TestCarouselProps = {
  slides?: string[];
  customGuts?: React.ReactNode;
  onSlideChange?: (index: number) => void;
  scrollSnapList?: () => number[];
  slidesInView?: () => number[];
  selectedScrollSnap?: () => number;
} & CarouselProps;

const TestCarousel = ({
  slides = ['Slide 1', 'Slide 2', 'Slide 3'],
  disableDrag = false,
  disableNavigationDrag = null,
  useWheelGestures = false,
  customGuts = undefined,
  onSlideChange = undefined,
}: TestCarouselProps) => {
  const items = slides.map((text, i) => <CarouselItem key={i}>{text}</CarouselItem>);

  const dots = <CarouselDots id="test-carousel-dots" />;
  return (
    <Carousel
      disableDrag={disableDrag}
      disableNavigationDrag={disableNavigationDrag}
      useWheelGestures={useWheelGestures}
      onSlideChange={(args) => {
        onSlideChangeMock(args);
        onSlideChange?.(args);
      }}
    >
      {customGuts ?? (
        <>
          <CarouselContent>{items}</CarouselContent>
          {dots}
        </>
      )}
    </Carousel>
  );
};

const renderCarousel = (props: TestCarouselProps = {}): CustomRenderResult => {
  const rendered = render(<TestCarousel {...props} />) as CustomRenderResult;
  rendered.rerenderSame = () => rendered.rerender(<TestCarousel {...props} />);
  return rendered;
};

// re-exported from emblaTestUtils

describe('Carousel', () => {
  runCommonTests(Carousel, 'Carousel');

  it('emblaApi.scrollSnapList returns custom values', () => {
    mutables.scrollSnapList = () => [10, 20, 30];
    renderCarousel({
      slides: ['Slide A', 'Slide B', 'Slide C'],
    });
    expect(getSlides()).toHaveLength(3);
  });

  it('Carousel can be rendered without an empty scrollSnapList', () => {
    mutables.scrollSnapList = () => [];
    renderCarousel({ slides: ['Slide X'] });
    expect(screen.getAllByText('Slide X')).toHaveLength(1);
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
    renderCarousel();
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
    const slides = getSlides();
    expect(slides.length).toBe(1);
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

  it('calls onSlideChange with correct index when slidesInView fires', () => {
    const r = renderCarousel();
    updateInView(getSlides(), [2]);
    r.rerenderSame();
    expect(onSlideChangeMock).toHaveBeenCalledWith(2);
  });

  it('does not call onSlideChange if slidesInView returns undefined', () => {
    const r = renderCarousel();
    updateInView(getSlides(), [2]);

    r.rerenderSame();
    expect(onSlideChangeMock).toHaveBeenCalledTimes(1);
    onSlideChangeMock.mockClear();
    // @ts-expect-error what makes you think undefined is not an array of numbers? it has limitless potential
    mutables.slidesInView = () => undefined;
    r.rerenderSame();
    expect(onSlideChangeMock).toHaveBeenCalledTimes(0);
  });

  it('does not throw if api is null', () => {
    // @ts-expect-error this certainly would be an error, wouldn't it?
    mutables.actualEmblaApi = null;
    expect(() => {
      renderCarousel({ onSlideChange: () => void 0 });
    }).not.toThrow();
  });

  it.todo('triggers slide changes via mouse wheel events when useWheelGestures is true', async () => {
    // I can see that the fireEvent wheel event is firing, but Embla isn't responding to it.\
    // Works in the browser
  });
});
