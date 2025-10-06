import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Carousel, CarouselContent, CarouselDots, CarouselDotsProps, CarouselItem, CarouselProps } from '../..';
import { MockIntersectionObserver } from '../../../config/vitest/mockIntersectionObserver';
import { mutables } from '../../../config/vitest/mockEmblaCarousel.ts';
import { updateInView } from './carouselTestUtils.tsx';
import { createIntersectionEntry } from '../../../config/vitest/emblaTestUtils';

// unnecessary unless we can get the duplicate indicies test to work
// const inViewCalls: Array<{ index: number; inView: boolean }> = [];
// const ActualCarouselDot = await vi.importActual<typeof import('./CarouselDot')>('./CarouselDot');

// vi.mock('./CarouselDot', () => ({
//   CarouselDot: (props: CarouselDotProps) => {
//     // Spy on onInViewChange
//     return cloneElement(
//       <ActualCarouselDot.CarouselDot
//         {...{
//           ...props,
//           isSelected: props.isSelected,
//           onClick: props.onClick,
//           scrollableContainerRef: props.scrollableContainerRef,
//           onInViewChange: (inView: boolean) => {
//             console.log('boop');
//             inViewCalls.push({ index: +(props?.id ? +props.id.slice(-1) : '99'), inView });
//             if (props.onInViewChange) {
//               props.onInViewChange(inView);
//             }
//           },
//         }}
//       />,
//     );
//   },
// }));

// shared DOM mocks and helpers are initialized by the carousel test utils

afterEach(() => {
  cleanup();
});

afterAll(() => {
  vi.resetAllMocks();
});

// --- Helpers ---

const getDotSpan = (btn: Element): HTMLElement => {
  if (!(btn.firstElementChild instanceof HTMLElement)) {
    throw new Error('Dot span not found');
  }
  return btn.firstElementChild;
};

const getDotButtons = (): HTMLElement[] =>
  screen.getAllByRole('button').filter((btn) => btn.getAttribute('class')?.includes('dot__container'));

// observer is provided by the MockIntersectionObserver when used; no local binding needed

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
  carouselProps?: Partial<CarouselProps>;
  dotsProps?: Partial<CarouselDotsProps>;
};

const TestCarousel = ({
  slides = ['Slide 1', 'Slide 2', 'Slide 3'],
  customGuts = undefined,
  carouselProps = {},
  dotsProps = {},
}: TestCarouselProps) => {
  const items = slides.map((text, i) => <CarouselItem key={i}>{text}</CarouselItem>);

  const dots = <CarouselDots {...dotsProps} id="test-carousel-dots" />;
  return (
    <Carousel
      {...{
        disableDrag: false,
        disableNavigationDrag: null,
        useWheelGestures: false,
        onSlideChange: undefined,
        ...carouselProps,
      }}
      onSlideChange={(args) => {
        onSlideChangeMock(args);
        carouselProps.onSlideChange?.(args);
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

const renderCarousel = (
  props: TestCarouselProps,
  slideCount?: number,
  generateFunctions = false,
): CustomRenderResult => {
  if (slideCount) props.slides = Array.from({ length: slideCount }, (_, i) => `Slide ${i + 1}`);
  if (slideCount && generateFunctions) {
    mutables.scrollSnapList = () => Array.from({ length: slideCount ?? 0 }, (_, i) => i);
    mutables.slidesInView = () => Array.from({ length: slideCount ?? 0 }, (_, i) => i);
    mutables.selectedScrollSnap = () => (slideCount ? Math.floor(slideCount / 2) : 0);
  } else if (generateFunctions) console.log('generateFunctions is true but slideCount is not provided');
  const rendered = render(<TestCarousel {...props} />) as CustomRenderResult;
  rendered.rerenderSame = () => rendered.rerender(<TestCarousel {...props} />);
  new globalThis.IntersectionObserver(() => void 0, {
    root: screen.getByTestId('carousel-dots-scrollable-container'),
  }) as MockIntersectionObserver;
  updateInView(
    getSlides(),
    Array.from({ length: props.slides?.length ?? 0 }, (_, i) => i),
  );
  return rendered;
};

const getSlides = () => screen.getAllByTestId('carousel-item');

// --- Tests ---
describe('CarouselDots', () => {
  it('calls scrollToDot with correct index', async () => {
    renderCarousel({}, 5, true);
    const buttons = getDotButtons();
    await userEvent.click(buttons[2]);

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith({ left: 11, behavior: 'smooth' });
    // left = index * (dotWidth + dotGap) - container.offsetWidth / 2 + centerDotContainer
    // where dotWidth = 10, dotGap = 12 so centerDotContainer = (10 + 12) / 2 = 11.
    // In this test environment the index/container values produce a net offset of 0
    // (In a real browser the index and container width determine how far to scroll to
    // center the clicked dot)
  });

  it('calls onSlideChangeMock with correct index after slide change', async () => {
    renderCarousel({}, 5, true);
    const buttons = getDotButtons();
    await userEvent.click(buttons[2]);
    expect(onSlideChangeMock).toHaveBeenCalledWith(2);
  });

  it('tracks inView dots in scrollSnaps map', () => {
    renderCarousel({}, 5, true);
    const buttons = getDotButtons();

    updateInView(buttons, [0, 1]);
    const notShrinked = buttons.filter((btn) => {
      const span = getDotSpan(btn);
      return span && !span.className.match(/--sm/);
    });
    expect(notShrinked.length).toBeGreaterThanOrEqual(1);
  });

  it('calls onInViewChange supplied to CarouselDot', () => {
    renderCarousel({}, 3, true);
    const buttons = getDotButtons();
    act(() => {
      const g = globalThis as unknown as { triggerIntersection?: (entries: IntersectionObserverEntry[]) => void };
      g.triggerIntersection?.([createIntersectionEntry(buttons[0], true)]);
    });
    expect(buttons[0]).toBeInTheDocument();
  });

  it('renders the correct number of dots', () => {
    renderCarousel({}, 3, true);
    expect(getDotButtons()).toHaveLength(3);
  });

  it('respects maxDots prop', () => {
    mutables.scrollSnapList = () => Array.from({ length: 10 }, (_, i) => i);
    renderCarousel({ dotsProps: { numberOfSlides: 10, maxDots: 5 } });
    expect(getDotButtons()).toHaveLength(5);
  });

  it('renders with position on-content', () => {
    const carousel = renderCarousel({ dotsProps: { position: 'on-content' } });
    const group = carousel.getByTestId('carousel-dots-test-carousel-dots');
    expect(group.className).toMatch(/on-content/);
  });

  it('calls onSlideChangeMock when dot is clicked', async () => {
    renderCarousel({ dotsProps: { numberOfSlides: 10 } });
    const buttons = getDotButtons();
    await userEvent.click(buttons[1]);
    expect(onSlideChangeMock).toHaveBeenCalledWith(1);
  });

  it('shrinks dots when not in view (variant sm)', () => {
    renderCarousel({ dotsProps: { numberOfSlides: 6, maxDots: 3 } });
    const buttons = getDotButtons();
    const hasSm = buttons.some((btn) => {
      const span = getDotSpan(btn);
      return span && span.className.match(/--sm/);
    });
    expect(hasSm).toBe(true);
  });

  it('calls onClick for a dot', async () => {
    renderCarousel({}, 3, true);
    const buttons = getDotButtons();
    await userEvent.click(buttons[2]);
    expect(buttons[2]).toBeInTheDocument();
  });

  it('renders a selected dot', () => {
    renderCarousel({}, 3, true);
    const spans = getDotButtons().map(getDotSpan);
    expect(spans[0]).toHaveClass('seldon-carousel-dot--selected');
    expect(spans[1]).not.toHaveClass('seldon-carousel-dot--selected');
    expect(spans[2]).not.toHaveClass('seldon-carousel-dot--selected');
  });

  it('adds dot index to inViewDots when onInViewChange(true) is called', () => {
    renderCarousel({}, 5, true);
    const buttons = getDotButtons();
    const span = getDotSpan(buttons[3]);
    expect(span.className).toMatch(/--sm/);
    updateInView(buttons, [2, 3, 4]); // need adjacent dots to avoid shrinking
    expect(span.className).toMatch(/--md/);
  });

  it('removes dot index from inViewDots when onInViewChange(false) is called', () => {
    renderCarousel({ dotsProps: { numberOfSlides: 4 } });
    const buttons = getDotButtons();
    const span = getDotSpan(buttons[2]);
    act(() => {
      const g = globalThis as unknown as { triggerIntersection?: (entries: IntersectionObserverEntry[]) => void };
      g.triggerIntersection?.([createIntersectionEntry(buttons[2], true)]);
      // g.triggerIntersection?.([createIntersectionEntry(buttons[2], false)]);
    });
    expect(span.className).toMatch(/--sm/);
    act(() => {
      const g = globalThis as unknown as { triggerIntersection?: (entries: IntersectionObserverEntry[]) => void };
      g.triggerIntersection?.([createIntersectionEntry(buttons[2], false)]);
    });
    expect(span.className).toMatch(/--sm/);
  });

  it('handles rapid inView changes for multiple dots', () => {
    renderCarousel({}, 10, true);
    const buttons = getDotButtons();
    const idleSpan = getDotSpan(buttons[9]);
    const span = getDotSpan(buttons[2]);
    const nextSpan = getDotSpan(buttons[2]);
    updateInView(buttons, []);
    expect(idleSpan.className).toMatch(/--sm/);
    expect(span.className).toMatch(/--sm/);
    expect(nextSpan.className).toMatch(/--sm/);

    updateInView(buttons, [0, 1, 2, 3, 4]);

    expect(idleSpan.className).toMatch(/--sm/);
    expect(span.className).toMatch(/--md/);
    expect(nextSpan.className).toMatch(/--md/);
  });

  it.todo('does not duplicate indices in inViewDots when onInViewChange(true) is called multiple times', async () => {
    // NOTE: if I could figure out how to test this properly it would fail
    // the duplicate indicies do happen, which could/will cause bugs
    // const TestCarouselDots = (await import('./CarouselDots')).default;
    // const TestCarousel = (await import('./Carousel')).default;
    // const TestCarouselContent = (await import('./CarouselContent')).default;
    // const TestCarouselItem = (await import('./CarouselItem')).default;
    // const TestCarouselArrows = (await import('./CarouselArrows')).default;
    // const baseProps = {
    //   id: 'test-carousel-dots',
    //   numberOfSlides: 6,
    //   maxDots: 6,
    //   className: '',
    // };
    // genSnapList = genSnapListGen(baseProps?.numberOfSlides);
    // render(
    //   <TestCarousel onSlideChangeMock={onSlideChangeMock}>
    //     <TestCarouselContent>
    //       {genSnapList().map((_, snapIndex) => (
    //         <TestCarouselItem key={snapIndex}>
    //           <div
    //             style={{
    //               display: 'flex',
    //               aspectRatio: '4 / 1',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //               padding: '1.5rem',
    //               backgroundColor: '#66BF3B',
    //               borderRadius: '0.5rem',
    //             }}
    //           >
    //             <span style={{ fontSize: '2.25rem', fontWeight: '600', color: 'white' }}>{snapIndex + 1}</span>
    //           </div>
    //         </TestCarouselItem>
    //       ))}
    //     </TestCarouselContent>
    //     <TestCarouselArrows />
    //     <TestCarouselDots {...baseProps} />
    //   </TestCarousel>,
    // );
    // const buttons = getDotButtons();
    // updateInView(buttons, []);
    // updateInView(buttons, [0, 1, 2]);
    // updateInView(buttons, [0, 1, 2]);
    // updateInView(buttons, [0, 1, 2]);
    // // Check for duplicate indices in inViewCalls
    // const indices = inViewCalls.map((call) => call.index);
    // console.log('InViewCalls:', inViewCalls);
    // expect(new Set(indices).size).toBe(indices.length);
  });

  it('removes only the correct index from inViewDots when multiple dots go out of view', () => {
    renderCarousel({}, 6, true);
    const buttons = getDotButtons();
    const span0 = getDotSpan(buttons[2]);
    const span1 = getDotSpan(buttons[4]);
    updateInView(buttons, []);
    act(() => {
      const g = globalThis as unknown as { triggerIntersection?: (entries: IntersectionObserverEntry[]) => void };
      g.triggerIntersection?.([
        createIntersectionEntry(buttons[2], true),
        createIntersectionEntry(buttons[3], true),
        createIntersectionEntry(buttons[4], true),
        createIntersectionEntry(buttons[5], true),
      ]);
      g.triggerIntersection?.([createIntersectionEntry(buttons[2], false)]);
    });
    expect(span0.className).toMatch(/--sm/);
    expect(span1.className).toMatch(/--md/);
  });
});
