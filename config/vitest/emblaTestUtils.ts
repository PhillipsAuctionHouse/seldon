import { act, screen } from '@testing-library/react';
import { mutables } from './mockEmblaCarousel';

export const setupDomRectMocks = () => {
  // consistent mocked bounding rect for elements used in tests
  HTMLElement.prototype.getBoundingClientRect = function () {
    return {
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      top: 0,
      left: 0,
      right: 100,
      bottom: 40,
      toJSON: () => void 0,
    } as DOMRect;
  };

  // minimal DOMRect shim used by tests
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // assign a minimal DOMRect implementation to the global test environment
  // using a concrete declaration that keeps TypeScript happy via a cast below
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
  } as unknown as typeof DOMRect;
};

export const createIntersectionEntry = (target: HTMLElement, isIntersecting: boolean): IntersectionObserverEntry => ({
  target,
  isIntersecting,
  boundingClientRect: target.getBoundingClientRect(),
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: isIntersecting ? target.getBoundingClientRect() : new DOMRect(),
  rootBounds: null,
  time: Date.now(),
});

export const updateInView = (buttons: HTMLElement[], inViewIndices: number[]) => {
  act(() => {
    const g = globalThis as unknown as { triggerIntersection?: (entries: IntersectionObserverEntry[]) => void };
    buttons.forEach((btn) => {
      g.triggerIntersection?.([createIntersectionEntry(btn, false)]);
    });

    inViewIndices.forEach((i) => {
      g.triggerIntersection?.([createIntersectionEntry(buttons[i], true)]);
    });

    // Also notify the mocked embla API that slides are in view so any registered
    // 'slidesInView' listeners get invoked like the real embla would.
    try {
      const apiWithEmit = mutables.patchedEmblaApi as unknown as { emit?: (event: string, ...args: unknown[]) => void };
      apiWithEmit?.emit?.('slidesInView');
    } catch (_e) {
      // ignore
    }
  });
};

export const getSlides = () => screen.getAllByTestId('carousel-item');
