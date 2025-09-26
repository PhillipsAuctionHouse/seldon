import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots from './CarouselDots';
import { mockDesktopBreakpoint, mockMobileBreakpoint, runCommonTests } from '../../utils/testUtils';

describe('Carousel', () => {
  runCommonTests(Carousel, 'Carousel');

  it('renders with a custom element passed via the element prop', () => {
    render(
      <Carousel element="section">
        <CarouselContent>
          <CarouselItem>Custom Element Slide</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    const customElement = screen.getByTestId('carousel');
    expect(customElement.tagName.toLowerCase()).toBe('section');
    expect(screen.getByText('Custom Element Slide')).toBeInTheDocument();
  });

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

  describe('draggable vs non draggable', () => {
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
});
