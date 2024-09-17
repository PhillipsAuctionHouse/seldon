import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots from './CarouselDots';
import { runCommonTests } from '../../utils/testUtils';

describe('Carousel', () => {
  runCommonTests(Carousel, 'Carousel');

  beforeEach(() => {
    class MockIntersectionObserver {
      observe = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
      unobserve = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
      disconnect = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: MockIntersectionObserver,
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: true,
        addEventListener: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
        removeEventListener: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
      }),
    });
    class MockResizeObserver {
      observe = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
      unobserve = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
      disconnect = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
    }
    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: MockResizeObserver,
    });
  });

  it('renders carousel with content, items, and dots', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>,
    );
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'pagination' })).toBeInTheDocument();
  });

  // it('renders carousel dots with correct number of dots', () => {
  //   render(
  //     <Carousel>
  //       <CarouselContent>
  //         <CarouselItem>Slide 1</CarouselItem>
  //         <CarouselItem>Slide 2</CarouselItem>
  //         <CarouselItem>Slide 3</CarouselItem>
  //       </CarouselContent>
  //       <CarouselDots />
  //     </Carousel>,
  //   );

  //   const dots = screen.getAllByRole('button');
  //   expect(dots).toHaveLength(3);
  // });
});
