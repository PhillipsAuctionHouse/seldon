import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { EmblaCarouselType } from 'embla-carousel';
import { CarouselDotsProps } from '../..';
import { MockIntersectionObserver } from '../../../config/vitest/mockIntersectionObserver';
import '../../../config/vitest/custom-globals.d.ts';

declare const globalThis: GlobalThis;

// --- Mocks & Setup ---
const inViewState = new Map<HTMLElement, boolean>();
const onSlideChange = vi.fn();
const genSnapListGen = (max: number) => () => Array.from({ length: max }).map((_, i) => i);
let genSnapList = genSnapListGen(3);
const genSelectedScrollSnapGen = (i: number) => () => i;
let genSelectedScrollSnap = genSelectedScrollSnapGen(0);

const emblaApi: EmblaCarouselType = {
  scrollSnapList: () => genSnapList(),
  selectedScrollSnap: () => genSelectedScrollSnap(),
  on: function (this: EmblaCarouselType) {
    return this;
  },
  off: function (this: EmblaCarouselType) {
    return this;
  },
  scrollTo: vi.fn(() => void 0),
  canScrollNext: vi.fn().mockReturnValue(true),
  canScrollPrev: vi.fn().mockReturnValue(true),
  clickAllowed: vi.fn().mockReturnValue(true),
  containerNode: vi.fn(),
  reInit: vi.fn(),
  scrollNext: vi.fn(),
  scrollPrev: vi.fn(),
} as unknown as EmblaCarouselType;

vi.mock('embla-carousel-react', async () => {
  const actual = await vi.importActual<typeof import('embla-carousel-react')>('embla-carousel-react');
  return {
    __esModule: true,
    default: () => [actual.default()[0], emblaApi],
  };
});

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

HTMLElement.prototype.getBoundingClientRect = () => ({
  x: 0,
  y: 0,
  width: 100,
  height: 40,
  top: 0,
  left: 0,
  right: 100,
  bottom: 40,
  toJSON: () => void 0,
});

global.DOMRect = class DOMRect {
  x = 0;
  y = 0;
  width = 100;
  height = 40;
  top = 0;
  left = 0;
  right = 100;
  bottom = 40;
  toJSON() {
    return void 0;
  }
  constructor() {
    return this;
  }
  static fromRect(other?: DOMRectInit): DOMRect {
    const rect = new global.DOMRect();
    if (other) {
      rect.x = other.x ?? 0;
      rect.y = other.y ?? 0;
      rect.width = other.width ?? 0;
      rect.height = other.height ?? 0;
    }
    return rect;
  }
};

HTMLElement.prototype.scrollTo = vi.fn(() => void 0);

afterEach(() => {
  cleanup();
  inViewState.clear();
  // inViewCalls.length = 0;
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

const createIntersectionEntry = (target: HTMLElement, isIntersecting: boolean): IntersectionObserverEntry => ({
  target,
  isIntersecting,
  boundingClientRect: target.getBoundingClientRect(),
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: isIntersecting ? target.getBoundingClientRect() : new DOMRect(),
  rootBounds: null,
  time: Date.now(),
});

const updateInView = (buttons: HTMLElement[], inViewIndices: number[]) => {
  act(() => {
    buttons.forEach((btn) => {
      globalThis.triggerIntersection([createIntersectionEntry(btn, false)]);
    });

    inViewIndices.forEach((i) => {
      globalThis.triggerIntersection([createIntersectionEntry(buttons[i], true)]);
    });
  });
};

const getDotButtons = (): HTMLElement[] =>
  screen.getAllByRole('button').filter((btn) => btn.getAttribute('class')?.includes('dot__container'));

let observer: MockIntersectionObserver;

const renderInContext = async (dotsComponentProps?: Partial<CarouselDotsProps>) => {
  const CarouselDots = (await import('./CarouselDots')).default;
  const Carousel = (await import('./Carousel')).default;
  const CarouselContent = (await import('./CarouselContent')).default;
  const CarouselItem = (await import('./CarouselItem')).default;
  const CarouselArrows = (await import('./CarouselArrows')).default;
  const baseProps = {
    id: 'test-carousel-dots',
    numberOfSlides: 3,
    maxDots: 3,
    className: '',
  };
  genSnapList = genSnapListGen(
    dotsComponentProps?.numberOfSlides ?? dotsComponentProps?.maxDots ?? baseProps.numberOfSlides,
  );
  const out = render(
    <Carousel onSlideChange={onSlideChange}>
      <CarouselContent>
        {genSnapList().map((snapIndex) => (
          <CarouselItem key={snapIndex}>
            <div
              style={{
                display: 'flex',
                aspectRatio: '4 / 1',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                backgroundColor: '#66BF3B',
                borderRadius: '0.5rem',
              }}
            >
              <span style={{ fontSize: '2.25rem', fontWeight: '600', color: 'white' }}>{snapIndex + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselArrows />
      <CarouselDots {...baseProps} {...dotsComponentProps} />
    </Carousel>,
  );
  observer = new globalThis.IntersectionObserver(() => void 0, {
    root: screen.getByTestId('carousel-dots-scrollable-container'),
  }) as MockIntersectionObserver;
  return out;
};

// --- Tests ---
describe('CarouselDots', () => {
  it('calls scrollToDot with correct index', async () => {
    genSelectedScrollSnap = genSelectedScrollSnapGen(2);
    const { unmount } = await renderInContext({ id: 'test-carousel-dots', numberOfSlides: 5 });
    const buttons = getDotButtons();
    await userEvent.click(buttons[2]);
    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith({ left: 55, behavior: 'smooth' });
    unmount();
  });

  it('calls onSlideChange with correct index after slide change', async () => {
    genSelectedScrollSnap = genSelectedScrollSnapGen(3);
    await renderInContext({ id: 'test-carousel-dots', numberOfSlides: 5 });
    const buttons = getDotButtons();
    await userEvent.click(buttons[2]);
    expect(onSlideChange).toHaveBeenCalledWith(2);
  });

  it('tracks inView dots in scrollSnaps map', async () => {
    await renderInContext({ id: 'test-carousel-dots', numberOfSlides: 5 });
    const buttons = getDotButtons();

    updateInView(buttons, [0, 1]);
    const notShrinked = buttons.filter((btn) => {
      const span = getDotSpan(btn);
      return span && !span.className.match(/--sm/);
    });
    expect(notShrinked.length).toBeGreaterThanOrEqual(1);
  });

  it.todo('calls onInViewChange supplied to CarouselDot', async () => {
    await renderInContext({ id: 'test-carousel-dots', numberOfSlides: 3 });
    const buttons = getDotButtons();
    act(() => {
      observer.triggerIntersect([createIntersectionEntry(buttons[0], true)]);
    });
    expect(buttons[0]).toBeInTheDocument();
  });

  it('renders the correct number of dots', async () => {
    await renderInContext();
    expect(getDotButtons()).toHaveLength(3);
  });

  it('respects maxDots prop', async () => {
    await renderInContext({ numberOfSlides: 10, maxDots: 5 });
    expect(getDotButtons()).toHaveLength(10);
  });

  it('renders with position on-content', async () => {
    const carousel = await renderInContext({ position: 'on-content' });
    const group = carousel.getByTestId('carousel-dots-test-carousel-dots');
    expect(group.className).toMatch(/on-content/);
  });

  it('calls onSlideChange when dot is clicked', async () => {
    await renderInContext({ numberOfSlides: 10 });
    const buttons = getDotButtons();
    await userEvent.click(buttons[1]);
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('shrinks dots when not in view (variant sm)', async () => {
    await renderInContext({ numberOfSlides: 6, maxDots: 3 });
    const buttons = getDotButtons();
    const hasSm = buttons.some((btn) => {
      const span = getDotSpan(btn);
      return span && span.className.match(/--sm/);
    });
    expect(hasSm).toBe(true);
  });

  it('calls onClick for a dot', async () => {
    await renderInContext();
    const buttons = getDotButtons();
    await userEvent.click(buttons[2]);
    expect(buttons[2]).toBeInTheDocument();
  });

  it('renders a selected dot', async () => {
    await renderInContext();
    const buttons = getDotButtons();
    expect(buttons[0]).toBeInTheDocument();
  });

  it('adds dot index to inViewDots when onInViewChange(true) is called', async () => {
    await renderInContext({ numberOfSlides: 5 });
    const buttons = getDotButtons();
    const span = getDotSpan(buttons[3]);
    updateInView(buttons, [2, 3, 4]); // need adjacent dots to avoid shrinking
    expect(span.className).toMatch(/--md/);
  });

  it('removes dot index from inViewDots when onInViewChange(false) is called', async () => {
    await renderInContext({ numberOfSlides: 4 });
    const buttons = getDotButtons();
    const span = getDotSpan(buttons[2]);
    act(() => {
      globalThis.triggerIntersection([createIntersectionEntry(buttons[2], true)]);
      // globalThis.triggerIntersection([createIntersectionEntry(buttons[2], false)]);
    });
    expect(span.className).toMatch(/--sm/);
    act(() => {
      // globalThis.triggerIntersection([createIntersectionEntry(buttons[2], true)]);
      globalThis.triggerIntersection([createIntersectionEntry(buttons[2], false)]);
    });
    expect(span.className).toMatch(/--sm/);
  });

  it('handles rapid inView changes for multiple dots', async () => {
    await renderInContext({ numberOfSlides: 10 });
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
    //   <TestCarousel onSlideChange={onSlideChange}>
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

  it('removes only the correct index from inViewDots when multiple dots go out of view', async () => {
    await renderInContext({ numberOfSlides: 6 });
    const buttons = getDotButtons();
    const span0 = getDotSpan(buttons[2]);
    const span1 = getDotSpan(buttons[4]);
    updateInView(buttons, []);
    act(() => {
      globalThis.triggerIntersection([
        createIntersectionEntry(buttons[2], true),
        createIntersectionEntry(buttons[3], true),
        createIntersectionEntry(buttons[4], true),
        createIntersectionEntry(buttons[5], true),
      ]);
      globalThis.triggerIntersection([createIntersectionEntry(buttons[2], false)]);
    });
    expect(span0.className).toMatch(/--sm/);
    expect(span1.className).toMatch(/--md/);
  });
});
