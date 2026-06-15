import { render, screen, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import Carousel, { type CarouselApi } from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots from './CarouselDots';
import { useCarousel } from './utils';
import { mockDesktopBreakpoint, mockMatchMedia, mockMobileBreakpoint, runCommonTests } from '../../utils/testUtils';

const CarouselApiProbe = ({
  onApi,
  onShouldAnimateNavigation,
}: {
  onApi: (api: CarouselApi) => void;
  onShouldAnimateNavigation?: (shouldAnimateNavigation: boolean) => void;
}) => {
  const { api, shouldAnimateNavigation } = useCarousel();
  useEffect(() => {
    if (api) {
      onApi(api);
    }
    onShouldAnimateNavigation?.(shouldAnimateNavigation);
  }, [api, onApi, onShouldAnimateNavigation, shouldAnimateNavigation]);
  return null;
};

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

  describe('autoAdvanceDelay', () => {
    // The global test setup mocks matchMedia with matches: true for every query,
    // which trips the prefers-reduced-motion guard. Default to no matching queries.
    beforeEach(() => {
      mockMatchMedia({});
    });

    const renderWithProbe = (props: React.ComponentProps<typeof Carousel>, onApi: (api: CarouselApi) => void) =>
      render(
        <Carousel {...props}>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
          <CarouselApiProbe onApi={onApi} />
        </Carousel>,
      );

    it('registers the autoplay plugin when autoAdvanceDelay is set', async () => {
      let api: CarouselApi;
      renderWithProbe({ autoAdvanceDelay: 5000, loop: true }, (captured) => (api = captured));

      await waitFor(() => expect(api).toBeDefined());
      expect(api?.plugins().autoplay).toBeDefined();
    });

    it('does not register the autoplay plugin without autoAdvanceDelay', async () => {
      let api: CarouselApi;
      renderWithProbe({ loop: true }, (captured) => (api = captured));

      await waitFor(() => expect(api).toBeDefined());
      expect(api?.plugins().autoplay).toBeUndefined();
    });

    it('does not register the autoplay plugin when the user prefers reduced motion', async () => {
      mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });

      let api: CarouselApi;
      renderWithProbe({ autoAdvanceDelay: 5000, loop: true }, (captured) => (api = captured));

      await waitFor(() => expect(api).toBeDefined());
      expect(api?.plugins().autoplay).toBeUndefined();
    });

    it('only opts into animated navigation when auto advance or duration is configured', async () => {
      let shouldAnimateNavigation = true;
      const { rerender } = render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
          <CarouselApiProbe
            onApi={() => null}
            onShouldAnimateNavigation={(value) => (shouldAnimateNavigation = value)}
          />
        </Carousel>,
      );

      await waitFor(() => expect(shouldAnimateNavigation).toBe(false));

      rerender(
        <Carousel autoAdvanceDelay={5000} duration={30}>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
          <CarouselApiProbe
            onApi={() => null}
            onShouldAnimateNavigation={(value) => (shouldAnimateNavigation = value)}
          />
        </Carousel>,
      );

      await waitFor(() => expect(shouldAnimateNavigation).toBe(true));
    });
  });
});
