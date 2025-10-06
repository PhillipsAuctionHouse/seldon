import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement, ReactNode } from 'react';
import Carousel from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselArrows from './CarouselArrows';
import CarouselDots from './CarouselDots';
import { mutables } from '../../../config/vitest/mockEmblaCarousel';
import { setupDomRectMocks, updateInView as emblaUpdateInView } from '../../../config/vitest/emblaTestUtils';
import { vi } from 'vitest';

setupDomRectMocks();

export const renderArrows = (slides = 5) =>
  render(
    createElement(
      Carousel,
      null,
      createElement(
        CarouselContent,
        null,
        ...Array.from({ length: slides }).map((_, i) => createElement(CarouselItem, { key: i }, `Item ${i + 1}`)),
      ),
      createElement(CarouselArrows, null),
    ),
  );

export const renderCarousel = (props: { slides?: string[]; customGuts?: ReactNode } = {}) => {
  const slides = props.slides ?? ['Slide 1', 'Slide 2', 'Slide 3'];
  const items = slides.map((t, i) => createElement(CarouselItem, { key: i }, t));
  const rendered = render(
    createElement(
      Carousel,
      null,
      createElement(CarouselContent, null, ...items),
      createElement(CarouselDots, { id: 'test-carousel-dots' }),
    ),
  );
  (rendered as unknown as { rerenderSame?: () => void }).rerenderSame = () =>
    rendered.rerender(
      createElement(
        Carousel,
        null,
        createElement(CarouselContent, null, ...items),
        createElement(CarouselDots, { id: 'test-carousel-dots' }),
      ),
    );
  return rendered as typeof rendered & { rerenderSame: () => void };
};

export const getSlides = () => screen.getAllByTestId('carousel-item');

export const getDotButtons = (): HTMLElement[] =>
  screen.getAllByRole('button').filter((btn) => btn.getAttribute('class')?.includes('dot__container')) as HTMLElement[];

export const getDotSpan = (btn: Element): HTMLElement => {
  if (!(btn.firstElementChild instanceof HTMLElement)) throw new Error('Dot span not found');
  return btn.firstElementChild;
};

export const updateInView = (buttons: HTMLElement[], indices: number[]) => emblaUpdateInView(buttons, indices);

export const restoreInitialMocks = () => {
  vi.clearAllMocks();
  mutables.actualEmblaApi = undefined as unknown as import('embla-carousel').EmblaCarouselType | undefined;
  mutables.patchedEmblaApi = undefined as unknown as import('embla-carousel').EmblaCarouselType | undefined;
  mutables.slidesInView = () => [0];
  mutables.scrollSnapList = undefined;
  mutables.selectedScrollSnap = undefined;
};

export { userEvent };
