import { fireEvent, render, screen } from '@testing-library/react';
import Carousel from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselDots from './CarouselDots';
import CarouselItem from './CarouselItem';

const mockApi = vi.hoisted(() => ({
  scrollPrev: vi.fn(),
  scrollNext: vi.fn(),
  canScrollPrev: () => true,
  canScrollNext: () => true,
  on: vi.fn(() => ({ on: vi.fn(() => ({ on: vi.fn(() => ({ on: vi.fn() })) })) })),
  off: vi.fn(() => ({ off: vi.fn(() => ({ off: vi.fn(() => ({ off: vi.fn() })) })) })),
  reInit: vi.fn(),
  slidesInView: () => [0],
  scrollSnapList: () => [0],
  selectedScrollSnap: () => true,
}));

vi.mock('embla-carousel-react', async () => {
  const actual = await vi.importActual('embla-carousel-react');
  return {
    ...actual,
    default: () => [null, mockApi],
  };
});

describe('Carousel keyboard navigation', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('calls scrollNext on ArrowRight', () => {
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
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    expect(mockApi.scrollNext).toHaveBeenCalled();
  });

  it('calls scrollPrev on ArrowLeft', () => {
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
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(mockApi.scrollPrev).toHaveBeenCalled();
  });
});
