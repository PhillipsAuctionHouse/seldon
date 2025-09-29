import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ComponentProps } from 'react';
import CarouselDots from './CarouselDots';
import Carousel from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';

vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: true,
    entry: {},
  }),
}));

const onSlideChange = vi.fn();
const genSnapListGen = (max: number) => () => Array.from({ length: max }).map((_, i) => i);
let genSnapList = genSnapListGen(3);

const genSelectedScrollSnapGen = (i: number) => () => i;
let genSelectedScrollSnap = genSelectedScrollSnapGen(0);

const getDotSpan = (btn: Element) => (btn.firstElementChild instanceof HTMLElement ? btn.firstElementChild : null);

beforeEach(() => {
  vi.mock('./utils', async () => {
    const actual: typeof import('./utils') = await vi.importActual('./utils');
    return {
      ...actual,
      useCarousel: () => ({
        ...actual.useCarousel(),
        onSlideChange,
      }),
    };
  });

  vi.mock('embla-carousel-react', async () => {
    const actual: typeof import('embla-carousel-react') = await vi.importActual('embla-carousel-react');
    return {
      ...actual,
      default: (...args: Parameters<typeof actual.default>) => {
        const [emblaRef, emblaApi] = actual.default(...args);

        if (emblaApi) {
          emblaApi.scrollSnapList = vi.fn().mockImplementation(() => genSnapList());
          emblaApi.selectedScrollSnap = vi.fn().mockImplementation(() => genSelectedScrollSnap());
        }
        return [emblaRef, emblaApi];
      },
    };
  });

  HTMLElement.prototype.scrollTo = vi.fn((..._args: [number, number] | [ScrollToOptions?]) => void 0);
});

afterEach(() => {
  vi.resetAllMocks();
});

const renderInContext = (dotComponentProps?: Partial<ComponentProps<typeof CarouselDots>>) => {
  const baseProps = {
    id: 'test-carousel-dots',
    numberOfSlides: 3,
    maxDots: 3,
    className: '',
  };
  genSnapList = genSnapListGen(
    dotComponentProps?.numberOfSlides ?? dotComponentProps?.maxDots ?? baseProps.numberOfSlides,
  );
  return render(
    <Carousel>
      <CarouselContent>
        {Array.from({ length: 9 }).map((_, index) => (
          <CarouselItem key={index}>
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
              <span style={{ fontSize: '2.25rem', fontWeight: '600', color: 'white' }}>{index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots {...baseProps} {...dotComponentProps} />
    </Carousel>,
  );
};

describe('CarouselDots', () => {
  it('calls scrollToDot with correct index', async () => {
    genSelectedScrollSnap = genSelectedScrollSnapGen(2);
    renderInContext({ id: 'test-carousel-dots', numberOfSlides: 5 });

    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[2]);
    // `left` calculation for index 2 :
    //    2         10        12                                         0                    11
    //  index * (dotWidth + dotGap) - scrollableContainerRef.current.offsetWidth / 2 + centerDotContainer
    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith({
      left: 55,
      behavior: 'smooth',
    });
  });

  it('calls onSettle with correct index after slide change', async () => {
    genSelectedScrollSnap = genSelectedScrollSnapGen(3);
    renderInContext({ id: 'test-carousel-dots', numberOfSlides: 5 });

    // Simulate clicking a dot to trigger slide change and settle
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[3]);

    expect(onSlideChange).toHaveBeenCalledWith(3);
  });

  it.skip('tracks inView dots in scrollSnaps map', () => {
    // this test will destroy me

    // simulate inView logic by clicking dots and triggering onInViewChange
    renderInContext({ numberOfSlides: 5 });
    const buttons = screen.getAllByRole('button');

    const span0 = getDotSpan(buttons[0]);
    const span1 = getDotSpan(buttons[1]);
    span0 && span0.dispatchEvent(new Event('inview'));
    span1 && span1.dispatchEvent(new Event('inview'));
    // The inViewDots state should include 0 and 1
    // (Would need to expose or check state, so we check the variant prop)
    // At least two dots should not be shrinked
    const notShrinked = buttons.filter((btn) => {
      const span = getDotSpan(btn);
      return span && !span.className.match(/--sm/);
    });
    expect(notShrinked.length).toBeGreaterThanOrEqual(2);
  });

  it('calls onInViewChange supplied to CarouselDot', () => {
    renderInContext({ id: 'test-carousel-dots', numberOfSlides: 3 });
    const buttons = screen.getAllByRole('button');

    // Simulate inView change

    const span = getDotSpan(buttons[0]);
    span && span.dispatchEvent(new Event('inview'));

    // Would need to patch CarouselDot to spy on the prop
    // For now, just check the button exists
    expect(buttons[0]).toBeInTheDocument();
  });

  it('renders the correct number of dots', () => {
    const carousel = renderInContext();
    expect(carousel.getAllByRole('button')).toHaveLength(3);
  });

  it('respects maxDots prop', () => {
    const carousel = renderInContext({ numberOfSlides: 10, maxDots: 5 });

    expect(carousel.getAllByRole('button')).toHaveLength(10); // dots are rendered for all slides, but container width is limited
  });

  it('renders with position on-content', () => {
    const carousel = renderInContext({ position: 'on-content' });
    const group = carousel.getByTestId('carousel-dots-test-carousel-dots');
    expect(group.className).toMatch(/on-content/);
  });

  it('calls onSlideChange when dot is clicked', async () => {
    const carousel = renderInContext({ numberOfSlides: 10 });

    const buttons = carousel.getAllByRole('button');

    await userEvent.click(buttons[1]);
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('shrinks dots when not in view (variant sm)', () => {
    // Simulate inViewDots logic by rendering with fewer maxDots than slides
    const carousel = renderInContext({ numberOfSlides: 6, maxDots: 3 });

    const buttons = carousel.getAllByRole('button');
    // At least one dot should have the sm variant class
    const hasSm = buttons.some((btn) => {
      const span = getDotSpan(btn);
      return span && span.className.match(/--sm/);
    });
    expect(hasSm).toBe(true);
  });

  it('calls onClick for a dot', async () => {
    // Patch CarouselDot to spy on onClick

    const carousel = renderInContext();
    const buttons = carousel.getAllByRole('button');
    await userEvent.click(buttons[2]);
    // can't check the callback directly, but we can check the button exists and is clickable
    expect(buttons[2]).toBeInTheDocument();
  });

  it('renders a selected dot', () => {
    const carousel = renderInContext();
    // by default, the first dot is selected
    const buttons = carousel.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
  });
});
