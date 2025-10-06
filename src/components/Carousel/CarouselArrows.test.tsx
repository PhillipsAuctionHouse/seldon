import { cleanup, render, screen } from '@testing-library/react';
import CarouselArrows from './CarouselArrows';
import { mutables, scrollNextMock, scrollPrevMock, scrollToMock } from '../../../config/vitest/mockEmblaCarousel.ts';
import { renderArrows } from './carouselTestUtils.tsx';
import userEvent from '@testing-library/user-event';
import Carousel from './Carousel.tsx';
// CarouselContent/CarouselItem are used by renderArrows helper now

beforeAll(() => {
  mutables.slidesInView = () => [0];
});

afterEach(() => {
  cleanup();
});

const restoreInitialMocks = () => {
  vi.clearAllMocks();
  mutables.actualEmblaApi = undefined as unknown as import('embla-carousel').EmblaCarouselType | undefined;
  mutables.patchedEmblaApi = undefined as unknown as import('embla-carousel').EmblaCarouselType | undefined;
  mutables.slidesInView = () => [0];
  mutables.scrollSnapList = undefined;
  mutables.selectedScrollSnap = undefined;
};

// rendering helpers are provided by config/vitest/carouselTestUtils

describe('CarouselArrows', () => {
  it('renders correctly', () => {
    renderArrows();
    expect(screen.getByTestId('prev-arrow')).toBeInTheDocument();
    expect(screen.getByTestId('next-arrow')).toBeInTheDocument();
  });

  it('calls scrollPrev on prev arrow click', async () => {
    renderArrows();
    await userEvent.click(screen.getByTestId('prev-arrow'));
    expect(scrollPrevMock).toHaveBeenCalledWith(true);
  });

  it('calls scrollNext on next arrow click', async () => {
    renderArrows();
    await userEvent.click(screen.getByTestId('next-arrow'));
    expect(scrollNextMock).toHaveBeenCalledWith(true);
  });

  it('does not call scrollPrev if api is not available', async () => {
    restoreInitialMocks();
    render(
      <Carousel>
        <CarouselArrows />
      </Carousel>,
    );
    await userEvent.click(screen.getByTestId('prev-arrow'));
    expect(scrollPrevMock).not.toHaveBeenCalled();
  });

  it('does not call scrollNext if api is not available', async () => {
    restoreInitialMocks();
    render(
      <Carousel>
        <CarouselArrows />
      </Carousel>,
    );
    await userEvent.click(screen.getByTestId('next-arrow'));
    expect(scrollNextMock).not.toHaveBeenCalled();
  });

  it('scrolls to previous page when multiple slides are in view for prev arrow', async () => {
    restoreInitialMocks();
    // test requires multiple slides in view
    mutables.slidesInView = () => [2, 3, 4];
    renderArrows();
    await userEvent.click(screen.getByTestId('prev-arrow'));
    expect(scrollToMock).toHaveBeenCalledWith(0);
  });

  it('scrolls to next page when multiple slides are in view for next arrow', async () => {
    restoreInitialMocks();
    // ensure the same slidesInView for this test (independent of previous tests)
    mutables.slidesInView = () => [2, 3, 4];
    renderArrows();
    await userEvent.click(screen.getByTestId('next-arrow'));
    expect(scrollToMock).toHaveBeenCalledWith(5);
  });
});
